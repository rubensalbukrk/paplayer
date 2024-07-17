import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Link } from "expo-router";
import Background from "@/components/background";
import { usePlayer } from "@/context/player/playerContext";

const Mp3List: React.FC = () => {
  const [mp3Files, setMp3Files] = useState<MediaLibrary.Asset[]>([]);
  const { player, updatePlayer, list, updateList } = usePlayer();

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
    <View className=" w-80 h-8 rounded-md my-3 bg-white/20 justify-start items-center">
      <Text className="text-lg text-white">{item.filename}</Text>
    </View>
  );

  return (
    <View className="flex-1 w-screen h-screen justify-center items-center bg-red-700">
      <Background />
      <Text className="text-5xl text-white justify-start">Lista de musicas</Text>
      <FlatList
        data={mp3Files}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing
      />
      <Link href="/" asChild>
        <TouchableOpacity
        className="w-72 h-16 rounded-lg justify-center items-center bg-white/30 "
  
        >
          <Text className="text-white text-lg">VOLTA</Text>
        </TouchableOpacity>
        
      </Link>
      
    </View>
  );
};



export default Mp3List;
