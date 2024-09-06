import { Text, View, TouchableOpacity, StyleSheet, StatusBar} from "react-native";
import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native";
import Background from "../../components/background";
import React, { useEffect, useRef } from "react";
import { usePlayer } from "../../context/player/playerContext";
import { Fontisto } from "@expo/vector-icons";
import TrackPlayer, { usePlaybackState, Event, useTrackPlayerEvents} from "react-native-track-player";
import Aleatorys from "@/components/aleatorys";
import {Slider} from '@miblanchard/react-native-slider';
import PlayerMediaControls from '@/components/playerControls'

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

  const playerState = usePlaybackState();


  useEffect(() => {
    if (playerState.state === 'playing') {
      animation.current?.play(0, 120)
      updatePlayer({...player, isPlaying: true})
    }else{
      animation.current?.pause();
      updatePlayer({...player, isPlaying: false})
    }
  },[playerState])

  return (
    <View className="flex flex-1 w-screen h-screen items-center">
       <Background index={randomWallpaper} />
      
      <Aleatorys />

      {/* VIEW ANIMAÇÃO DE MUSICA */}
      <View className="flex w-full h-20 justify-center items-center">
        {playerState.state === 'playing' ? (
          <LottieView
            style={{
              zIndex: 10,
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
      style={{fontFamily: 'Lato Light'}}
        numberOfLines={3}
        ellipsizeMode="tail"
        className="text-white my-10 text-xl"
      >
        {currentTrack?.title}
      </Text>
      
      {/** BLURVIEW CONTROLES **/}
      <BlurView
        intensity={intensity}
        experimentalBlurMethod="dimezisBlurView"
        style={{ width: "85%" }}
        className="flex shadow-black shadow-lg flex-col bg-white/70  rounded-3xl overflow-hidden py-4 justify-between items-center"
      >
        <PlayerMediaControls />
      </BlurView>

      <StatusBar barStyle="light-content" animated={true} translucent={true} />
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
