import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import * as MediaLibrary from "expo-media-library";
import TrackPlayer, { Capability, Track } from "react-native-track-player";
import { Audio, InterruptionModeAndroid } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PlayerProps {
  name?: string;
  isPlaying: boolean;
  uri?: string;
}
interface PlayerContextType {
  list: Array<string>;
  player: PlayerProps;
  updatePlayer: (newPlayer: PlayerProps) => void;
  getAllMP3: () => void;
  intensity: number;
  setTransparency: (value: number) => void;
  currentTrack: Track | null;
  getActiveTrack: () => void;
}

export const PlayContext = createContext<PlayerContextType | undefined>(
  undefined
);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [mp3Files, setMp3Files] = useState<MediaLibrary.Asset[]>([]);
  const [list, setList] = useState<Array<string>>([]);
  const [player, setPlayer] = useState<PlayerProps>({
    name: "",
    isPlaying: false,
    uri: "",
  });
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [intensity, setIntensity] = useState<number>(17);

  useEffect(() => {
    getAllMP3();
  }, []);

  const getAllMP3 = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Você não permitiu acesso a sua biblioteca de musicas");
        return;
      }

      const audios = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 100, // limite de quantos arquivos deseja buscar
      });
      //Filtrar todos os arquivos com extensão .mp3
      const mp3List = audios.assets.filter(
        (asset) =>
          asset.mediaType === "audio" && asset.filename.endsWith(".mp3")

      ).map((file) => file.uri);

      setList(mp3List);
      return true;
    } catch (error) {
      return (
        false && console.error("Problema ao obter lista de musicas!", error)
      );
    }
  };

  //Permanecer audio em segundo plano
  useEffect(() => {
    (async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        playThroughEarpieceAndroid: false,
      });
    })();
  }, []);

  const updatePlayer = (newPlayer: Partial<PlayerProps>) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      ...newPlayer,
    }));
  };

  const getActiveTrack = async () => {
    const currentTrackId = await TrackPlayer.getActiveTrackIndex();
    if (currentTrackId !== null) {
      const track = await TrackPlayer.getTrack(currentTrackId || 0);
      if (track){
        setCurrentTrack(track);
      }
    }
  };

  const setTransparency = (number: number) => {
    setIntensity(number)
   }

  // Valor a ser fornecido para o contexto
  const contextValue: PlayerContextType = {
    list,
    player,
    updatePlayer,
    currentTrack,
    getActiveTrack,
    getAllMP3,
    intensity,
    setTransparency
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
