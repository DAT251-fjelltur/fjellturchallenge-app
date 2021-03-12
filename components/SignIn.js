import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

function SignIn({navigation}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function signInUser() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://fjellturchallenge-backend-dev.herokuapp.com/api/v1/accounts/login", requestOptions)
            .then(result => {
                if (result.status === 200) {
                    console.log('Success:'+ result.json().toString())
                    navigation.navigate("Home Screen")
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Username</Text>
            <TextInput value='tobias' placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput value='asdfasdf' secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="Sign In" onPress={() => signInUser()}></Button>
        </View>
    );
};

export default SignIn