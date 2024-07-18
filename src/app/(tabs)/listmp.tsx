import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Link } from "expo-router";
import Background from "@/components/background";
import { usePlayer } from "@/context/player/playerContext";
import getFileName from "@/Utils/getMusicName";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import intensity from "@/Utils/intensity";
import TrackPlayer from "react-native-track-player";

const Mp3List: React.FC = () => {
  const [mp3Files, setMp3Files] = useState<MediaLibrary.Asset[]>([]);
  const { player, updatePlayer, list, updateList } =
    usePlayer();

  //useEffect para listar todos mp3
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

  const playFromUrl = async (uri: string, index: any) => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: index,
        url: uri,
        title: `${getFileName(uri)}`,
        artist: 'Artista da Música'
      });
      await TrackPlayer.play();
  

    } catch (error) {
      console.error('Erro ao reproduzir a música:', error);
    }
  };

  const renderItem = ({ item }: { item: MediaLibrary.Asset }) => (
    <BlurView
      intensity={intensity}
      experimentalBlurMethod="dimezisBlurView"
      className="bg-white/30 justify-center px-3 my-1 mx-3 rounded-lg overflow-hidden"
    >
      <TouchableOpacity
        onPress={() => {
        playFromUrl(item.uri, item.id);
        }}
        className="w-full h-8 my-3 px-3 justify-center rounded-md"
      >
        <Text numberOfLines={1} className="text-lg text-white">
          {getFileName(item.uri)}
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
        data={mp3Files}
        keyExtractor={(item) => item.id}
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

export default Mp3List;
