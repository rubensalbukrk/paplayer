import React, {useEffect, useRef} from "react";
import { View, Text, Image} from "react-native";
import LottieView from "lottie-react-native";

const Preload = () => {
  useEffect(() => {
    animation.current?.play(0, 120);
    return () => {
      animation.current?.pause();
    }
  })
  const animation = useRef<LottieView>(null);

  return (
    <View className="flex-1 w-full h-full items-center justify-center bg-white">
      <LottieView
      style={{width: '100%', height: '100%'}} 
      autoPlay
      loop
      ref={animation}
      duration={2000}
      source={require('../../../assets/animations/ASTRONAUT-MUSICS.json')}
      />
  </View>
  )
};

export default Preload;