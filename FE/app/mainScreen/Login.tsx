import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import { Link, useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Redirect } from "expo-router"

import axios from 'axios';

export default function LoginScreen () {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        const url = 'https://spotok.onrender.com/login'
        axios.post(url, { email, password })
        .then((respone) => {
            const result = respone.data
            if (result.status == "SUCCESS") {
                return true
            }
        })
        .catch((e) => {
            console.log(e)
        })
    }
    return (
        <View style = {{backgroundColor: 'dimgray', flex: 1}}>
            <View style = {{
                    flexDirection: "row",
                    alignSelf : "center",
                    marginTop: 30,}}
            >
                <Image
                    source={require('../../assets/images/logo75.png')}
                />
            </View>

            <View>
                <Text style = {{
                        color: "white",
                        fontSize: 42,
                        fontWeight: "bold",
                        marginHorizontal: 5,
                }}> LOGIN </Text>
                <Text style = {{
                    color: "#D3D3D3",
                    fontSize: 15,
                    marginHorizontal: 12,
                }}
                > Please sign in to continue </Text>
            </View>

            <View>
                <Text style={{
                        color: "#C0C0C0",
                        marginHorizontal: 30,
                        marginTop: 25,
                        fontSize: 20,
                        fontStyle: "italic",}}>EMAIL: </Text>
                <TextInput style = {{ 
                            backgroundColor: "white",
                            marginTop: 10,
                            height: 50,
                            padding: 15,
                            borderRadius: 20,
                            margin: 20,
                            marginBottom: 0,

                }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                
                <Text style={{
                        color: "#C0C0C0",
                        marginHorizontal: 30,
                        marginTop: 10,
                        fontSize: 20,
                        fontStyle: "italic",}}>PASSWORD: </Text>
                <TextInput 
                        secureTextEntry
                        style = {{ 
                            backgroundColor: "white",
                            marginTop: 10,
                            height: 50,
                            padding: 15,
                            borderRadius: 20,
                            margin: 20,
                }}
                    onChangeText={(text) => setPassword(text)}
                    value = {password}
                />
            </View>

            <View>
                <TouchableOpacity         
                    onPress={ () => {
                        handleLogin()
                        navigation.navigate('index')
                    }}
                    style = {{
                        backgroundColor: "#676489",
                        marginTop: 20,
                        marginBottom: 0,
                        margin: 50,
                        borderRadius: 30,
                        height: 55
                    }}>
                    <Text style = {{
                        alignSelf: "center",
                        color: "white",
                        fontSize: 40,
                        fontWeight: "bold",
                    }}> LOGIN </Text>
                </TouchableOpacity>

                <Text style = {{
                    alignSelf: 'center',
                    color: "#C0C0C0",
                    fontSize: 20,
                    marginTop: 45,
                }}>
                    Don't have a account?
                </Text>
                    
                <View style = {{alignSelf: 'center', flexDirection: "row"}}>
                    <Text style={{
                            color: "#C0C0C0", 
                            fontSize: 20,
                            }}> Please </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{
                            color: "white", 
                            fontSize: 20, 
                            fontWeight: "bold", 
                            }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}