import React from "react";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";
import Background from "../../components/background";
import {Slider} from '@miblanchard/react-native-slider';
import { usePlayer } from "@/context/player/playerContext";
import { View, Text, TouchableOpacity, Switch, StatusBar } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";




const Options: React.FC = () => {
  const {intensity, setTransparency, IsEnabledWallpaper, randomWallpaper, getWallpaper} = usePlayer();

  return (
    <View className="flex-1 w-screen h-screen  items-center">
      <Background index={randomWallpaper} />
      
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
        className="flex-col w-96 h-96 mt-20 shadow-black justify-center items-center shadow-lg rounded-xl overflow-hidden"
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
        <View className="flex flex-row w-80 h-28 px-3 justify-between items-center rounded-b-xl">
          <Text className="text-white text-xl">Wallpapers aleatórios</Text>
          <Switch value={IsEnabledWallpaper} onValueChange={() => getWallpaper()} />
        </View>
        <View className="flex flex-row w-80 h-28 px-3 justify-between items-center rounded-b-xl">
          <Text className="text-white text-xl">Escolher wallpaper</Text>
          <TouchableOpacity className="w-24 h-12 rounded-lg bg-white/20 items-center justify-center">
            <Text className="text-white">Procurar</Text>
          </TouchableOpacity>
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
      <StatusBar barStyle="light-content" animated={true} translucent={true} />
    </View>
  );
};

export default Options;
