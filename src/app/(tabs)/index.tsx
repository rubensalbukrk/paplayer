import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import Background from "@/components/background";
import { Fontisto } from "@expo/vector-icons";
import { usePlayer } from "../../context/player/playerContext";

export default function Home() {
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const { player, updatePlayer } = usePlayer();

  const animation = useRef<LottieView>(null);

  async function playSound() {
    console.log("CARREGANDO SOM");
    const { sound } = await Audio.Sound.createAsync(
    require("../../../assets/song.mp3")
    );
    setSound(sound);

    console.log("TOCANDO MUSICA");

    // await sound.playAsync();
    updatePlayer({name: 'Metallica', status: 'Pause', isPlaying: true});
  }
  async function pauseSound() {
    if (sound) {
      console.log("Pausing Sound");
      await sound.pauseAsync();
      updatePlayer({name: '...', status: 'Play', isPlaying: false});
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (player.isPlaying) {
      animation.current?.play(0, 120);
    } else {
      animation.current?.pause();
    }
  }, [player]);

  return (
    <View className="flex-1 w-screen h-screen justify-center items-center">
      
      <Background />
<Text className="text-white text-5xl">{player.name}</Text>
      <View className="w-96 h-32 my-10">
        {player.isPlaying ? (
          <LottieView
            style={{
              zIndex: 1,
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 50,
            }}
            loop
            ref={animation}
            source={require("../../../assets/animations/playing-white.json")}
          />
        ) : null}
      </View>

      <View
        style={{ width: "85%" }}
        className="flex flex-col bg-white/20 rounded-2xl my-10 py-4 justify-between items-center"
      >
        <View className="flex flex-row w-full h-28 mb-10 px-8 justify-between items-center">
          <TouchableOpacity
            onPress={player.isPlaying ? pauseSound : playSound}
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
            <Text style={{ color: "#fff" }}>Ant</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="z-10 w-28 h-28 bg-white/20 justify-center items-center rounded-full"
            onPress={player.isPlaying ? pauseSound : playSound}
          >
            <Text style={{ color: "#fff" }}>
              {player.status}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={player.isPlaying ? pauseSound : playSound}
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
            <Text style={{ color: "#fff" }}>Prox</Text>
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
