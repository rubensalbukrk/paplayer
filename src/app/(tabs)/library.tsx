import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Link } from "expo-router";
import Background from "../../components/background";
import { usePlayer } from "../../context/player/playerContext";
import { BlurView } from "expo-blur";
import TrackPlayer, { Track } from "react-native-track-player";
import FastImage from 'expo-fast-image';
import unknowArtUri from '../../../assets/images/unknowArt.png'

const Library: React.FC = () => {
  const { player, updatePlayer, list, intensity, getActiveTrack, randomWallpaper } = usePlayer();

  const playFromUrl = async (item: Track, index: number) => {
    try {
      TrackPlayer.stop();
      TrackPlayer.skip(index);
      updatePlayer({
        ...player,
        uri: item.url,
        isPlaying: true,
        name: item.title,
      });
      TrackPlayer.play();
      getActiveTrack();
    } catch (error) {
      Alert.alert(`Erro ao reproduzir a música: ${error}`, "Aviso");
    }
  };

  const renderItem = ({ item }: { item: Track }) => (
    <TouchableOpacity
        onPress={() => {
          playFromUrl(item, item.id);
        }}
        className="flex w-96 h-14 my-2 items-center justify-center rounded-md"
      >
    <BlurView
      intensity={intensity}
      experimentalBlurMethod="dimezisBlurView"
      className="flex flex-row w-96 h-14 bg-white/30 gap-x-2 my-1 rounded-lg overflow-hidden"
    >
        <FastImage
        style={{ width: 50, height: '100%' }}
          source={
            item.artwork
              ? { uri: item.artwork, priority: FastImage.priority.normal }
              : unknowArtUri
          }
        resizeMode={FastImage.resizeMode?.contain}
        />
      
        <View className="flex flex-col pr-3">
        <Text numberOfLines={1} ellipsizeMode="tail" className="text-lg text-slate-200">
            {item.title}
          </Text>
          <Text numberOfLines={1} className="text-md text-slate-200">
            {item.artist}
          </Text>
        </View>
    </BlurView>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 w-screen h-screen justify-center self-center items-center">
      <Background index={randomWallpaper} />

      <BlurView
        intensity={intensity}
        experimentalBlurMethod="dimezisBlurView"
        className="w-full h-28 bg-white/30 justify-center items-center shadow-black shadow-xl mb-5 rounded-b-xl overflow-hidden"
      >

          <Text className="text-white text-xl">Songs</Text>

      </BlurView>

      <FlatList
        style={{width: '100%', paddingHorizontal: 10, display: 'flex', height: '70%', alignSelf: 'center'}}
        maxToRenderPerBatch={20}
        ListFooterComponent={() => 
          <View className='w-96 h-12 mt-12 bg-slate-600/20'/>
        }
        data={list}
        keyExtractor={(track, index) => index.toString()}
        renderItem={renderItem}
        refreshing
      />

      <StatusBar barStyle="light-content" animated={true} translucent={true} />
    </View>
  );
};

export default Library;
