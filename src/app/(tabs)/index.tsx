import { Alert, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native";
import getFileName from "../../Utils/getMusicName";
import Background from "../../components/background";
import React, { useState, useEffect, useRef } from "react";
import { usePlayer } from "../../context/player/playerContext";
import { Fontisto, MaterialIcons, Ionicons } from "@expo/vector-icons";
import TrackPlayer, { Event, State } from "react-native-track-player";

export default function Home() {
  const {
    player,
    updatePlayer,
    list,
    intensity,
    currentTrack,
    getActiveTrack,
    randomWallpaper,
  } = usePlayer();

  const animation = useRef<LottieView>(null);

  //ANIMAÇÃO DE SOM
  useEffect(() => {
    if (player.isPlaying) {
      animation.current?.play(0, 120);
    } else {
      animation.current?.pause();
    }
  }, [player]);


  const playMusic = async () => {
    await TrackPlayer.play();
    getActiveTrack();
    updatePlayer({ ...player, isPlaying: true });
  };

  const pauseMusic = async () => {
    await TrackPlayer.pause();
    updatePlayer({ ...player, isPlaying: false, name: "", uri: "" });
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
      <Background index={randomWallpaper} />

      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        className="text-white my-14 text-3xl text-center"
      >
        {`${getFileName(`${currentTrack?.url}`)}` === "undefined"
          ? ""
          : `${getFileName(`${currentTrack?.url}`)}`}
      </Text>
      
      {/*VIEW ANIMAÇÃO DE MUSICA*/}
      <View className="flex w-full h-24 items-center justify-center">
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
            onPress={player.isPlaying ? pauseMusic : playMusic}
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
              <Ionicons name="options" size={34} color="white" opacity={0.7} />
            </TouchableOpacity>
          </Link>

          <Link href="/library" asChild>
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
