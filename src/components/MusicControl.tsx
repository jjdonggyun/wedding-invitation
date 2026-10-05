"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WeddingCopy } from "@/lib/content";
import { musicConfig } from "@/lib/music-config";

export function MusicControl({ t }: { t: WeddingCopy }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const enabledRef = useRef(true);
  const playAttemptRef = useRef(0);
  const pendingAttemptRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const startPlayback = useCallback(async (reportError: boolean) => {
    const audio = audioRef.current;
    if (!audio || !enabledRef.current || !audio.paused || pendingAttemptRef.current !== null) return;
    const attempt = ++playAttemptRef.current;
    pendingAttemptRef.current = attempt;
    audio.muted = false;
    audio.volume = musicConfig.volume;
    setLoading(true);
    try {
      await audio.play();
      if (!enabledRef.current) {
        audio.muted = true;
        audio.pause();
      } else if (pendingAttemptRef.current === attempt) {
        setPlaying(!audio.paused && !audio.muted);
      }
    } catch {
      if (enabledRef.current && pendingAttemptRef.current === attempt && reportError) setError(true);
    } finally {
      if (pendingAttemptRef.current === attempt) {
        pendingAttemptRef.current = null;
        setLoading(false);
      }
    }
  }, []);

  const syncPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!enabledRef.current) {
      audio.muted = true;
      audio.pause();
      setPlaying(false);
      return;
    }
    setPlaying(!audio.paused && !audio.muted);
  }, []);

  useEffect(() => {
    const unlockAudio = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(".music-control")) return;
      void startPlayback(false);
    };
    void startPlayback(false);
    window.addEventListener("pointerdown", unlockAudio, true);
    window.addEventListener("keydown", unlockAudio, true);
    return () => {
      window.removeEventListener("pointerdown", unlockAudio, true);
      window.removeEventListener("keydown", unlockAudio, true);
    };
  }, [startPlayback]);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabledRef.current) {
      enabledRef.current = false;
      playAttemptRef.current += 1;
      pendingAttemptRef.current = null;
      setEnabled(false);
      audio.muted = true;
      audio.pause();
      setPlaying(false);
      setError(false);
      setLoading(false);
      return;
    }
    enabledRef.current = true;
    setEnabled(true);
    setError(false);
    await startPlayback(true);
  }

  return (
    <div className="music-control">
      <audio
        ref={audioRef}
        src={musicConfig.src}
        preload="auto"
        loop
        onPlay={syncPlayback}
        onPlaying={syncPlayback}
        onTimeUpdate={syncPlayback}
        onPause={syncPlayback}
        onError={() => { setPlaying(false); setLoading(false); if (enabledRef.current) setError(true); }}
        aria-label={musicConfig.title}
      />
      <button type="button" className={playing ? "music-button is-playing" : "music-button"} onClick={toggleMusic} aria-label={enabled ? t.musicPause : t.musicPlay} aria-pressed={enabled}>
        <span className="music-button-icon" aria-hidden="true"><i /><i /><i /></span>
        <span className="music-button-text">{loading ? t.musicLoading : enabled ? t.musicOn : t.musicOff}</span>
      </button>
      {error && <span className="music-error" role="status">{t.musicError}</span>}
    </div>
  );
}
