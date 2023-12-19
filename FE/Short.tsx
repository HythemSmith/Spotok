import * as React from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, ScrollView, Dimensions} from 'react-native';
import styles from '../styles';
import { Stack, useLocalSearchParams } from "expo-router"
import { Video } from 'expo-av';
import { useEffect, useState, useRef } from "react"
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const InteractionButtons = ({ isPlaying, onPlay }: { isPlaying: boolean, onPlay: () => void })  => {
    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <TouchableOpacity onPress={onPlay}>
          <AntDesign name={isPlaying ? "pausecircleo" : "playcircleo"} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Commented!')}>
          <FontAwesome name="commenting-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Shared!')}>
          <Entypo name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  
  // Video Item
  const VideoItem = ({ videoUrl, isPlaying, onPlay }: { videoUrl: string, isPlaying: boolean, onPlay: () => void }) => {
    return (
      <View style={{ height, width: '100%' }}>
        <Video
          source={{ uri: videoUrl }}
          shouldPlay={isPlaying}
          //resizeMode="cover"
          style={{ flex: 1 }}
        />
        <InteractionButtons isPlaying={isPlaying} onPlay={onPlay} />
      </View>
    );
  };
  
  // Video Feeds Screen
  const ShortScreen = () => {
    const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  
    const handlePlay = (index:number) => {
      setPlayingVideoIndex(index);
    };
  
    const videoUrls = ['C:\Users\trung\Downloads\pexels-rodnae-productions-7362669 (1080p).mp4', 'C:\Users\trung\Downloads\pexels-ana-benet-8243250 (720p).mp4', 'C:\Users\trung\Downloads\pexels-ana-benet-8243253 (Original).mp4']; // Replace with your array of video URLs

    const handleScroll = (event: any) => {
      const index = Math.round(event.nativeEvent.contentOffset.y / height);
      setPlayingVideoIndex(index);
    };

    return (
      <FlatList
        data={videoUrls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <VideoItem
            videoUrl={item}
            isPlaying={index === playingVideoIndex}
            onPlay={() => handlePlay(index)}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
      />
    );
  };
  

export default ShortScreen;
