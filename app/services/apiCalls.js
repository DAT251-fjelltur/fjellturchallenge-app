import React from 'react';
import {
    Alert
} from 'react-native';

export function signUpOrIn(upOrIn, username, password, {navigation}) {
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

    fetch(`https://fjellturchallenge-backend-dev.herokuapp.com/api/v1/accounts/${upOrIn}`, requestOptions)
        .then(response => response.status)
        .then(result => {
            if (result === 200) {
                if (upOrIn === "register") {
                    navigation.navigate("Home Screen")
                }
                else if (upOrIn === "login"){
                    navigation.navigate("Sign In")
                }
                else {
                    Alert.alert(`${upOrIn} does not exist`)
                }
            }
        })
        .catch(error => console.log('error', error));
}