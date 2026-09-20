"""Generate the original romantic piano-and-strings instrumental.

Optional regeneration: pip install numpy imageio-ffmpeg; python scripts/generate-bgm.py
The deployed site does not need Python or this script.
"""

from pathlib import Path
import subprocess
import numpy as np
import imageio_ffmpeg

SAMPLE_RATE = 22050
BPM = 70
BEAT = 60 / BPM
BARS = 32
DURATION = BARS * 3 * BEAT + 3
COUNT = int(DURATION * SAMPLE_RATE)
left = np.zeros(COUNT, dtype=np.float32)
right = np.zeros(COUNT, dtype=np.float32)


def hz(midi: int) -> float:
    return 440 * 2 ** ((midi - 69) / 12)


def add_tone(note: int, start: float, length: float, volume: float, pan: float = 0) -> None:
    """Soft felt-piano tone with a rounded attack and natural decay."""
    start_index = int(start * SAMPLE_RATE)
    n = min(int(length * SAMPLE_RATE), COUNT - start_index)
    if n <= 0:
        return
    t = np.arange(n, dtype=np.float32) / SAMPLE_RATE
    f = hz(note)
    partials = (
        np.sin(2 * np.pi * f * t) * np.exp(-1.8 * t)
        + 0.33 * np.sin(2 * np.pi * f * 2.003 * t) * np.exp(-4.2 * t)
        + 0.12 * np.sin(2 * np.pi * f * 3.002 * t) * np.exp(-7.3 * t)
    )
    attack = np.minimum(1, t / 0.014)
    release = np.minimum(1, (length - t) / 0.25)
    tone = volume * partials * attack * np.maximum(0, release)
    left[start_index:start_index + n] += tone * (1 - pan * 0.24)
    right[start_index:start_index + n] += tone * (1 + pan * 0.24)


def add_pad(note: int, start: float, length: float, volume: float) -> None:
    start_index = int(start * SAMPLE_RATE)
    n = min(int(length * SAMPLE_RATE), COUNT - start_index)
    t = np.arange(n, dtype=np.float32) / SAMPLE_RATE
    f = hz(note)
    envelope = np.minimum(1, t / 1.05) * np.minimum(1, (length - t) / 1.15)
    slow = 1 + 0.06 * np.sin(2 * np.pi * 0.21 * t)
    vibrato = 0.0015 * np.sin(2 * np.pi * 4.7 * t)
    tone = volume * envelope * slow * (
        np.sin(2 * np.pi * f * t + vibrato)
        + 0.22 * np.sin(2 * np.pi * (f * 2.003) * t)
        + 0.13 * np.sin(2 * np.pi * (f * 3.001) * t)
    )
    left[start_index:start_index + n] += tone * 0.94
    right[start_index:start_index + n] += tone * 1.06


# Original 6/8 ballad: a simple piano opening, followed by a gradual string swell.
chords = [
    [50, 57, 61, 64],   # Dmaj9
    [49, 56, 61, 64],   # A/C#
    [47, 54, 57, 62],   # Bm7
    [43, 50, 54, 57],   # Gmaj7
    [40, 47, 52, 55],   # Em7
    [45, 52, 57, 62],   # Asus4
    [50, 57, 61, 64],   # Dmaj9
    [45, 52, 57, 61],   # Aadd9
]
melodies = [
    [(66, 0, 1.5), (69, 1.5, .75), (73, 2.25, .75)],
    [(73, 0, 1), (71, 1, 1), (69, 2, 1)],
    [(66, 0, 1), (71, 1, 1), (74, 2, 1)],
    [(74, 0, 1.5), (71, 1.5, .75), (67, 2.25, .75)],
    [(67, 0, 1.5), (71, 1.5, .75), (76, 2.25, .75)],
    [(73, 0, 1), (71, 1, 1), (69, 2, 1)],
    [(73, 0, .75), (76, .75, .75), (78, 1.5, .75), (76, 2.25, .75)],
    [(73, 0, 1.5), (69, 1.5, 1.5)],
]

for bar in range(BARS):
    base = bar * 3 * BEAT
    chord = chords[bar % 8]
    cycle = bar // 8
    swell = (0.012, 0.023, 0.042, 0.052)[cycle]
    for note in (chord[0] - 12, chord[2]):
        add_pad(note, base, 3 * BEAT + 1.5, swell)
    if bar >= 16:
        add_pad(chord[1] - 12, base, 3 * BEAT + 1.5, 0.017 + cycle * 0.005)
    pattern = [chord[0], chord[2], chord[1], chord[3], chord[2], chord[1]]
    for step, note in enumerate(pattern):
        volume = (0.074 if step == 0 else 0.043) * (1 + 0.13 * cycle)
        add_tone(note, base + step * BEAT / 2, 2.2, volume, -0.22 if step % 2 else 0.18)
    for step, (note, offset, length) in enumerate(melodies[bar % 8]):
        if cycle == 0 and bar % 8 in (3, 7) and step == 2:
            continue
        variation = 12 if cycle == 2 and bar % 8 == 6 and step == 2 else 0
        add_tone(note + variation, base + offset * BEAT + 0.013 * step, length * BEAT + 0.65, (0.058 + 0.008 * cycle), 0.45)

# A small, wide echo gives the notes a room-like tail.
dry_left = left.copy()
dry_right = right.copy()
for delay, gain in ((0.23, 0.16), (0.43, 0.12), (0.79, 0.08), (1.31, 0.035)):
    n = int(delay * SAMPLE_RATE)
    left[n:] += dry_right[:-n] * gain
    right[n:] += dry_left[:-n] * gain

fade_in = np.minimum(1, np.arange(COUNT) / (SAMPLE_RATE * 2.1))
fade_out = np.minimum(1, np.arange(COUNT)[::-1] / (SAMPLE_RATE * 3.8))
envelope = np.minimum(fade_in, fade_out).astype(np.float32)
audio = np.stack([left * envelope, right * envelope], axis=1)
audio *= 0.78 / max(np.max(np.abs(audio)), 0.01)

output = Path(__file__).resolve().parents[1] / "public" / "music" / "first-light.mp3"
output.parent.mkdir(parents=True, exist_ok=True)
command = [
    imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-f", "f32le", "-ar", str(SAMPLE_RATE),
    "-ac", "2", "-i", "pipe:0", "-codec:a", "libmp3lame", "-q:a", "3", str(output),
]
subprocess.run(command, input=audio.astype("<f4").tobytes(), check=True, capture_output=True)
print(f"Created {output} ({output.stat().st_size / 1024:.0f} KB, {DURATION:.0f} seconds)")
