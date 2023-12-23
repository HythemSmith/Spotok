import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import { ScrollView } from 'react-native-virtualized-view'
import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Link, Stack, useLocalSearchParams } from "expo-router"
import { songs } from "../../components/components";
import Song from "../../components/song_item";
import { debounce } from "lodash";
import axios from "axios"

const SongInfoScreen = () => {
    const { id, title, image, mode } = useLocalSearchParams();
    const [searchedTracks, setSearchedTracks] = useState([]);
    const [songInPlaylist, setSongInPlaylist] = useState([]);

    const fetchSongsInPlaylist = async () => {
        const playlistId = id
        const response = await axios.get(`https://spotok.onrender.com/playlist/${playlistId}`)
        const responseData = response.data.media
        responseData.forEach(element => {
            console.log(element)
        });
        setSearchedTracks(responseData)
    }

    useEffect(() => {
        const debouncedSearch = debounce(handleSearch, 800);

        function handleSearch(text: string) {
            if (mode === 'playlists') {
                fetchSongsInPlaylist()
                searchedTracks.forEach(element => {
                    console.log(element)
                });
            } else if (mode === 'artists') {
                const filteredTracks = songs.filter((item) =>
                    item.creator.includes(text)  
                );
                filteredTracks.forEach((item) => {
                    console.log(item)
                })
                setSearchedTracks(filteredTracks);
            }
        }
        console.log(searchedTracks)
        if (!searchedTracks.length) {
            debouncedSearch(title as string);
        }
    }, [id, title, mode]);
    return (
        <ScrollView style={{ marginTop: 50 }}>
            <Stack.Screen options={{
            headerTitle: 'Songlist'
        }}/>
        <View style={{ flexDirection: "row", padding: 12 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                style={{ width: 200, height: 200 }}
                source={{uri: image as string}}
                />
            </View>
        </View>
        <Text
            style={{
            color: "white",
            marginHorizontal: 12,
            marginTop: 10,
            fontSize: 22,
            fontWeight: "bold",
            }}
        >
            {title}
        </Text>
        <View
            style={{
            marginHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 10,
            gap: 7,
            }}
        >
        </View>
        <Pressable
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 10,
            }}
            >
            <Pressable
                style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#1DB954",
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <Ionicons name="arrow-down" marginLeft={2} size={20} color="white" />
            </Pressable>

            <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
                <Pressable
            
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1DB954",
                }}
                >
                <Ionicons name="caret-forward" marginLeft={3} size={30} color="white" />
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
                        artist: item.creator,
                        storageURL: item.storageURL
                    }}} asChild>
                    <Pressable>
                        <Song
                        name = {item.title}
                        image = {item.image}
                        artist = {item.creator}/>
                    </Pressable>
                    </Link>
                )}/>
        </ScrollView>
      );
    };
    
    export default SongInfoScreen;