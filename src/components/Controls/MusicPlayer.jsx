import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

/* ── Procedural sound generators using Web Audio API ── */

function createSingingBowl(ctx, dest) {
  // Layered sine tones that mimic a Tibetan singing bowl
  const freqs = [220, 440, 660, 880];
  const gains = [0.35, 0.25, 0.15, 0.08];
  const oscs = freqs.map((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    g.gain.value = gains[i];
    osc.connect(g).connect(dest);
    // Slow vibrato
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.2 + i * 0.1;
    lfoGain.gain.value = 2;
    lfo.connect(lfoGain).connect(osc.frequency);
    lfo.start();
    osc.start();
    return { osc, lfo };
  });
  return () =>
    oscs.forEach(({ osc, lfo }) => {
      osc.stop();
      lfo.stop();
    });
}

function createRain(ctx, dest) {
  // Brown noise filtered to sound like rain
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;

  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 400;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 8000;

  const g = ctx.createGain();
  g.gain.value = 0.6;

  src.connect(hp).connect(lp).connect(g).connect(dest);
  src.start();
  return () => src.stop();
}

function createOceanWaves(ctx, dest) {
  // --- Layer 1: Deep rumble (brown noise, very low-passed) ---
  const bufLen = 4 * ctx.sampleRate;
  const buf = ctx.createBuffer(2, bufLen, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < bufLen; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      d[i] = last * 3.5;
    }
  }

  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;

  // Soft lowpass — keeps it warm, removes the "static TV" harshness
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 350;
  lp.Q.value = 0.7;

  // Volume swell LFO — simulates waves rolling in/out
  const swellGain = ctx.createGain();
  swellGain.gain.value = 0.3;
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.07; // ~14 sec per wave cycle
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 0.25;
  lfo.connect(lfoDepth).connect(swellGain.gain);
  lfo.start();

  src.connect(lp).connect(swellGain).connect(dest);
  src.start();

  // --- Layer 2: High-frequency "foam" / crash layer ---
  const foamBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const fd = foamBuf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) {
    fd[i] = (Math.random() * 2 - 1) * 0.5;
  }
  const foamSrc = ctx.createBufferSource();
  foamSrc.buffer = foamBuf;
  foamSrc.loop = true;

  const foamBp = ctx.createBiquadFilter();
  foamBp.type = "bandpass";
  foamBp.frequency.value = 1200;
  foamBp.Q.value = 0.3;

  // Foam only audible at the wave peak
  const foamGain = ctx.createGain();
  foamGain.gain.value = 0.0;
  const foamLfo = ctx.createOscillator();
  foamLfo.type = "sine";
  foamLfo.frequency.value = 0.07;
  const foamLfoDepth = ctx.createGain();
  foamLfoDepth.gain.value = 0.08;
  foamLfo.connect(foamLfoDepth).connect(foamGain.gain);
  foamLfo.start();

  foamSrc.connect(foamBp).connect(foamGain).connect(dest);
  foamSrc.start();

  return () => {
    src.stop();
    lfo.stop();
    foamSrc.stop();
    foamLfo.stop();
  };
}

function createDrone(ctx, dest) {
  // Deep ambient drone — stacked detuned oscillators
  const notes = [55, 82.41, 110, 164.81]; // A1, E2, A2, E3
  const oscs = notes.map((f, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = i < 2 ? "sine" : "triangle";
    osc.frequency.value = f;
    g.gain.value = 0.12;
    // Slow detune drift
    const lfo = ctx.createOscillator();
    const lg = ctx.createGain();
    lfo.frequency.value = 0.05 + i * 0.03;
    lg.gain.value = 3;
    lfo.connect(lg).connect(osc.detune);
    lfo.start();
    osc.connect(g).connect(dest);
    osc.start();
    return { osc, lfo };
  });
  return () =>
    oscs.forEach(({ osc, lfo }) => {
      osc.stop();
      lfo.stop();
    });
}

const TRACKS = [
  { id: "bowl", name: "Singing Bowl", create: createSingingBowl },
  { id: "rain", name: "Gentle Rain", create: createRain },
  { id: "ocean", name: "Ocean Waves", create: createOceanWaves },
  { id: "drone", name: "Ambient Drone", create: createDrone },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const stopRef = useRef(null);

  const stopSound = useCallback(() => {
    if (stopRef.current) {
      stopRef.current();
      stopRef.current = null;
    }
  }, []);

  const startSound = useCallback(
    (index) => {
      stopSound();
      if (!ctxRef.current) {
        ctxRef.current = new (
          window.AudioContext || window.webkitAudioContext
        )();
        gainRef.current = ctxRef.current.createGain();
        gainRef.current.connect(ctxRef.current.destination);
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      stopRef.current = TRACKS[index].create(ctx, gainRef.current);
    },
    [stopSound],
  );

  // Volume / mute
  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Play / pause
  useEffect(() => {
    if (isPlaying) {
      startSound(currentTrackIndex);
    } else {
      stopSound();
    }
  }, [isPlaying, currentTrackIndex, startSound, stopSound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
      if (ctxRef.current) ctxRef.current.close();
    };
  }, [stopSound]);

  return (
    <div className="music-player">
      <div className="music-controls">
        <select
          className="music-select"
          value={currentTrackIndex}
          onChange={(e) => {
            const idx = Number(e.target.value);
            setCurrentTrackIndex(idx);
            if (!isPlaying) setIsPlaying(true);
          }}
        >
          {TRACKS.map((track, i) => (
            <option key={track.id} value={i}>
              {track.name}
            </option>
          ))}
        </select>

        <div className="music-actions">
          <button
            className="btn-icon"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            className="btn-icon"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

          <input
            type="range"
            className="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setIsMuted(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
