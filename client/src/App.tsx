import { useEffect } from "react";
import { useAudio } from "./store/useAudio";

export default function App() {
  const setBackgroundMusic = useAudio((s) => s.setBackgroundMusic);
  const playMusic = useAudio((s) => s.playMusic);

  useEffect(() => {
    const music = new Audio(
      "/music/Zelda Ocarina Of Time - Zelda's Lullaby 4.mp3"
    );

    music.loop = true;
    music.volume = 0.5;

    setBackgroundMusic(music);
    playMusic();
  }, []);

export default App;
