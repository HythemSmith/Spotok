import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native"
import { ScrollView } from 'react-native-virtualized-view'
import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Link, Stack, useLocalSearchParams } from "expo-router"
import { songs } from "../../components/components";
import Song from "../../components/song_item";
import { debounce } from "lodash";

const SongInfoScreen = () => {
    const { id, image, mode } = useLocalSearchParams();
    const [searchedTracks, setSearchedTracks] = useState([]);

    useEffect(() => {
        const debouncedSearch = debounce(handleSearch, 800);

        function handleSearch(text: string) {
            if (mode === 'playlists') {
                const filteredTracks = songs.filter((item) =>
                    item.playlist.toLowerCase().includes(text.toLowerCase())
                );
                setSearchedTracks(filteredTracks);
            } else if (mode === 'artists') {
                const filteredTracks = songs.filter((item) =>
                    item.creator.includes(text)
                );
                setSearchedTracks(filteredTracks);
            }
        }

        if (!searchedTracks.length) {
            debouncedSearch(id as string);
        }
    }, [id, mode, searchedTracks]);
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
            {id}
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
                        artist: item.title
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