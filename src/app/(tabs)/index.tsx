import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Button
} from "react-native";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import Background from "@/components/background";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { usePlayer } from "../../context/player/playerContext";
import getRandomMusic from "@/Utils/randomMusics";
import getFileName from "@/Utils/getMusicName";
import TrackPlayer, { Capability, State } from "react-native-track-player";

export default function Home() {
  const {
    player,
    updatePlayer,
    list,
    playSound,
    playTopList,
    pauseSound,
    resumeSound,
    verifySound,
    playNext,
    playPrevious,
  } = usePlayer();
  const animation = useRef<LottieView>(null);
  const randomItems = getRandomMusic(list, 4);

  const intensity: number = 15;

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
  console.log(musicList);

  useEffect(() => {
    async function setupTrackPlayer() {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],

        // Icons for the notification on Android (if you don't like the default ones)
        playIcon: require("../../../assets/play-icon.png"),
        pauseIcon: require("../../../assets/pause-icon.png"),
        stopIcon: require("../../../assets/stop-icon.png"),
        previousIcon: require("../../../assets/previous-icon.png"),
        nextIcon: require("../../../assets/next-icon.png"),
        icon: require("../../../assets/notification-icon.png"),
      });
      await TrackPlayer.add(musicList);
    }

    setupTrackPlayer();

  }, []);

  
  const playMusic = async () => {
    await TrackPlayer.skip(0); // Pula para a primeira música na lista
    await TrackPlayer.play(); // Inicia a reprodução
    console.log(musicList[0])
  };

  const pauseMusic = async () => {
    await TrackPlayer.pause();
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  return (
    <View className="flex-1 w-screen h-screen  items-center">
      <Background />
      <Text className="relative right-28 my-3 mt-12 text-white text-3xl">
        Aleatórias
      </Text>
      <View className="flex mx-4 shadow-black shadow-lg">
        {randomItems.map((uri) => (
          <BlurView
          intensity={intensity}
          experimentalBlurMethod="dimezisBlurView"
          className="bg-white/30 justify-center shadow-black shadow-md my-1 rounded-lg overflow-hidden">
          <TouchableOpacity
            className="h-10 my-1 justify-center px-3"
            key={uri}
            onPress={() => {
              verifySound(),
                playTopList(uri),
                updatePlayer({
                  name: `${getFileName(uri)}`,
                  status: "Pause",
                  isPlaying: true,
                  uri: "",
                });
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
   
      <Button title="Play" onPress={playMusic} />
      <Button title="Pause" onPress={pauseMusic} />
      <Button title="Next" onPress={skipToNext} />
      <Button title="Previous" onPress={skipToPrevious} />


      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-white mt-24 text-lg"
      >
        {`${getFileName(player.uri)}`}
      </Text>


      {/** BLURVIEW CONTROLES **/}
        <BlurView intensity={intensity} experimentalBlurMethod="dimezisBlurView"
          style={{ width: "85%" }}
          className="flex absolute shadow-black shadow-lg bottom-5 flex-col bg-white/70  rounded-3xl overflow-hidden py-4 justify-between items-center"
        >
          <View className="flex flex-row w-full h-28 mb-10 px-8 justify-between items-center">
            <TouchableOpacity
              onPress={() => {
                playPrevious();
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
              onPress={player.isPlaying ? pauseSound : resumeSound}
            >
              {/** PLAY **/}
              {player.isPlaying ? (
                <Fontisto name="pause" size={32} color="white" suppressHighlighting={true} />
              ) : (
                <Fontisto name="play" size={32} color="white" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                playNext();
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
