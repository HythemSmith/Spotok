import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import { Stack, useLocalSearchParams, Link } from "expo-router"
import styles from "../styles";
import { Audio } from 'expo-av';
import { songs } from "../../components/components";
import { useFocusEffect } from '@react-navigation/native';


const Songscreen = () => {
  const circleSize = 12;
  const {name, image, artist, storageURL} = useLocalSearchParams();
  const [isPlaying, setPlaying] = useState(false)
  const [sound, setSound] = useState();
  const [prevTrack, setPrevTrack] = useState(null);
  const [nextTrack, setNextTrack] = useState(null);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: storageURL});
    setSound(sound);
    console.log('Playing Sound');
    setPlaying(true)
    await sound.playAsync();
  }

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying){
        await sound.pauseAsync()
        setPlaying(false)
      } else {
        await sound.playAsync()
        setPlaying(true)
      }
    }
  };

  const playNextTrack = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  };

  const getNextTrack =() =>{
    var tmp = 0;
    for(let i = 0; i < songs.length; i++){
      console.log(-i)
      if (songs[i].title === name){
        tmp = i + 1;
        if (tmp >= songs.length)
          tmp = tmp - songs.length;
      break;
      }
    }
    return songs[tmp];
  }

  const playPrevTrack = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  };

  const getPrevTrack =() =>{
    var tmp = 0;
    for(let i = 0; i < songs.length; i++){
      console.log(i)
      if (songs[i].title === name){
        tmp = i - 1;
        if (tmp < 0)
          tmp = songs.length - 1;
      break;
      }
    }
    return songs[tmp];
  }

  useEffect(() => {
    console.log(name, image, artist, storageURL)
    const prev = getPrevTrack();
    const next = getNextTrack();
    setPrevTrack(prev);
    setNextTrack(next);
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [name, image, artist, storageURL]);

  if(sound == null) { playSound() }

    return (
        <View style={{ height: "100%", width: "100%", marginTop: 40 }}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 10
          }}
        >
          <Ionicons
            name="arrow-down"
            size={24}
            color="white"
          />

          <Text
            style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
          >
            {name}
          </Text>

          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </Pressable>

        <View style={{ height: 70 }} />

        <View style={{ padding: 10 }}>
          <Image
            style={{ width: "100%", height: 330, borderRadius: 4 }}
            source={{uri:image as string}}
          />
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                {name}
              </Text>
              <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                {artist}
              </Text>
            </View>

            <Ionicons name="heart" size={24} color="#1DB954" />
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                width: "100%",
                marginTop: 10,
                height: 3,
                backgroundColor: "gray",
                borderRadius: 5,
              }}
            >
              <View
                style={[
                  styles.progressbar,
                ]}
              />
              <View
                style={[
                  {
                    position: "absolute",
                    top: -5,
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize / 2,
                    backgroundColor: "white",
                  },
                  {
                    marginLeft: -circleSize / 2,
                  },
                ]}
              />
            </View>
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 15}}
              >
                {/* {formatTime(currentTime)} */}
              </Text>

              <Text
                style={{ color: "white", fontSize: 15}}
              >
                {/* {formatTime(totalDuration)} */}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 17,
            }}
          >
          <Link href={{
            pathname: "/user/Songscreen",
            params: {
              name: prevTrack?.title,
              image: prevTrack?.image,
              artist: prevTrack?.creator,
              storageURL: prevTrack?.storageURL
            }}} asChild>
            <Pressable onPress={playPrevTrack}>
                <Ionicons name="play-skip-back" size={30} color="white" />
              </Pressable>
            </Link>
            <Pressable onPress={handlePlayPause}>
              {isPlaying ? (
                <AntDesign name="pausecircle" size={60} color="white" />
              ) : (
                <Pressable
                  onPress={handlePlayPause}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <Entypo name="controller-play" size={26} color="black" />
                  </Pressable>
                )}
              </Pressable>
              <Link href={{
          pathname: "/user/Songscreen",
          params: {
            name: nextTrack?.title,
            image: nextTrack?.image,
            artist: nextTrack?.creator,
            storageURL: nextTrack?.storageURL
          }}} asChild>
            <Pressable 
              onPress={playNextTrack}>
              <Ionicons name="play-skip-forward" size={30} color="white" />
            </Pressable>
            </Link>
            <Pressable>
              <Ionicons name="repeat" size={30} color="#03C03C" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
    
export default Songscreen;