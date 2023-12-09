import { StyleSheet, Text, View, Pressable, Image } from "react-native"
import React ,{useContext} from  "react"
import { Ionicons } from "@expo/vector-icons"
import { Stack, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";

const Song = ({ name, image, artist}: { name: string; image: string; artist:string }) => {
  return (
    <SafeAreaView
    style={{flex:1, flexDirection: "row", alignItems: "center", height: 100 }}
    >
      <Image
      style={{ width: 50, height: 50, marginRight: 10 }}
      source={{uri:image as string}}
      />
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
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
        }}>
          <Ionicons name="heart" size={24} color="#1DB954"/>
          <Ionicons name="ellipsis-vertical" size={24} color="#C0C0C0" />
      </View>
    </SafeAreaView>
  );
};

export default Song;