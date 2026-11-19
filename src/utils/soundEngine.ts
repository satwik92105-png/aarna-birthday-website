/**
 * THE UNCOMMON INSTITUTE — PROCEDURAL SOUND ENGINE
 * Built purely with Web Audio API. Zero external audio file dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isMuted: boolean = true;
  private pianoLoopTimer: any = null;
  private pianoStep: number = 0;

  constructor() {
    // Lazy initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.4, this.ctx.currentTime, 0.1);
    }
    if (muted) {
      this.stopPianoSoundtrack();
    }
  }

  // Mechanical Typewriter Click
  public playMechanicalKey() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140 + Math.random() * 80, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800 + Math.random() * 400, now);
    filter.Q.setValueAtTime(3, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Institutional Access Granted Chime
  public playAccessGranted() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const freqs = [392, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    const now = this.ctx.currentTime;

    freqs.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.0001, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.3);
    });
  }

  // Subtle Atmospheric Museum Drone
  public startMuseumDrone() {
    if (this.isMuted || this.ambientOsc) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    this.ambientOsc = this.ctx.createOscillator();
    this.ambientGain = this.ctx.createGain();

    this.ambientOsc.type = 'sine';
    this.ambientOsc.frequency.setValueAtTime(55, now); // A1 sub rumble

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, now);

    this.ambientGain.gain.setValueAtTime(0.0001, now);
    this.ambientGain.gain.linearRampToValueAtTime(0.08, now + 3);

    this.ambientOsc.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);

    this.ambientOsc.start(now);
  }

  public stopMuseumDrone() {
    if (this.ambientOsc && this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        try {
          this.ambientOsc?.stop();
          this.ambientOsc?.disconnect();
          this.ambientOsc = null;
        } catch (_) {}
      }, 1100);
    }
  }

  // Celestial Chime for Secrets / Discoveries
  public playDiscoveryChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.001, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.07 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 2.0);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 2.1);
    });
  }

  // Triumphant Fanfare for Awards
  public playAwardFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const chords = [523.25, 659.25, 783.99, 1046.5]; // C major
    const now = this.ctx.currentTime;

    chords.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.9);
    });
  }

  // Anomaly Glitch / Warning Alert
  public playAnomalyAlert() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.4);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.55);
  }

  // Heartfelt Piano Progression for Creator's Letter
  public startPianoSoundtrack() {
    if (this.isMuted) return;
    this.initContext();
    this.pianoStep = 0;
    this.stepPianoLoop();
  }

  public stopPianoSoundtrack() {
    if (this.pianoLoopTimer) {
      clearTimeout(this.pianoLoopTimer);
      this.pianoLoopTimer = null;
    }
  }

  private stepPianoLoop() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const C3 = 130.81, G3 = 196.0, A3 = 220.0, F3 = 174.61;
    const C4 = 261.63, E4 = 329.63, G4 = 392.0, A4 = 440.0, B4 = 493.88, D5 = 587.33;

    const chords = [
      { bass: C3, notes: [C4, E4, G4, B4, D5] },
      { bass: G3 * 0.5, notes: [B4 * 0.5, D5 * 0.5, G4, B4, D5] },
      { bass: A3 * 0.5, notes: [A3, C4, E4, G4, C4 * 2] },
      { bass: F3 * 0.5, notes: [A3, C4, E4, G4, A4 * 1] }
    ];

    const currentChord = chords[Math.floor(this.pianoStep / 5) % chords.length];
    const subNoteIdx = this.pianoStep % 5;
    const now = this.ctx.currentTime;

    if (subNoteIdx === 0) {
      this.playSinglePianoNote(currentChord.bass, now, 2.5, true);
    }

    const note = currentChord.notes[subNoteIdx % currentChord.notes.length];
    this.playSinglePianoNote(note, now, 1.4, false);

    this.pianoStep++;
    this.pianoLoopTimer = setTimeout(() => this.stepPianoLoop(), 460);
  }

  private playSinglePianoNote(freq: number, time: number, duration: number, isBass: boolean) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = isBass ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 350 : 1200, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(isBass ? 0.22 : 0.12, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  }
}

export const sound = new SoundEngine();
