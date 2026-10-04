"use client";

import { useEffect, useRef, useState } from "react";
import type { WeddingCopy } from "@/lib/content";
import { musicConfig } from "@/lib/music-config";

export function MusicControl({ t }: { t: WeddingCopy }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const enabledRef = useRef(true);
  const [enabled, setEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = musicConfig.volume;

    async function tryAutoPlay(player: HTMLAudioElement) {
      if (!enabledRef.current || !player.paused) return;
      try { await player.play(); }
      catch { /* 모바일 자동 재생 제한 시 첫 화면 터치에서 다시 시도합니다. */ }
      finally { setLoading(false); }
    }

    const unlockAudio = () => { void tryAutoPlay(audio); };
    setLoading(true);
    void tryAutoPlay(audio);
    window.addEventListener("pointerdown", unlockAudio, true);
    window.addEventListener("keydown", unlockAudio, true);
    return () => {
      window.removeEventListener("pointerdown", unlockAudio, true);
      window.removeEventListener("keydown", unlockAudio, true);
    };
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabledRef.current) {
      enabledRef.current = false;
      setEnabled(false);
      audio.pause();
      setError(false);
      setLoading(false);
      return;
    }
    enabledRef.current = true;
    setEnabled(true);
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
        preload="auto"
        autoPlay
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setPlaying(false); setLoading(false); setError(true); }}
        aria-label={musicConfig.title}
      />
      <button type="button" className={playing ? "music-button is-playing" : "music-button"} onClick={toggleMusic} aria-label={enabled ? t.musicPause : t.musicPlay} aria-pressed={enabled} disabled={loading}>
        <span className="music-button-icon" aria-hidden="true"><i /><i /><i /></span>
        <span className="music-button-text">{loading ? t.musicLoading : enabled ? t.musicOn : t.musicOff}</span>
      </button>
      {error && <span className="music-error" role="status">{t.musicError}</span>}
    </div>
  );
}
