import React, {useEffect, useRef} from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import LottieView from 'lottie-react-native'


export default function Preload() { 
  return (
    <View className="flex-1 w-full h-full justify-center items-center">
      <LottieView
      style={{
        zIndex: 10,
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%",
      }}
      resizeMode="contain"
      autoPlay
      loop
      source={require('../../../assets/animations/ASTRONAUT-MUSICS.json')}
      />
      <ActivityIndicator animating={true} size={64} color={'#000'} />
  </View>

  
  )
};