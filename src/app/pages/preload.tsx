import React from "react";
import { BlurView } from "expo-blur";
import { View, Text } from "react-native";
import intensity from "../../Utils/intensity";
import { LottieView } from "../../Utils/ViewLottie";



const Preload = () => {
  return (
    <View className="flex-1 flex-col justify-center items-center">
    <BlurView
      intensity={intensity}
      experimentalBlurMethod="dimezisBlurView"
      className="flex-col justify-center place-items-center rounded-lg bg-blue-200 shadow-black shadow-lg"
    >
      <Text className="text-black font-bold text-2xl">
        Sincronizando
      </Text>
    </BlurView>
  </View>
  )
};

export default Preload;