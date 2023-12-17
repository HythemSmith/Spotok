import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import { Stack, useLocalSearchParams, Link } from "expo-router"
import styles from "../styles";
import { Audio } from 'expo-av';
import { songs } from "../../components/components";


  const Songscreen = () => {
    const circleSize = 12;
    const {name, image, artist} = useLocalSearchParams();
    var song_name = name;
    var is_playing = false;
    function get_song_path(song_name:string) {
      switch (song_name) {
        case 'Đưa nhau đi trốn': return require('./../../assets/songs/DNDT.mp3');
        case 'Nấu ăn cho em': return require('./../../assets/songs/NACE.mp3');
        case 'Ai muốn nghe không': return require('./../../assets/songs/AMNK.mp3');
        case 'Tháng tư là lời nói dối của em': return require('./../../assets/songs/TTLLNDCE.mp3');
        case 'Thành phố sương': return require('./../../assets/songs/TPS.mp3');
        case 'Chỉ Còn Những Mùa Nhớ': return require('./../../assets/songs/CCNMN.mp3');
        case 'Riêng một góc trời': return require('./../../assets/songs/RMGT.mp3');
        case 'Khúc thụy du': return require('./../../assets/songs/KTD.mp3');
        case 'Như đã dấu yêu': return require('./../../assets/songs/NDDY.mp3');
        case 'Requiem': return require('./../../assets/songs/R.mp3');
        case 'Eine kleine Nachtmusik': return require('./../../assets/songs/EKN.mp3');
        case 'Le nozze di Figaro': return require('./../../assets/songs/LNDF.mp3');
        case 'Tập thể dục': return require('./../../assets/songs/TTD.mp3');
        case 'Mẹ chẳng có gì': return require('./../../assets/songs/MCCG.mp3');
        case 'Bên trái': return require('./../../assets/songs/BT.mp3');
        case 'Nghe em': return require('./../../assets/songs/NE.mp3');
        case 'Chuyện rằng': return require('./../../assets/songs/CR.mp3');
        case 'Thay đổi': return require('./../../assets/songs/TD.mp3');
      }
    }

  const [sound, setSound] = useState();
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(get_song_path(song_name as string));
    setSound(sound);
    console.log('Playing Sound');
    is_playing = true;
    await sound.playAsync();
  }

  if(sound == null)
    playSound();

  const handlePlayPause = async () => {
    if (sound) {
      if (is_playing) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      is_playing = !is_playing;
    }
  };

  const playNextTrack = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
    const nextTrack = getNextTrack();
    song_name = nextTrack.title;
    console.log(song_name);
    await playSound();
  };

  const getNextTrack =() =>{
    var tmp = 0;
    for(let i = 0; i < songs.length; i++){
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
    const prevTrack = getPrevTrack();
    song_name = prevTrack.title;
    console.log(song_name);
    await playSound();
  };

  const getPrevTrack =() =>{
    var tmp = 0;
    for(let i = 0; i < songs.length; i++){
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
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);



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
              name: getPrevTrack().title,
              image: getPrevTrack().image,
              artist: getPrevTrack().artist,
            }}} asChild>
            <Pressable onPress={playPrevTrack}>
                <Ionicons name="play-skip-back" size={30} color="white" />
              </Pressable>
            </Link>
            <Pressable onPress={handlePlayPause}>
              {is_playing ? (
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
            name: getNextTrack().title,
            image: getNextTrack().image,
            artist: getNextTrack().artist,
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