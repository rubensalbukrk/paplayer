import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Foundation from '@expo/vector-icons/Foundation';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs 
    screenOptions={{
        headerShown: false,
        tabBarLabelStyle: ({
          fontSize: 14
        }),
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          paddingTop: 8
        },
        tabBarActiveTintColor: '#ff5454',
        tabBarInactiveTintColor: '#888888', 
        tabBarBackground: () => (
          <BlurView 
            intensity={20}
            experimentalBlurMethod="dimezisBlurView"
            style={
              {...StyleSheet.absoluteFillObject,
                overflow: 'hidden',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
              }
            } />
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Now',
          headerStyle: ({
            backgroundColor: '#1e1e1e',
        }),
        headerTitleStyle: ({color: '#fff'}),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "headset-sharp" : "headset-outline"} size={size} color={color} />
          ),
          
        }}
        
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Songs',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "musical-note-sharp" : "musical-note-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: 'Extras',
          tabBarIcon: ({ color, size, focused }) => (
            <Foundation name={focused ? "indent-less" : "indent-more"}  size={size} color={color} />
          ),
          
        }}
      />
    </Tabs>
  );
}