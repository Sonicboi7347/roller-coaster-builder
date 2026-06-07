import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import "@fontsource/inter";
import { Ground } from "./components/game/Ground";
import { TrackBuilder } from "./components/game/TrackBuilder";
import { BuildCamera } from "./components/game/BuildCamera";
import { RideCamera } from "./components/game/RideCamera";
import { Sky } from "./components/game/Sky";
import { GameUI } from "./components/game/GameUI";
import { useRollerCoaster } from "./lib/stores/useRollerCoaster";
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


      
      document.removeEventListener('click', startMusicOnInteraction);
      document.removeEventListener('keydown', startMusicOnInteraction);
    };
    
    document.addEventListener('click', startMusicOnInteraction);
    document.addEventListener('keydown', startMusicOnInteraction);
    
    return () => {
      document.removeEventListener('click', startMusicOnInteraction);
      document.removeEventListener('keydown', startMusicOnInteraction);
    };
  }, [daylightMusic, nightMusic, isNightMode, isMuted]);
  
  useEffect(() => {
    if (!daylightMusic || !nightMusic || !hasStartedRef.current) return;
    
    if (isNightMode) {
      daylightMusic.pause();
      nightMusic.currentTime = 0;
      if (!isMuted) nightMusic.play().catch(() => {});
    } else {
      nightMusic.pause();
      daylightMusic.currentTime = 0;
      if (!isMuted) daylightMusic.play().catch(() => {});
    }
  }, [isNightMode, daylightMusic, nightMusic, isMuted]);
  
  useEffect(() => {
    if (!hasStartedRef.current) return;
    
    if (isMuted) {
      if (daylightMusic) daylightMusic.pause();
      if (nightMusic) nightMusic.pause();
    } else {
      if (isNightMode && nightMusic) {
        nightMusic.play().catch(() => {});
      } else if (!isNightMode && daylightMusic) {
        daylightMusic.play().catch(() => {});
      }
    }
  }, [isMuted, daylightMusic, nightMusic, isNightMode]);
  
  return null;
}

function Scene() {
  const { mode } = useRollerCoaster();
  
  return (
    <>
      <Sky />
      <BuildCamera />
      <RideCamera />
      
      <Suspense fallback={null}>
        <Ground />
        <TrackBuilder />
      </Suspense>
    </>
  );
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <MusicController />
      <Canvas
        shadows
        camera={{
          position: [20, 15, 20],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          powerPreference: "default"
        }}
      >
        <Scene />
      </Canvas>
      <GameUI />
    </div>
  );
}

export default App;
