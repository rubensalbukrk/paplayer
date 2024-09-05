import React, {useEffect, useState} from 'react'
import {Ionicons} from '@expo/vector-icons'
import {
   View,
   Text, 
   TouchableOpacity, 
   StyleSheet } from 'react-native';
import TrackPlayer,{ 
  State,
  Event, 
  RepeatMode,
  useTrackPlayerEvents,
  useProgress } from 'react-native-track-player'
  import { Slider } from '@miblanchard/react-native-slider';


const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
  
export const PlayerMediaControls = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [seek, setSeek] = useState<number>(0);
    const progress = useProgress();

    useTrackPlayerEvents([Event.PlaybackState, Event.PlaybackError], async (event) => {
      if (event.type === Event.PlaybackState) {
        setIsPlaying(event.state === State.Playing);
      }
    });

    const slidingStarted = () => {
      setIsSeeking(true);
    };
    const slidingCompleted = async (value: number) => {
      await TrackPlayer.seekTo(value);
      setIsSeeking(false);
    };

    const togglePlayPause = () => {
      if (isPlaying) {
        TrackPlayer.pause();
      } else {
        TrackPlayer.play();
      }
    };
    const skipToNext = () => TrackPlayer.skipToNext();
    const skipToPrevious = () => TrackPlayer.skipToPrevious();
    const toggleRepeat = async () => {
      const newRepeatMode = isRepeating ? RepeatMode.Off : RepeatMode.Track;
      await TrackPlayer.setRepeatMode(newRepeatMode);
      setIsRepeating(!isRepeating);
    };
  
    return (
      <View className="flex w-full px-8">
        <Slider
          trackStyle={{width: '100%', height: 2}}
          thumbStyle={{width: 10, height: 10}}
          minimumValue={0}
          maximumValue={progress.duration}
          value={isSeeking ? seek : progress.position}
          minimumTrackTintColor="#ff5454"
          maximumTrackTintColor="#444"
          thumbTintColor="#ff5454"
          onSlidingStart={slidingStarted}
          onSlidingComplete={(value) => slidingCompleted(value[0])}
          onValueChange={(value) => setSeek(value[0])}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
          <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
        </View>
        <View className="flex flex-row w-full justify-between items-center">
        <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <Ionicons name={favorite ? "heart-sharp" : "heart-outline"} size={32} color={!favorite ? "white" : "#ff5454"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name="play-skip-back" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={48} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons name="play-skip-forward" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleRepeat}>
            <Ionicons name="repeat" size={24} color={isRepeating ? "#ff5454" : "white"} />
          </TouchableOpacity>
        </View>
      </View>
    )
  };
  
  const styles = StyleSheet.create({
    progress: {
      height: '100%',
      backgroundColor: '#ff5454',
    },
    progressBar: {
      width: '100%',
      height: 40,
      marginBottom: 10,
    },
    timeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    timeText: {
      color: 'white',
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });
  
  export default PlayerMediaControls;