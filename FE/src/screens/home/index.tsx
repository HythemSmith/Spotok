import React, { useState } from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, Pressable} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view'
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "./styles.tsx";
import { useNavigation } from "@react-navigation/native";
import {categories, playlists, artists, songs} from "../../components.tsx"

const HomeScreen = () => {
    const [categoryId, setCategoryId] = useState('1');
    const [playlistId, setPlaylistId] = useState('1');
    const [topArtists, setTopArtists] = useState('1');
    const navigation = useNavigation();
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
                    <Image style={styles.avatar}
                    source={{uri:'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-facebook-mac-dinh-52.jpg'}}/>
                    <View style={styles.row}>
                        <Text style={styles.greetings}>{message}</Text>
                        <View style={styles.row}>
                            <Image style={styles.icon}
                            source={require('../../assets/elements/bell.png')}/>
                            <Image style={styles.icon}
                            source={require('../../assets/elements/config.png')}/>
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
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    key={({item}) => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate(item.next)
                            setCategoryId(item.id);
                        }}>
                            <View style={[styles.category, {
                                backgroundColor: 'black'
                            }]}>
                                <Text style={[styles.subtitle
                                ]}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Text style={styles.title}>
                Playlists
            </Text>
            <FlatList
                data={playlists}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                key={({item}) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => {
                        setPlaylistId(item.id);
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
            <Text
                style={styles.title}
                >
                Your Top Artists
            </Text>
            <FlatList
                data={artists}
                horizontal
                showsHorizontalScrollIndicator={false}
                key={({item}) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => {
                        setTopArtists(item.id);
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