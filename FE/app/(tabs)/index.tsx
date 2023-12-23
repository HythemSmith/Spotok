import React, { useState, useEffect } from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, Pressable} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-virtualized-view';
import { Platform, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {categories, playlists, fetchDataFromBackend, songs, artists} from "../../components/components"
import { Link } from 'expo-router'
import styles from '../styles'
import axios from 'axios';
//import { fetchDataFromBackend, songs, artists } from '../../components/testing';

const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [playlist, setPlaylist] = useState(null);
    useEffect(() => {
        fetchData();
        fetchPlaylist();
    }, []);
    // Fetch for your artist and songs
    const fetchData = async () => {
        try {
            const fetchedData = await fetchDataFromBackend();
            if (fetchedData) {
                // Process the fetched data
                setIsLoading(false); // Set loading state to false when data is fetched
                // artists.forEach((item) => {
                //     console.log(item)
                // })
                // songs.forEach((item) => {
                //     console.log(item)
                // })
            } else {
                console.error('Data fetching failed or returned null.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false); // Set loading state to false on error
        }
    };
    // Fetch for playlist
    const fetchPlaylist = async () => {
        try {
            const response = await axios.get('https://spotok.onrender.com/playlist');
            const responseData = response.data;
            setPlaylist(responseData)
        } catch (error) {
            console.log(error)
        }
    }

    // Rest of your component
    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
    const greetingMessage = () => {
        const currentTime = new Date().getHours();
        if (currentTime < 12) {
            return "Good Morning";
        } else if (currentTime < 16) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };
    // trước cai này hả 
    const message = greetingMessage();
    return (
        <ScrollView style={{backgroundColor : 'dimgray'}}>
            <View style={styles.topContainer}>
                <View style={styles.topDetails}>
                    <Image
                    style={styles.avatar}
                    source={{uri:'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-facebook-mac-dinh-52.jpg'}}/>
                    <View style={styles.row}>
                        <Text style={styles.greetings}>{message}</Text>
                        <View style={styles.row}>
                            <Image style={styles.icon}
                            source={require('../../assets/images/bell.png')}/>
                            <Image style={styles.icon}
                            source={require('../../assets/images/config.png')}/>
                        </View>
                    </View>
                </View>
            </View>
            <Text style={styles.title}>
                Categories
            </Text>
            <View style={styles.categoriesTab}>
                <FlatList
                    data={categories}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <Link href={{
                            pathname: item.next,
                            params: {
                                id: item.title,
                                image: item.image,
                                mode: 'playlists',
                            }
                            }} asChild>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={[styles.category, {
                                backgroundColor: 'black'
                            }]}>
                                <Text style={[styles.subtitle]}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        </Link>
                    )}
                />
            </View>
            <Text style={styles.title}>
                Playlists
            </Text>
            <FlatList
                data={playlist}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({item}) => (
                    <Link href={{
                        pathname: "/user/Songlist",
                        params: {
                            id: item._id,
                            title: item.title,
                            image: item.coverURL,
                            mode: 'playlists',
                        }
                        }} asChild>
                        <TouchableOpacity onPress={() => {}}>
                            <SafeAreaView
                            style={styles.playlist}>
                                <Image
                                    style={{ height: 55, width: 55 }}
                                    source={{ uri: item.coverURL }}
                                />
                                <View
                                    style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
                                >
                                    <Text
                                        numberOfLines={1}
                                        style={{ fontSize: 19, fontWeight: "bold", color: "white" }}
                                    >
                                        {item.title}
                                    </Text>
                                </View>
                            </SafeAreaView>
                        </TouchableOpacity>
                    </Link>
                )}
            />
            <Text style={styles.title}>
                Your Top Artists
            </Text>
            <FlatList
                data={artists}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <Link href={{
                        pathname: "/user/Songlist",
                        params: {
                            id: item._id,
                            title: item.title,
                            image: item.image,
                            mode: 'artists'
                        }
                        }} asChild>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={{ margin: 10 }}>
                                <Image
                                    style={{ width: 130, height: 130, borderRadius: 5 }}
                                    source={{ uri: item.image }}
                                />
                                <View style={{ width: 130 }}>
                                    <Text
                                        style={styles.subtitle}
                                        numberOfLines={1} // Limit the number of lines for the text
                                    >
                                        {item.title}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </ScrollView>
  );
};
export default HomeScreen;