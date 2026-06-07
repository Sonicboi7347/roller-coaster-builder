import { create } from "zustand";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;

  isMuted: boolean;
  isMusicPlaying: boolean;

  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;

  toggleMute: () => void;
  playMusic: () => void;
  stopMusic: () => void;

  playHit: () => void;
  playSuccess: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,

  isMuted: false,
  isMusicPlaying: false,

  setBackgroundMusic: (music) => set({ backgroundMusic: music }),

  setHitSound: (sound) => set({ hitSound: sound }),

  setSuccessSound: (sound) => set({ successSound: sound }),

  toggleMute: () => {
    const { isMuted, backgroundMusic } = get();
    const newMuted = !isMuted;

    set({ isMuted: newMuted });

    // optional: instantly apply mute to music
    if (backgroundMusic) {
      backgroundMusic.muted = newMuted;
    }
  },

  // 🎵 ALWAYS plays Zelda's Lullaby (once set)
  playMusic: () => {
    const { backgroundMusic, isMuted, isMusicPlaying } = get();

    if (!backgroundMusic || isMusicPlaying) return;

    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.muted = isMuted;

    backgroundMusic.play().catch(() => {
      console.log("Autoplay blocked until user interacts");
    });

    set({ isMusicPlaying: true });
  },

  stopMusic: () => {
    const { backgroundMusic } = get();

    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    }

    set({ isMusicPlaying: false });
  },

  playHit: () => {
    const { hitSound, isMuted } = get();
    if (!hitSound || isMuted) return;

    const clone = hitSound.cloneNode() as HTMLAudioElement;
    clone.volume = 0.3;
    clone.play().catch(() => {});
  },

  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (!successSound || isMuted) return;

    successSound.currentTime = 0;
    successSound.play().catch(() => {});
  }
}));
