import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import Background from "@/components/background";
import { Fontisto, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { usePlayer } from "../../context/player/playerContext";
import getRandomMusic from "@/Utils/randomMusics";
import getFileName from "@/Utils/getMusicName";
import TrackPlayer, { Capability, State, Event, useTrackPlayerEvents, PlaybackState, Track } from "react-native-track-player";
import * as MediaLibrary from "expo-media-library";
import intensity from "@/Utils/intensity";

export default function Home() {
  const {
    player,
    updatePlayer,
    list,
    updateList,
  } = usePlayer();

  const animation = useRef<LottieView>(null);
  const randomItems = getRandomMusic(list, 4);
  const [isPlayerSetup, setIsPlayerSetup] = useState<boolean>(false);
  const [mp3Files, setMp3Files] = useState<MediaLibrary.Asset[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [randomWallpaper, setRandmoWallpaper] = useState(Math.floor(Math.random() * 9));

  //Listar todas os .mp3 no media library
  useEffect(() => {
    const fetchMp3Files = async () => {
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Cannot access media library without permission"
          );
          return;
        }

        const media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
          first: 100, // limite de quantos arquivos deseja buscar
        });
        //Filtrar todos os arquivos com extensão .mp3
        const mp3Files = media.assets.filter(
          (asset) =>
            asset.mediaType === "audio" && asset.filename.endsWith(".mp3")
        );
        setMp3Files(mp3Files);
        const uris = mp3Files.map((file) => file.uri);
        updateList(uris);
      } catch (error) {
        console.error("Error fetching media assets:", error);
      }
    };

    fetchMp3Files();
  }, []);

  //ANIMAÇÃO DE SOM
  useEffect(() => {
    if (player.isPlaying) {
      animation.current?.play(0, 120);
    } else {
      animation.current?.pause();
    }
  }, [player]);

  const transformMusicList = (list: any) => {
    return list.map((item: string, index: number) => ({
      id: index.toString(),
      url: item,
      title: item,
      artist: "Artista Desconhecido",
    }));
  };

  const musicList = transformMusicList(list);

    //INICIAR TrackPlayer
    useEffect(() => {
  
      TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        playIcon: require("../../../assets/play-icon.png"),
        pauseIcon: require("../../../assets/pause-icon.png"),
        stopIcon: require("../../../assets/stop-icon.png"),
        previousIcon: require("../../../assets/previous-icon.png"),
        nextIcon: require("../../../assets/next-icon.png"),
        icon: require("../../../assets/notification-icon.png"),
      });
      TrackPlayer.setQueue(musicList);
    
  }, []);

  const getActiveTrack = async () => {
    const currentTrackId = await TrackPlayer.getActiveTrackIndex();
    if (currentTrackId !== null) {
      const track = await TrackPlayer.getTrack(currentTrackId || 0);
      if (track){
        setCurrentTrack(track);
      }
    }
  };

  const playFromUrl = async (uri: string, index: number) => {
    try {
      await TrackPlayer.stop();
      await TrackPlayer.add({
        id: index,
        url: uri,
        title: `${getFileName(uri)}`,
        artist: 'Artista da Música'
      });
      await TrackPlayer.play();
      getActiveTrack();

    } catch (error) {
      console.error('Erro ao reproduzir a música:', error);
    }
  };

  const playMusic = async () => {
    await TrackPlayer.skip(Math.floor(Math.random() * 9));
    await TrackPlayer.play(); // Inicia a reprodução
    updatePlayer({isPlaying: true})
    getActiveTrack();
  };

  const pauseMusic = async () => {
    await TrackPlayer.pause();
    updatePlayer({isPlaying: false, name: 'musica 1', uri: ''});
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
    getActiveTrack();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    getActiveTrack();
  };
  

  return (
    <View className="flex-1 w-screen h-screen  items-center">
      <Background index={0} />

      <Text className="relative right-28 my-3 mt-12 text-white text-3xl">
        Aleatórias
      </Text>

      <View className="flex mx-4 shadow-black shadow-lg">
        {randomItems.map((uri, index) => (
          <BlurView
          key={index}
            intensity={intensity}
            experimentalBlurMethod="dimezisBlurView"
            className="bg-white/30 justify-center shadow-black shadow-md my-1 rounded-lg overflow-hidden"
          >
            <TouchableOpacity
              className="h-10 my-1 justify-center px-3"
              onPress={() => {
                playFromUrl(uri, index),
                  updatePlayer({
                    name: `${getFileName(uri)}`,
                    isPlaying: true,
                    uri: uri,
                  }),
                  getActiveTrack()
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                className="text-white text-md text-left"
              >
                {getFileName(uri)}
              </Text>
            </TouchableOpacity>
          </BlurView>
        ))}
      </View>

      {/*VIEW ANIMAÇÃO DE MUSICA*/}
      <View className="flex w-full h-28 items-center justify-center">
        {player.isPlaying ? (
          <LottieView
            style={{
              zIndex: 1,
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 30,
            }}
            resizeMode="cover"
            loop
            ref={animation}
            source={require("../../../assets/animations/playing-white.json")}
          />
        ) : null}
      </View>

      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        className="text-white mt-24 text-4xl text-center"
      >
        {`${getFileName(`${currentTrack?.url}` )}` === 'undefined' ? '...' : `${getFileName(`${currentTrack?.url}` )}`}
      </Text>

      {/** BLURVIEW CONTROLES **/}
      <BlurView
        intensity={intensity}
        experimentalBlurMethod="dimezisBlurView"
        style={{ width: "85%" }}
        className="flex absolute shadow-black shadow-lg bottom-5 flex-col bg-white/70  rounded-3xl overflow-hidden py-4 justify-between items-center"
      >
        <View className="flex flex-row w-full h-28 mb-10 px-8 justify-between items-center">
          <TouchableOpacity
            onPress={() => {
              skipToPrevious();
            }}
            style={{
              zIndex: 2,
              width: 50,
              height: 50,
              backgroundColor: "#ffffff30",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            {/** ANTERIOR MUSICA **/}
            <Fontisto name="step-backwrad" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="z-10 w-28 h-28 bg-white/20 justify-center items-center rounded-full"
            onPress={player.isPlaying ? pauseMusic: playMusic}
          >
            {/** PLAY **/}
            {player.isPlaying ? (
              <Fontisto
                name="pause"
                size={32}
                color="white"
                suppressHighlighting={true}
              />
            ) : (
              <Fontisto name="play" size={32} color="white" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              skipToNext();
            }}
            style={{
              zIndex: 10,
              width: 50,
              height: 50,
              backgroundColor: "#ffffff30",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            {/** PROXIMA MUSICA **/}
            <Fontisto name="step-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex w-full h-12 flex-row justify-between items-end px-4">
          <Link href="/" asChild>
            <TouchableOpacity
              style={{
                zIndex: 10,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff10",
                borderRadius: 50,
              }}
            >
              {/** LIKE **/}
              <Fontisto name="heart" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        {/**OPTIONS MENU */}
        <Link href="/options" asChild>
        <TouchableOpacity
        style={{
          zIndex: 10,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff10",
          borderRadius: 50,
        }}
        >
          <Ionicons
            name="options"
            size={34}
            color="white"
            opacity={0.7}
          />
        </TouchableOpacity>
        </Link>
   
          <Link href="/listmp" asChild>
            <TouchableOpacity
              style={{
                zIndex: 10,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff10",
                borderRadius: 50,
              }}
            >
              {/** BIBLIOTECA **/}
              <MaterialIcons name="queue-music" size={32} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: "center",
    justifyContent: "center",

    borderRadius: 20,
  },

  box: {
    width: "60%",
    height: "40%",
  },
  boxEven: {
    backgroundColor: "white",
  },
  boxOdd: {
    backgroundColor: "white",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
