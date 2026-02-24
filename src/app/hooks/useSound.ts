"use client";
import { useCallback, useRef } from "react";

// Sound effect types
type SoundType = "click" | "success" | "error" | "hover" | "complete" | "pop";

// Note: In a real app, you would add actual audio files to the public folder
// For now, we create a simple audio context based sound generator
class SoundGenerator {
  private audioContext: AudioContext | null = null;
  
  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume: number = 0.3) {
    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Silently fail if audio is not supported
    }
  }

  playClick() {
    // Short click sound
    this.playTone(800, 0.05, "sine", 0.2);
    setTimeout(() => this.playTone(600, 0.05, "sine", 0.1), 30);
  }

  playHover() {
    // Subtle hover sound
    this.playTone(400, 0.03, "sine", 0.1);
  }

  playSuccess() {
    // Happy success chime
    this.playTone(523, 0.1, "sine", 0.2);
    setTimeout(() => this.playTone(659, 0.1, "sine", 0.2), 100);
    setTimeout(() => this.playTone(784, 0.15, "sine", 0.2), 200);
  }

  playError() {
    // Error buzz
    this.playTone(200, 0.15, "square", 0.15);
    setTimeout(() => this.playTone(150, 0.2, "square", 0.1), 150);
  }

  playComplete() {
    // Victory fanfare
    const notes = [523, 659, 784, 1047];
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 0.2, "sine", 0.25), i * 150);
    });
  }

  playPop() {
    // Bubble pop sound
    this.playTone(600, 0.05, "sine", 0.3);
    this.playTone(800, 0.05, "sine", 0.2);
  }
}

const soundGenerator = new SoundGenerator();

export function useSound() {
  const soundEnabledRef = useRef(true);

  const playSound = useCallback((type: SoundType) => {
    if (!soundEnabledRef.current) return;
    
    switch (type) {
      case "click":
        soundGenerator.playClick();
        break;
      case "hover":
        soundGenerator.playHover();
        break;
      case "success":
        soundGenerator.playSuccess();
        break;
      case "error":
        soundGenerator.playError();
        break;
      case "complete":
        soundGenerator.playComplete();
        break;
      case "pop":
        soundGenerator.playPop();
        break;
    }
  }, []);

  const toggleSound = useCallback(() => {
    soundEnabledRef.current = !soundEnabledRef.current;
    return soundEnabledRef.current;
  }, []);

  const isSoundEnabled = useCallback(() => {
    return soundEnabledRef.current;
  }, []);

  return { playSound, toggleSound, isSoundEnabled };
}

// Hook for playing sounds on component mount
export function useSoundOnMount(soundType: SoundType = "success") {
  const { playSound } = useSound();
  
  // This can be called when a component mounts to play a sound
  const playOnMount = useCallback(() => {
    playSound(soundType);
  }, [playSound, soundType]);

  return playOnMount;
}
