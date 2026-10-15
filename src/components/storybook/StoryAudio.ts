"use client";

// Procedural Web Audio API sound generator for authentic physical paper flips,
// cricket bat willow-on-ball six strikes, and stadium crowd chants ("Dhoni Dhoni", "Mahi Mahi", "Thala Thala")
// Zero external asset dependencies — guaranteed to work 100% offline without 404s or network lag.

class StoryAudioManager {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private isMuted = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Realistic paper turn sound synthesized via dual-layer friction noise and page-flutter decay
  public playPageTurnSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const bufferSize = Math.floor(ctx.sampleRate * 0.28); // 280ms physical paper turn
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate fibrous paper friction noise
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.98 * b0 + white * 0.05;
        b1 = 0.94 * b1 + white * 0.12;
        b2 = 0.82 * b2 + white * 0.22;
        data[i] = (b0 + b1 + b2) * 0.32;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to mimic high-frequency paper sliding
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.28);
      filter.Q.value = 2.2;

      // Gain envelope: fast attack, realistic paper friction decay, soft settle
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Soft low-frequency book cover thud
  public playBookThudSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(95, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Soft UI click sound for buttons and navigation
  public playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Page turn alias
  public playTurn() {
    this.playPageTurnSound();
  }

  // Thunderous cricket bat hitting leather ball for six (sweet-spot explosive crack + stadium roar)
  public playSixBatStrikeSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Layer 1: High-energy sharp crack of hard leather against English willow (1.8 kHz - 3.2 kHz)
      const crackBufferSize = Math.floor(ctx.sampleRate * 0.08);
      const crackBuffer = ctx.createBuffer(1, crackBufferSize, ctx.sampleRate);
      const crackData = crackBuffer.getChannelData(0);
      for (let i = 0; i < crackBufferSize; i++) {
        crackData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
      }
      const crackSource = ctx.createBufferSource();
      crackSource.buffer = crackBuffer;

      const crackFilter = ctx.createBiquadFilter();
      crackFilter.type = "bandpass";
      crackFilter.frequency.setValueAtTime(2600, now);
      crackFilter.Q.value = 3.5;

      const crackGain = ctx.createGain();
      crackGain.gain.setValueAtTime(0.7, now);
      crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      crackSource.connect(crackFilter);
      crackFilter.connect(crackGain);
      crackGain.connect(ctx.destination);
      crackSource.start(now);

      // Layer 2: Deep resonant body thump of Grade 1 English Willow (140 Hz down to 60 Hz)
      const thumpOsc = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      thumpOsc.type = "triangle";
      thumpOsc.frequency.setValueAtTime(280, now);
      thumpOsc.frequency.exponentialRampToValueAtTime(65, now + 0.18);

      thumpGain.gain.setValueAtTime(0.85, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      thumpOsc.connect(thumpGain);
      thumpGain.connect(ctx.destination);
      thumpOsc.start(now);
      thumpOsc.stop(now + 0.23);

      // Layer 3: Stadium crowd roar reverberation following the six
      const roarDuration = 2.4;
      const roarBufferSize = Math.floor(ctx.sampleRate * roarDuration);
      const roarBuffer = ctx.createBuffer(1, roarBufferSize, ctx.sampleRate);
      const roarData = roarBuffer.getChannelData(0);
      for (let i = 0; i < roarBufferSize; i++) {
        roarData[i] = Math.random() * 2 - 1;
      }
      const roarSource = ctx.createBufferSource();
      roarSource.buffer = roarBuffer;

      const roarFilter = ctx.createBiquadFilter();
      roarFilter.type = "bandpass";
      roarFilter.frequency.setValueAtTime(750, now);
      roarFilter.frequency.linearRampToValueAtTime(950, now + 0.5);
      roarFilter.frequency.exponentialRampToValueAtTime(500, now + roarDuration);
      roarFilter.Q.value = 1.4;

      const roarGain = ctx.createGain();
      roarGain.gain.setValueAtTime(0.001, now);
      roarGain.gain.linearRampToValueAtTime(0.45, now + 0.12);
      roarGain.gain.exponentialRampToValueAtTime(0.0001, now + roarDuration);

      roarSource.connect(roarFilter);
      roarFilter.connect(roarGain);
      roarGain.connect(ctx.destination);
      roarSource.start(now + 0.04);
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Alias for backward compatibility
  public playBatImpactSound() {
    this.playSixBatStrikeSound();
  }

  // Crystal / Golden Trophy chime synthesized via harmonic bells
  public playTrophyChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      [1046.5, 1318.5, 1567.98].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.62);
      });
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Helper for rhythm clapping (two sync claps)
  private playClap(time: number) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const clapBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.06), ctx.sampleRate);
    const data = clapBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.012));
    }
    const source = ctx.createBufferSource();
    source.buffer = clapBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, time);
    filter.Q.value = 2.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(time);
  }

  // "DHONI! DHONI!" Ground Chant Rhythmic Wave
  public playDhoniChant() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 3 Repetitions of: "DHO - NI!" (syllables) + Clap Clap
      for (let rep = 0; rep < 3; rep++) {
        const offset = rep * 1.35;

        // Syllable 1: "DHO-" (resonant chest pitch ~ 220 Hz)
        this.synthesizeCrowdVocal(now + offset, 220, 0.32, 0.55);
        // Syllable 2: "-NI!" (slight up-inflection ~ 260 Hz)
        this.synthesizeCrowdVocal(now + offset + 0.35, 260, 0.38, 0.6);

        // Crowd Claps: 👏 👏
        this.playClap(now + offset + 0.82);
        this.playClap(now + offset + 1.05);
      }
    } catch {
      // Audio autoplay policy catch
    }
  }

  // "MAHI! MAHI!" Ground Chant
  public playMahiChant() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 3 Repetitions of: "MA - HI!" + Clap Clap
      for (let rep = 0; rep < 3; rep++) {
        const offset = rep * 1.3;

        // Syllable 1: "MA-" (~240 Hz)
        this.synthesizeCrowdVocal(now + offset, 240, 0.3, 0.5);
        // Syllable 2: "-HI!" (~290 Hz)
        this.synthesizeCrowdVocal(now + offset + 0.32, 290, 0.36, 0.55);

        // Claps: 👏 👏
        this.playClap(now + offset + 0.78);
        this.playClap(now + offset + 0.98);
      }
    } catch {
      // Audio autoplay policy catch
    }
  }

  // "THALA! THALA!" Whistle Podu Chepauk Chant
  public playThalaChant() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // High-pitched signature whistle accent
      this.playWhistleAccent(now);

      // 3 Repetitions of: "THA - LA!"
      for (let rep = 0; rep < 3; rep++) {
        const offset = rep * 1.35;

        // Syllable 1: "THA-" (~210 Hz)
        this.synthesizeCrowdVocal(now + offset + 0.1, 210, 0.34, 0.6);
        // Syllable 2: "-LA!" (~270 Hz)
        this.synthesizeCrowdVocal(now + offset + 0.46, 270, 0.4, 0.65);

        // Chepauk drum beats / claps: 👏 👏 👏
        this.playClap(now + offset + 0.95);
        this.playClap(now + offset + 1.12);
        this.playClap(now + offset + 1.25);
      }
    } catch {
      // Audio autoplay policy catch
    }
  }

  // Synthesizes a vocalized crowd formant chant burst
  private synthesizeCrowdVocal(time: number, freq: number, duration: number, volume: number) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Multi-voice choir detune
    [-8, 0, 7, 14].forEach((detune) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const formant = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, time);
      osc.detune.setValueAtTime(detune * 12, time);

      // Human vocal formant bandpass filter (A/O vowel region)
      formant.type = "bandpass";
      formant.frequency.setValueAtTime(freq * 3.2, time);
      formant.Q.value = 3.0;

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime((volume / 4) * 0.45, time + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(formant);
      formant.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + duration + 0.05);
    });
  }

  // Signature Whistle Podu whistle sound
  private playWhistleAccent(time: number) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(2600, time);
    osc.frequency.exponentialRampToValueAtTime(3400, time + 0.15);
    osc.frequency.exponentialRampToValueAtTime(2800, time + 0.35);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.2, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.42);
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ambientGain) {
      this.ambientGain.gain.value = this.isMuted ? 0 : 0.05;
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const storyAudio = new StoryAudioManager();
