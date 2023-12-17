import React, {useState, useEffect} from 'react'
import {Ionicons} from '@expo/vector-icons'
import {Text, View, TextInput, Image, TouchableOpacity, FlatList, Pressable, ActivityIndicator,} from 'react-native'
import { ScrollView } from 'react-native-virtualized-view'
import { Link } from 'expo-router'
import {categories, playlists, artists, songs} from "../../components/components"
import Song from '../../components/song'
import { debounce } from "lodash";
import { Audio } from 'expo-av';

const PlaylistsScreen = () => {
  var song_name = "";
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
  const [searchedTracks, setSearchedTracks] = useState(songs);
  const [input, setInput] = useState("");
  const debouncedSearch = debounce(handleSearch, 800);
  function handleSearch(text:string) {
    const filteredTracks = songs.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()));
    setSearchedTracks(filteredTracks);
  }
  const handleInputChange = (text:string) => {
    setInput(text);
    debouncedSearch(text);
  };

  const [sound, setSound] = useState();
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(get_song_path(song_name)
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
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
    <ScrollView style={{ flex: 1, marginTop: 50 }}>
      <Link href={{
        pathname: "/(tabs)/",
        }} asChild>
        <Pressable>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      </Link>
      <Pressable
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 9,
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#42275a",
            padding: 9,
            flex: 1,
            borderRadius: 3,
            height: 38,
          }}
        >
          <Ionicons name="search" size={20} color="white" />
          <TextInput
              value={input}
              onChangeText={(text) => handleInputChange(text)}
              placeholder="Find in playlist"
              placeholderTextColor={"white"}
              style={{ fontWeight: "500",color:"white" }}
          />
        </Pressable>
        <Pressable
          style={{
            marginHorizontal: 10,
            backgroundColor: "#42275a",
            padding: 10,
            borderRadius: 3,
            height: 38}}>
          <Text style={{ color: "white" }}>Sort</Text>
        </Pressable>
      </Pressable>

      <View style={{ height: 50 }} />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          Playlist
        </Text>
        <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
          20 songs
        </Text>
      </View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 10}}>
      <Pressable
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: "#1DB954",
          justifyContent: "center",
          alignItems: "center"}}>
        <Ionicons name="arrow-down" size={20} color="white" />
      </Pressable>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Pressable
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1DB954",
          }}>
          <Ionicons name="caret-forward" size={24} color="white" />
        </Pressable>
      </View>
    </Pressable>
    <FlatList
      data={searchedTracks}
      renderItem={({item}) => (
        <Link href={{
          pathname: "/user/Songscreen",
          params: {
            name: item.title,
            image: item.image,
            artist: item.artist
          }}} asChild>
          <Pressable onPress={() => {
            song_name = item.title;
            sound.unloadAsync();
            playSound();}}>
            <Song
              name = {item.title}
              image = {item.image}
              artist = {item.artist}/>
          </Pressable>
        </Link>
      )}
    />
    </ScrollView>
  );
}

export default PlaylistsScreen;
