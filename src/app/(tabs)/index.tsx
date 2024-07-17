import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import Background from "@/components/background";
import { Fontisto } from "@expo/vector-icons";
import { usePlayer } from "../../context/player/playerContext";
import getRandomMusic from "@/Utils/randomMusics";
import getFileName from "@/Utils/getMusicName";

export default function Home() {

  const { player, updatePlayer, list, playSound, playTopList, pauseSound, resumeSound } = usePlayer();
  const animation = useRef<LottieView>(null);

  const randomItems = getRandomMusic(list, 4);


  useEffect(() => {
    if (player.isPlaying) {
      animation.current?.play(0, 120);
    } else {
      animation.current?.pause();
    }
  }, [player]);

  return (
    <View className="flex-1 w-screen h-screen  items-center">
      <Background />
      <Text className="relative right-28 my-5 mt-20 text-white text-3xl">
        Aleatórias
      </Text>
      <View className="flex mx-4">
        {randomItems.map((uri) => (
          <TouchableOpacity
            className="bg-white/10 h-10 my-1 rounded-md justify-center px-3"
            key={uri}
            onPress={() => {
              playTopList(uri),
                updatePlayer({
                  name: `${getFileName(uri)}`,
                  status: "Pause",
                  isPlaying: true,
                  uri: ''
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
        ))}
      </View>

      <View className="flex w-full h-32 items-center justify-center">
        {player.isPlaying ? (
          <LottieView
            style={{
              zIndex: 1,
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 50,
            }}
            resizeMode="cover"
            loop
            ref={animation}
            source={require("../../../assets/animations/playing-white.json")}
          />
        ) : null}
      </View>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-white mt-24 text-lg"
      >
        {player.name}
      </Text>
      <View
        style={{ width: "85%" }}
        className="flex absolute bottom-5 flex-col bg-white/20 rounded-2xl py-4 justify-between items-center"
      >
        <View className="flex flex-row w-full h-28 mb-10 px-8 justify-between items-center">
          <TouchableOpacity
            onPress={() => console.log('VOLTAR MUSICA')}
            style={{
              zIndex: 10,
              width: 50,
              height: 50,
              backgroundColor: "#ffffff20",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
            <Fontisto name="step-backwrad" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="z-10 w-28 h-28 bg-white/20 justify-center items-center rounded-full"
            onPress={player.isPlaying ? pauseSound : resumeSound}
          >
            {player.isPlaying ? (
              <Fontisto name="pause" size={32} color="white" />
            ) : (
              <Fontisto name="play" size={32} color="white" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('PROXIMA MUSICA')}
            style={{
              zIndex: 10,
              width: 50,
              height: 50,
              backgroundColor: "#ffffff20",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
            }}
          >
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
                backgroundColor: "#ffffff20",
                borderRadius: 20,
              }}
            >
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
                backgroundColor: "#ffffff20",
                borderRadius: 20,
              }}
            >
              <Fontisto name="play-list" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}
