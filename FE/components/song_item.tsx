import { StyleSheet, Text, View, Pressable, Image } from "react-native"
import React from  "react"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context";

const Song = ({ name, image, artist}: { name: string; image: string; artist:string }) => {
  return (
    <SafeAreaView
    style={{flexWrap: "wrap", flexDirection: "row", height: 50 }}
    >
      <Image
      style={{ width: 50, height: 50, marginRight: 10 }}
      source={{uri:image as string}}
      />
      <View style={{marginTop: 5, flex: 1, flexDirection: "column" }}>
        <Text
          style={{
                fontWeight: "bold",
                fontSize: 14,
                color: "#3FFF00",
              }}>
          {name}
        </Text>
        <Text style={{ marginTop: 4, color: "#989898" }}>
          {artist}
        </Text>
      </View>
      <View
        style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        marginHorizontal: 10,
        height: 50
        }}>
          <Ionicons name="heart" size={24} color="#1DB954"/>
          <Ionicons name="ellipsis-vertical" size={24} color="#C0C0C0" />
      </View>
    </SafeAreaView>
  );
};

export default Song;