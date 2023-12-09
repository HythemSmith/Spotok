import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Stack, useLocalSearchParams } from "expo-router"
import styles from "../styles";

  const Songscreen = () => {
    const circleSize = 12;
    const {name, image, artist} = useLocalSearchParams();
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
            <Pressable 
            //onPress={playPreviousTrack}
            >
              <Ionicons name="play-skip-back" size={30} color="white" />
            </Pressable>
            <Pressable 
            //onPress={handlePlayPause
            >
              {true ? (
                <Ionicons name="pause-circle" size={60} color="white" />
              ) : (
                <Pressable
                  //onPress={handlePlayPause}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="play-circle" size={26} color="black" />
                </Pressable>
              )}
            </Pressable>
            <Pressable 
            //onPress={playNextTrack}
            >
              <Ionicons name="play-skip-forward" size={30} color="white" />
            </Pressable>
            <Pressable>
              <Ionicons name="repeat" size={30} color="#03C03C" />
            </Pressable>
          </View>
        </View>
      </View>
      );
    };
    
    export default Songscreen;