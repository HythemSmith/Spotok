import * as React from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import styles from '../styles';
import { Stack, useLocalSearchParams } from "expo-router"


const ShortScreen = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
            headerTitle: 'Short'
            }}/>
            <Text>Short!</Text>
        </View>
    );
}

export default ShortScreen;