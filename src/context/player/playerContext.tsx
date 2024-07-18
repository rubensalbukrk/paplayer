import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Audio, AVPlaybackStatus, InterruptionModeAndroid } from "expo-av";
import getRandomMusic from "@/Utils/randomMusics";

// Definir a interface do jogador
interface PlayerProps {
  name: string;
  status: string;
  isPlaying: boolean;
  uri: string;
}

// Definir a interface do contexto
interface PlayerContextType {
  list: Array<string>;
  player: PlayerProps;
  updatePlayer: (newPlayer: PlayerProps) => void;
  updateList: (newList: Array<string>) => void;
  verifySound: () => Promise<boolean>;
  playSound: (uri?: string) => Promise<void>;
  pauseSound: () => Promise<void>;
  resumeSound: () => Promise<void>;
  playTopList: (uri?: string) => Promise<void>;
  playNext: (uri?: string) => Promise<void>;
  playPrevious: () => Promise<void>;
}

// Criar o contexto
export const PlayContext = createContext<PlayerContextType | undefined>(
  undefined
);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [list, setList] = useState<Array<string>>([]);
  const [player, setPlayer] = useState<PlayerProps>({
    name: "",
    status: "Play",
    isPlaying: false,
    uri: "",
  });

  useEffect(() => {
    (async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false
    });
    })();
  }, []);

  const updatePlayer = (newPlayer: Partial<PlayerProps>) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      ...newPlayer,
    }));
  };

  const updateList = (newList: Array<string>) => {
    setList(newList);
  };

  const verifySound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.pauseAsync();
      await sound.unloadAsync();
      return true;
    }
    else return false;
  }

  const playSound = async (uri?: string) => {
    
    // Se já houver uma instância de `Audio.Sound`, pausar ou parar o som atual
    if (sound) {
      await sound.stopAsync();
      await sound.pauseAsync();
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: uri || player.uri },
      { shouldPlay: true }
    );

    setSound(newSound);
    updatePlayer({
      name: player.name,
      isPlaying: true,
      status: "Playing",
      uri: uri || player.uri,
    });

    newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (status.isLoaded && !status.isPlaying) {
        updatePlayer({ name: player.name, isPlaying: false, status: "Paused" });
      }
    });
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      updatePlayer({ name: '...', isPlaying: false, status: "Paused" });
    }
  };

  const resumeSound = async () => {
    if (sound) {
      await sound.playAsync();
      updatePlayer({ isPlaying: true, status: "Playing" });
    }
  };

  async function playNext() {
    if (currentMusicIndex < list.length - 1) {
      const nextIndex = currentMusicIndex + 1;
      setCurrentMusicIndex(nextIndex);
      console.log(nextIndex)
      await playSound(list[nextIndex].toString());
    }
  }

  async function playPrevious() {
    if (currentMusicIndex > 0) {
      const previousIndex = currentMusicIndex - 1;
      setCurrentMusicIndex(previousIndex);
      await playSound(list[previousIndex]);
    }
  }


  async function playTopList(uri?: string) {

    const randomIndex = Math.floor(Math.random() * list.length);
    const selectedUri = uri || list[Math.floor(Math.random() * list.length)];

    // Remover "file:///" e o caminho antes do nome do arquivo
    let nameMusic = selectedUri.replace(/^.*[\\\/]/, "");
    // Remover a extensão .mp3
    nameMusic = nameMusic.replace(/\.mp3$/, "");



    //Play no mp3
    const {sound} =  await Audio.Sound.createAsync({ uri: selectedUri });
    setSound(sound);
    await sound.playAsync();
    updatePlayer({ name: nameMusic, status: "Pause", isPlaying: true, uri: `${uri}` });

  }

  // Valor a ser fornecido para o contexto
  const contextValue: PlayerContextType = {
    list,
    updateList,
    player,
    updatePlayer,
    verifySound,
    playTopList,
    playSound,
    pauseSound,
    resumeSound,
    playNext,
    playPrevious
  };

  return (
    <PlayContext.Provider value={contextValue}>{children}</PlayContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
