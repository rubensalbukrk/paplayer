import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Background from "../../components/background";
import { usePlayer } from "../../context/player/playerContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import TrackPlayer, { Track } from "react-native-track-player";

const fetchListFilesMp3: React.FC = () => {
  const { player, updatePlayer, list, intensity, getActiveTrack } =
    usePlayer();


  const playFromUrl = async (item: any, index: number) => {
    try {
     await TrackPlayer.skip(index);
      updatePlayer({...player, uri: item.url, isPlaying: true, name: item.title })
      getActiveTrack();
      alert(`nome: ${item.title}, url: ${item.url}`)
    } catch (error) {
      console.error('Erro ao reproduzir a música:', error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <BlurView
      intensity={intensity}
      experimentalBlurMethod="dimezisBlurView"
      className="bg-white/30 justify-center px-3 my-1 mx-3 rounded-lg overflow-hidden"
    >
      <TouchableOpacity
        onPress={() => {
        playFromUrl(item, item.id);
        }}
        className="w-full h-8 my-3 px-3 justify-center rounded-md"
      >
        <Text numberOfLines={1} className="text-lg text-white">
          {item.title}
        </Text>
      </TouchableOpacity>
    </BlurView>
  );

  return (
    <View className="flex-1 w-screen h-screen justify-center items-center">
      <Background index={0} />

      <BlurView intensity={intensity}
      experimentalBlurMethod="dimezisBlurView"
            className="w-full bg-white/30 justify-center shadow-black shadow-xl mb-5 rounded-lg overflow-hidden"
      >
      <View className="flex flex-row w-full gap-x-2 h-28 pt-10 pl-6 items-center rounded-b-xl">
        <MaterialCommunityIcons
          name="folder-music-outline"
          size={40}
          color="white"
          opacity={0.7}
        />
        <Text className="text-white text-xl">Minhas musicas</Text>
      </View>
      </BlurView>

      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString() }
        renderItem={renderItem}
        refreshing
      />

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

export default fetchListFilesMp3;
