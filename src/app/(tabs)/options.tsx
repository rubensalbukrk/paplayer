import React, { useEffect, useState } from "react";
import {Slider, SliderProps} from '@miblanchard/react-native-slider';
import {AppRegistry, View, Text, FlatList, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Background from "../../components/background";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { usePlayer } from "@/context/player/playerContext";




const Options: React.FC = () => {
  const {intensity, setTransparency} = usePlayer();

  return (
    <View className="flex-1 w-screen h-screen  items-center">
      <Background index={0} />
      
      <BlurView
        intensity={intensity}
        experimentalBlurMethod="dimezisBlurView"
        className="w-full h-36 top-0 mb-5 bg-white/30 justify-center shadow-black shadow-xl rounded-lg overflow-hidden"
      >
        <View className="flex flex-row w-full gap-x-2 h-28 pt-10 pl-6 items-center rounded-b-xl">
          <Ionicons name="options" size={40} color="white" opacity={0.7} />
          <Text className="text-white text-xl">Modificações</Text>
        </View>
      </BlurView>

      <BlurView
        intensity={intensity}
        experimentalBlurMethod="dimezisBlurView"
        className="flex flex-col w-96 h-80 mt-20 shadow-black justify-center items-center shadow-lg rounded-xl overflow-hidden"
      >
        {/**CONTEÚDO PRINCIPAL */}
        <View className="flex flex-col w-80 h-28 px-3 rounded-b-xl">
          <Text className="text-white text-2xl">Transparência</Text>
          <Slider
        minimumValue={1}
        maximumValue={100}
        value={intensity}
        onValueChange={(val) => setTransparency(Math.round(val))}
        
      />
      <Text>{intensity}</Text>
        </View>
        <View className="flex flex-row w-80 h-28 pt-10 px-3 justify-between items-center rounded-b-xl">
          <Text className="text-white text-xl">Random Wallpapers</Text>
          <Switch  />
        </View>
      </BlurView>

      <BlurView
        intensity={intensity}
        experimentalBlurMethod="dimezisBlurView"
        className="absolute bottom-10 w-24 h-24 my-4 justify-center items-center bg-white/10 rounded-full overflow-hidden"
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
