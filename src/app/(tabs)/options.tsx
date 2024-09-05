import React from "react";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";
import Background from "../../components/background";
import {Slider} from '@miblanchard/react-native-slider';
import { usePlayer } from "@/context/player/playerContext";
import { View, Text, Switch, StatusBar } from "react-native";
import {  Ionicons } from "@expo/vector-icons";




const Options: React.FC = () => {
  const {intensity, setTransparency, IsEnabledWallpaper, randomWallpaper, getWallpaper} = usePlayer();

  return (
    <View className="flex flex-1 w-screen h-screen bg-slate-950">
    <Background index={randomWallpaper} />
      <BlurView
        intensity={intensity}
        experimentalBlurMethod="dimezisBlurView"
        className="flex flex-3 w-full h-36 top-0 mb-5 bg-white/30 justify-center shadow-black shadow-xl rounded-lg overflow-hidden"
      >
        <View className="flex flex-row w-full gap-x-2 h-28 pt-10 pl-6 items-center rounded-b-xl">
          <Ionicons name="options" size={40} color="white" opacity={0.7} />
          <Text className="text-white text-xl">Customize</Text>
        </View>
      </BlurView>

      <BlurView
        intensity={intensity}
        experimentalBlurMethod="dimezisBlurView"
        className="flex flex-2 flex-col w-screen mt-10 py-10 shadow-black justify-center items-center shadow-lg rounded-xl overflow-hidden"
      >
        {/**CONTEÚDO PRINCIPAL */}
        <View className="flex flex-2 flex-col w-80 h-28 px-3 rounded-b-xl">
          <Text className="text-white text-2xl">Opacity</Text>
          <Slider
          minimumTrackTintColor="#ff5454"
          maximumTrackTintColor="#444"
          thumbTintColor="#ff5454"
            minimumValue={1}
            maximumValue={100}
            value={intensity}
            onValueChange={(value) => setTransparency(Math.round(value[0]))}
      />
      <Text className="text-white">{intensity}</Text>
        </View>

        <View className="flex flex-row w-80 h-28 px-3 justify-between items-center rounded-b-xl">
          <Text className="text-white text-xl">Random wallpapers</Text>
          <Switch 
          value={IsEnabledWallpaper}
          trackColor={{
            true: "#ff5454"
          }}
          onValueChange={() => getWallpaper()} />
        </View>
        
      </BlurView>

      <StatusBar barStyle="light-content" animated={true} translucent={true} />
    </View>
  );
};

export default Options;
