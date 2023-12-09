import React, {useState} from 'react'
import {Ionicons} from '@expo/vector-icons'
import {Text, View, TextInput, Image, TouchableOpacity, FlatList, ScrollView, Pressable, ActivityIndicator,} from 'react-native'
import styles from '../styles'
import { Link } from 'expo-router'
import {categories, playlists, artists, songs} from "../../components/components"
import Song from '../../components/song'

const PlaylistsScreen = () => {
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
                height: 38,
              }}
            >
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
              <Ionicons name="arrow-down" size={20} color="white" />
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
                <Ionicons name="caret-forward" size={24} color="white" />
              </Pressable>
            </View>
        </Pressable>
        <FlatList
                    data={songs}
                    renderItem={({item}) => (
                      <Link href={{
                        pathname: "/user/Songscreen",
                        params: {
                          name: item.title,
                          image: item.image,
                          artist: item.artist
                        }
                      }} asChild>
                        <Pressable>
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
