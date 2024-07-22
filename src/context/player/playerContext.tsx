import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import * as MediaLibrary from "expo-media-library";
import transformMusicList from "@/Utils/transformMusicList";
import { Audio, InterruptionModeAndroid } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer, { Capability, Track, Event, State } from "react-native-track-player";
import { useRouter } from "expo-router";
import getRandoms from "@/Utils/getRandomWallpaper";

interface PlayerProps {
  id: number;
  name?: string;
  isPlaying: boolean;
  uri?: string;
}
interface PlayerContextType {
  list: Array<object>;
  player: PlayerProps;
  updatePlayer: (newPlayer: PlayerProps) => void;
  getAllMP3: () => void;
  intensity: number;
  setTransparency: (value: number) => void;
  currentTrack: Track | null;
  getActiveTrack: () => void;
  randomWallpaper: number;
  IsEnabledWallpaper: boolean;
  getWallpaper: () => void;
}

export const PlayContext = createContext<PlayerContextType | undefined>(
  undefined
);


TrackPlayer.setupPlayer({})
  .then(() => {
    TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
    })
  })

export function PlayerProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [mp3Files, setMp3Files] = useState<MediaLibrary.Asset[]>([]);
  const [list, setList] = useState<Array<Track>>([]);
  const [player, setPlayer] = useState<PlayerProps>({
    id: 0,
    name: "",
    isPlaying: false,
    uri: "",
  });
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [intensity, setIntensity] = useState<number>(17);
  const [randomWallpaper, setRandomWallpaper] = useState<number>(0);
  const [IsEnabledWallpaper, setIsEnabledWallpaper] = useState<boolean>(false);

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
      const uriList = audios.assets.filter(
        (asset) =>
          asset.mediaType === "audio" && asset.filename.endsWith(".mp3")

      ).map((file) => file.uri);
      
      //transformar array de uris, em lista do tipo track
      const list = transformMusicList(uriList)
      setList(list);
      return true;
    } catch (error) {
      return (
        false && console.error("Problema ao obter lista de musicas!", error)
      );
    }
  };
  const initializeTrackPlayer = () => {

   TrackPlayer.setupPlayer().then( () => {
      TrackPlayer.updateOptions({
        alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
          Capability.SeekTo,
        ],
        playIcon: require("../../../assets/play-icon.png"),
        pauseIcon: require("../../../assets/pause-icon.png"),
        stopIcon: require("../../../assets/stop-icon.png"),
        previousIcon: require("../../../assets/previous-icon.png"),
        nextIcon: require("../../../assets/next-icon.png"),
        icon: require("../../../assets/notification-icon.png"),
      });
    })
    const musicList = transformMusicList(list);
  TrackPlayer.add(musicList);
  };

  useEffect(() => {
    if (IsEnabledWallpaper){
      setTimeout(() => getWallpaper(), 20)
    }
  },[IsEnabledWallpaper])

  useEffect(() => {
    getAllMP3();
    initializeTrackPlayer();
  }, []);

      // VERIFICAR STATUS DO PLAYER
    useEffect(() => {
      const status = TrackPlayer.addEventListener(Event.PlaybackState, ({state}) => {
        const playing: boolean = (state === State.Playing)
  
        if (playing){
          updatePlayer({...player, isPlaying: playing})
          return ;
        }else{
          updatePlayer({...player, isPlaying: playing})
          return ;
        }
      });
    })
  

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
        setCurrentTrack({ ...track, id: currentTrackId, url: track.url });
      }
    }
  };

  const setTransparency = (number: number) => {
    setIntensity(number)
   }

   const getWallpaper = () => {
    setIsEnabledWallpaper((previous) => !previous )
    setRandomWallpaper(getRandoms);
   }
   const redirectToHome = () => {
    router.push('/'); // assumindo que a tela inicial é a raiz
  };

  // Valor a ser fornecido para o contexto
  const contextValue: PlayerContextType = {
    list,
    player,
    updatePlayer,
    currentTrack,
    getActiveTrack,
    getAllMP3,
    intensity,
    setTransparency,
    randomWallpaper,
    IsEnabledWallpaper,
    getWallpaper
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
