"use client";

import { useRef, useState } from "react";
import type { WeddingCopy } from "@/lib/content";
import { musicConfig } from "@/lib/music-config";

export function MusicControl({ t }: { t: WeddingCopy }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setError(false);
    setLoading(true);
    audio.volume = musicConfig.volume;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="music-control">
      <audio
        ref={audioRef}
        src={musicConfig.src}
        preload="none"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setLoading(false); setError(true); }}
        aria-label={musicConfig.title}
      />
      <button type="button" className={playing ? "music-button is-playing" : "music-button"} onClick={toggleMusic} aria-label={playing ? t.musicPause : t.musicPlay} aria-pressed={playing} disabled={loading}>
        <span className="music-button-icon" aria-hidden="true"><i /><i /><i /></span>
        <span className="music-button-text">{loading ? t.musicLoading : playing ? t.musicOn : t.musicOff}</span>
      </button>
      {error && <span className="music-error" role="status">{t.musicError}</span>}
    </div>
  );
}
