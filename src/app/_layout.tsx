import "@/styles/global.css"
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Slot} from 'expo-router'
import {PlayerProvider} from '../context/player/playerContext'

export default function Layout(){
return (
    <GestureHandlerRootView>
        <PlayerProvider>
             <Slot />      
        </PlayerProvider>
        
    </GestureHandlerRootView>
)
}
