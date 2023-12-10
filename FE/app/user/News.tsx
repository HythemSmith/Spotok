import * as React from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import styles from '../styles';
import { Stack, useLocalSearchParams } from "expo-router"

const NewsScreen = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitle: 'News'
            }}/>
            <Text>News!</Text>
        </View>
    );
}

export default NewsScreen;