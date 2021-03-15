import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { signInUser } from '../services/account';

function SignIn({navigation}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function signInButton(username, password){
        var success = signInUser(username, password);
        console.log('moving to home', success);
        if(success){
                navigation.navigate("Home Screen")
        }
    } 

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Username</Text>
            <TextInput  placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput  secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="Sign In" onPress={() => signInButton(username, password)}></Button>
        </View>
    );
};

export default SignIn