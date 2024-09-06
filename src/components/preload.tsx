import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function Preload() { 
  return (
    <View className="flex-1 w-full h-full justify-center bg-slate-950 items-center">
      
      <ActivityIndicator animating={true} size={64} color={'#ff5454'} />
  </View>

  
  )
};