import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Background from "@/components/background";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import intensity from "@/Utils/intensity";

const Options: React.FC = () => {

  return (
    <View className="flex-1 w-screen h-screen justify-center items-center">
      <Background index={0} />

      <BlurView intensity={intensity}
      experimentalBlurMethod="dimezisBlurView"
            className="w-full bg-white/30 justify-center shadow-black shadow-xl mb-5 rounded-lg overflow-hidden"
      >
      <View className="flex flex-row w-full gap-x-2 h-28 pt-10 pl-6 items-center rounded-b-xl">
        <Ionicons
          name="options"
          size={40}
          color="white"
          opacity={0.7}
        />
        <Text className="text-white text-xl">Modificações</Text>
      </View>
      </BlurView>

      {/**CONTEÚDO PRINCIPAL */}
      <BlurView
      intensity={20}
      experimentalBlurMethod="dimezisBlurView"
      className="flex flex-col w-80 h-60 shadow-black shadow-lg rounded-lg overflow-hidden"
      >
        
      </BlurView>
      
      <BlurView
      intensity={intensity}
      experimentalBlurMethod="dimezisBlurView"
      className="w-24 h-24 my-4 justify-center items-center  bg-white/10 rounded-full overflow-hidden"
      >
        <Link href="/" asChild>
        <TouchableOpacity className="w-24 h-24 rounded-full justify-center items-center my-4">
          <MaterialCommunityIcons
            name="home-circle-outline"
            size={62}
            color="white"
            opacity={0.7}
          />
        </TouchableOpacity>
        </Link>
      </BlurView>
  
    </View>
  );
};

export default Options;
