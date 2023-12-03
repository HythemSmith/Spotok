import * as React from 'react';
import {Text, View, Image, ScrollView, TextInput, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/home/index.tsx'
import SearchScreen from './src/screens/search/index.tsx'
import PlaylistsScreen from './src/screens/playlists/index.tsx'
import SonglistScreen from './src/screens/songlist/index.tsx'

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                activeColor='white'
                inactiveColor='gray'
                barStyle={styles.tabRow}>
                <Tab.Screen name='Home'
                            component={HomeScreen}
                            options={{
                                    tabBarIcon: () => (
                                    <Ionicons name="home" color='gray' size={25} />),
                                    }}/>
                <Tab.Screen name='Search'
                            component={SearchScreen}
                            options={{
                                    tabBarIcon: () => (
                                    <Ionicons name="search" color='gray' size={25} />),
                                    }}/>
                <Tab.Screen name='Playlist'
                            component={PlaylistsScreen}
                            options={{
                                    tabBarIcon: () => (
                                    <Ionicons name="library" color='gray' size={25} />),
                                    }}/>
                <Tab.Screen name='Songlist'
                            component={SonglistScreen}
                            options={{
                                    tabBarIcon: () => (
                                    <Ionicons name="musical-notes" color='gray' size={25} />),
                                    }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'dimgray'
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
})

export default App;
