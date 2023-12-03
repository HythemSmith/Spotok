import * as React from 'react';
import {Text, View, Image, SafeAreaView, TouchableOpacity, FlatList, ScrollView} from 'react-native';

const SearchScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Search!</Text>
        </View>
    );
}

export default SearchScreen;

import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'dimgray'
    },
})