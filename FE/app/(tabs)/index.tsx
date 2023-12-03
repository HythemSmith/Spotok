import React, { useState } from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, Pressable, ScrollView} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {categories, playlists, artists, songs} from "../../components/components"

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
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
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
            <Text style={styles.title}>
                Your Top Artists
            </Text>
            <FlatList
                data={artists}
                horizontal
                showsHorizontalScrollIndicator={false}
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

const styles = StyleSheet.create({
  container : {
      flex : 1,
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : 'dimgray'
  },
  topContainer: {
      flex: 1,
      padding: 20,
      alignItems : "baseline",
      justifyContent : "space-around",
    marginTop: 50,
  },
  topDetails: {
      flexDirection: 'row',
      alignItems : 'center',
  },
  avatar: {
      width:60,
      height: 60,
      borderRadius: 50,
      marginRight: 10,
      borderColor: 'black',
      borderWidth: 2,
  },
  tabRow: {
      backgroundColor: 'black',
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      position: 'absolute',
      overflow: 'hidden',
      alignItems : 'center',
      justifyContent : 'space-around',
  },
  row: {
      flexDirection: 'row',
      alignItems : 'center',
  },
  greetings: {
      color: 'white',
      fontSize: 25,
    marginRight: 30,
  },
  icon: {
      width: 45,
      height: 45,
      backgroundColor: 'transparent',
      borderRadius: 50,
      marginLeft: 10,
  },
  categoriesTab: {
      paddingTop: 10,
      paddingLeft: 20,
      marginBottom: 10,
  },
  category: {
      borderRadius: 50,
      minWidth: 50,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginRight: 10,
      alignItems: 'center',
  },
  subtitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: "500",
  },
  title: {
      color: "white",
      fontSize: 19,
      fontWeight: "bold",
      marginHorizontal: 10,
      marginTop: 10,
  },
  playlist: {
      height: 55,
      width: 175,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginVertical: 8,
      backgroundColor: "#282828",
      borderRadius: 4,
      elevation: 3,
  },
})
