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

const Mp3List: React.FC = () => {
  const [mp3Files, setMp3Files] = useState<MediaLibrary.Asset[]>([]);

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
      } catch (error) {
        console.error("Error fetching media assets:", error);
      }
    };

    fetchMp3Files();
  }, [mp3Files]);

  const renderItem = ({ item }: { item: MediaLibrary.Asset }) => (
    <View className=" w-80 h-8 rounded-md gap-7 bg-white/20 justify-start items-center">
      <Text>{item.filename}</Text>
    </View>
  );

  return (
    <View className="flex-1 w-screen h-screen bg-red-700">
      <Background />
      <Text className="text-5xl text-white">Lista de musicas</Text>
      <FlatList
        
        data={mp3Files}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing
      />
      <Link href="/" asChild>
        <TouchableOpacity
          style={{
            zIndex: 10,
            width: 200,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000070",
            borderRadius: 20,
          }}
        >
          <Text>VOLTA</Text>
        </TouchableOpacity>
        
      </Link>
      
    </View>
  );
};



export default Mp3List;
