import * as React from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import styles from '../styles';
import { Stack, useLocalSearchParams } from "expo-router"


const PodcastScreen = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
            headerTitle: 'Podcast'
            }}/>
            <Text>Podcast!</Text>
        </View>
    );
}

export default PodcastScreen;