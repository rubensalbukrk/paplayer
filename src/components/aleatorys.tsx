import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { usePlayer } from '@/context/player/playerContext';
import TrackPlayer, {Track} from 'react-native-track-player'
import { BlurView } from 'expo-blur';
import {Feather} from '@expo/vector-icons'

const Aleatorys = () => {
    const {list, intensity, getActiveTrack, updatePlayer } = usePlayer();

    const getRandomItems = (list: Array<Track>, count: number): Track[] => {
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };

    const randomItems = getRandomItems(list,4);
    return (
        <View className='w-screen h-28 mt-12' >
          <Text style={{fontFamily: 'Lato Regular'}} className="text-3xl text-white ml-8 my-2">Aleatórias</Text>
        {randomItems?.map((item: Track) => (
          <BlurView
          intensity={intensity}
          experimentalBlurMethod="dimezisBlurView"
          className="bg-white/30 justify-center h-12 pl-16 my-1 mx-6 rounded-lg overflow-hidden"
        >
          <TouchableOpacity
            onPress={() => {
            TrackPlayer.skip(item.id),
            TrackPlayer.play();
            getActiveTrack();
            
            }}
            className="absolute w-12 bg-white/20 h-full my-3 items-center justify-center rounded-md"
          >
           <Feather name="play" color={"white"} size={32} /> 
          </TouchableOpacity>
            <Text numberOfLines={1} className="text-lg text-white">
              {item.title}
            </Text>
        </BlurView>
        ))}
      </View>
    )
}

export default Aleatorys;