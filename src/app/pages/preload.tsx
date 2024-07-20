import React from "react";
import { View, Text, Image} from "react-native";
import intensity from "../../Utils/intensity";
import { LottieView } from "../../Utils/ViewLottie";



const Preload = () => {
  return (
    <View className="flex-1 flex-col gap-6 justify-center items-center">

      <Image className="w-24 h-24" resizeMode="contain" source={require('../../../assets/images/icon.png')} />
      <Text className="text-purple-600 font-bold shadow-lg shadow-purple-700 text-3xl">
        Sincronizando
      </Text>

  </View>
  )
};

export default Preload;