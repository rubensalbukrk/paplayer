import "@/styles/global.css"
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Slot} from 'expo-router'
import {PlayerProvider} from '../context/player/playerContext'
import TrackPlayer from "react-native-track-player"

export default function Layout(){
return (
    <GestureHandlerRootView>
        <PlayerProvider>
             <Slot />      
        </PlayerProvider>
        
    </GestureHandlerRootView>
)
}
TrackPlayer.registerPlaybackService(() => require('../services/trackPlayerService.js'))
