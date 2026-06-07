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
    const { isMuted } = get();
    set({ isMuted: !isMuted });
  },

  // 🎵 MAIN ZELDA MUSIC
  playMusic: () => {
    const { backgroundMusic, isMuted, isMusicPlaying } = get();

    if (!backgroundMusic || isMusicPlaying) return;

    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    if (!isMuted) {
      backgroundMusic.play().catch(() => {
        console.log("Autoplay blocked");
      });
    }

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

import { useEffect } from "react";
import { useAudio } from "./store/useAudio";

export default function App() {
  const setBackgroundMusic = useAudio((s) => s.setBackgroundMusic);
  const playMusic = useAudio((s) => s.playMusic);

  useEffect(() => {
    const music = new Audio(
      "/music/Zelda Ocarina Of Time - Zelda's Lullaby 4.mp3"
    );

    setBackgroundMusic(music);
    playMusic();
  }, []);
