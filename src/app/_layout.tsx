import "@/styles/global.css"
import {Slot} from 'expo-router'
import {useFonts } from 'expo-font'
import { LogBox } from "react-native"
import Preload from "../components/preload"
import TrackPlayer from "react-native-track-player"
import {PlayerProvider} from '../context/player/playerContext'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
    
LogBox.ignoreAllLogs(true);

export default function Layout(){
    const [fontsLoaded] = useFonts({
        'Doppio One': require('../../assets/fonts/DoppioOne.ttf'),
        'Lato Light': require('../../assets/fonts/Lato-Light.ttf'),
        'Lato Regular': require('../../assets/fonts/Lato-Regular.ttf')
    });

      if(!fontsLoaded) {
        return <Preload />;
      }

return (
    <GestureHandlerRootView>
        <PlayerProvider>
             <Slot />      
        </PlayerProvider>
    </GestureHandlerRootView>
)

}
TrackPlayer.registerPlaybackService(() => require('../services/trackPlayerService.js'))
