import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Audio, AVPlaybackStatus, InterruptionModeAndroid } from "expo-av";
import getRandomMusic from "@/Utils/randomMusics";

// Definir a interface do jogador
interface PlayerProps {
  name?: string;
  isPlaying: boolean;
  uri?: string;
}

// Definir a interface do contexto
interface PlayerContextType {
  list: Array<string>;
  player: PlayerProps;
  updatePlayer: (newPlayer: PlayerProps) => void;
  updateList: (newList: Array<string>) => void;
}

// Criar o contexto
export const PlayContext = createContext<PlayerContextType | undefined>(
  undefined
);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [list, setList] = useState<Array<string>>([]);
  const [player, setPlayer] = useState<PlayerProps>({
    name: "",
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

  // Valor a ser fornecido para o contexto
  const contextValue: PlayerContextType = {
    list,
    updateList,
    player,
    updatePlayer
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
