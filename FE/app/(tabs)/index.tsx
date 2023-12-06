import React, { useState } from 'react';
import {Text, View, Image, TouchableOpacity, FlatList, Pressable, } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view'
import {Ionicons} from '@expo/vector-icons';
import {categories, playlists, artists, songs} from "../../components/components"
import { Link } from 'expo-router';
import styles from '../styles';

const HomeScreen = () => {
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
                <Link href={{
                    pathname: "/(tabs)/Playlist",
                    }} asChild>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={[styles.category, {
                            backgroundColor: 'black'
                        }]}>
                            <Text style={[styles.subtitle
                            ]}>Music</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
                <Link href={{
                    pathname: "/user/Podcast",
                    }} asChild>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={[styles.category, {
                            backgroundColor: 'black'
                        }]}>
                            <Text style={[styles.subtitle
                            ]}>Podcast</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
                <Link href={{
                    pathname: "/user/Short",
                    }} asChild>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={[styles.category, {
                            backgroundColor: 'black'
                        }]}>
                            <Text style={[styles.subtitle
                            ]}>Short</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
                <Link href={{
                    pathname: "/user/Songlist",
                    params: {
                        id: 'Trending',
                        image: "https://i.iheart.com/v3/url/aHR0cHM6Ly9kM3dvNXdvanZ1djdsLmNsb3VkZnJvbnQubmV0L3RfcnNzX2l0dW5lc19zcXVhcmVfMTQwMC9pbWFnZXMuc3ByZWFrZXIuY29tL29yaWdpbmFsL2Q2N2FjM2NjOWIyNjRlYmMzYzg3NDY5OTEwMDc3Yjc5LmpwZw",
                    }
                    }} asChild>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={[styles.category, {
                            backgroundColor: 'black'
                        }]}>
                            <Text style={[styles.subtitle
                            ]}>Trending</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
            </View>
            <Text style={styles.title}>
                Playlists
            </Text>
            <FlatList
                data={playlists}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => {
                    }}>
                        <Pressable
                        style={styles.playlist}>
                            <Image
                                style={{ height: 55, width: 55 }}
                                source={ item.image }
                            />
                            <View
                                style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
                            >
                                <Text
                                    numberOfLines={2}
                                    style={{ fontSize: 19, fontWeight: "bold", color: "white" }}
                                >
                                    {item.title}
                                </Text>
                            </View>
                        </Pressable>
                    </TouchableOpacity>
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
                    <TouchableOpacity onPress={() => {
                    }}>
                        <View style={{ margin: 10 }}>
                            <Image
                                style={{ width: 130, height: 130, borderRadius: 5 }}
                                source={ item.image }
                            />
                            <Text
                                style={styles.subtitle}
                            >
                                {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ScrollView>
  );
};
export default HomeScreen;