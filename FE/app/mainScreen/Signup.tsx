import React, { useState } from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';


export default function SignupScreen () {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dateOfBirth = "01/01/2000"
    const handleSignup = () => {
        const url = 'https://spotok.onrender.com/signup'
        axios.post(url, { name, email, password, dateOfBirth})
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
                    marginTop: 30,
            }}>
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
                }}> Create Account </Text>
                <Text style = {{
                    color: "#D3D3D3",
                    fontSize: 15,
                    marginHorizontal: 12,
                }}
                > Please fill in the input below here </Text>
            </View>

            <View>
                <Text style={{
                        color: "#C0C0C0",
                        marginHorizontal: 30,
                        marginTop: 25,
                        fontSize: 20,
                        fontStyle: "italic",}}>USERNAME: </Text>
                <TextInput style = {{ 
                            backgroundColor: "white",
                            marginTop: 10,
                            height: 50,
                            padding: 15,
                            borderRadius: 20,
                            margin: 20,
                            marginBottom: 0,

                }}
                    onChangeText={(text) => setName(text)}
                    value={name}
                />
                <Text style={{
                        color: "#C0C0C0",
                        marginHorizontal: 30,
                        marginTop: 10,
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
                    onPress={() => {
                        handleSignup()
                        navigation.navigate('Login')
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
                    }}> SIGN UP </Text>
                </TouchableOpacity>

                <View>
                    <Text style = {{
                        alignSelf: 'center',
                        color: "#C0C0C0",
                        fontSize: 20,
                        marginTop: 15,
                    }}>
                        Already have an account?
                    </Text>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{
                            color: "white", 
                            fontSize: 20, 
                            fontWeight: "bold", 
                            alignSelf: 'center'}}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}