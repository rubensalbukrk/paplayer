import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Link } from "expo-router";
import Background from "@/components/background";
import { usePlayer } from "@/context/player/playerContext";
import getFileName from "@/Utils/getMusicName";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const Mp3List: React.FC = () => {
  const [mp3Files, setMp3Files] = useState<MediaLibrary.Asset[]>([]);
  const { player, updatePlayer, list, updateList, playTopList, verifySound } = usePlayer();

  useEffect(() => {
    const fetchMp3Files = async () => {
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "Cannot access media library without permission"
          );
          return;
        }

        const media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
          first: 100, // limite de quantos arquivos deseja buscar
        });
        //Filtrar todos os arquivos com extensão .mp3
        const mp3Files = media.assets.filter(
          (asset) =>
            asset.mediaType === "audio" && asset.filename.endsWith(".mp3")
          
        );
        setMp3Files(mp3Files);
        const uris = mp3Files.map((file) => file.uri);
        updateList(uris);
      } catch (error) {
        console.error("Error fetching media assets:", error);
      }
    };

    fetchMp3Files();
  }, []);

  const renderItem = ({ item }: { item: MediaLibrary.Asset }) => (
    <TouchableOpacity
    onPress={() => {verifySound(), playTopList(item.uri)}}
    className="w-full h-10 bg-white/20 my-3 px-3 rounded-md"
    >
      <Text className="text-lg text-white">{getFileName(item.uri)}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 w-screen h-screen justify-center items-center">
      <Background />
      <View className="flex-row w-full h-32 pt-10 pl-16  gap-x-5 justify-center items-center rounded-b-xl">
      <MaterialCommunityIcons name="folder-music-outline" size={40} color="white" opacity={0.7} />
      <Text className="w-full text-left text-4xl text-white/60">Minhas musicas</Text>
      </View>
      <FlatList
        data={mp3Files}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing
      />

      <Link href="/" asChild>
        <TouchableOpacity
        className="w-24 h-24 rounded-full justify-center items-center mb-6 bg-white/30 "
  
        >
          <MaterialCommunityIcons name="home-circle-outline" size={62} color="white" />
        </TouchableOpacity>
      </Link>
      
    </View>
  );
};



export default Mp3List;
