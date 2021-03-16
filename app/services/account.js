import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';


/**
 * Sign in user and set jwt token in Asyncstorage
 */
function signInUser(username, password) {
    console.log('signing in...');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": username,
        "password": password
    })
    console.log(raw);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fjellturchallenge-backend-dev.herokuapp.com/api/v1/accounts/login", requestOptions)
        .then(response => {
            console.log(response.status);
            if (response.status !== 200) {
                console.log('error logging in');
            }
            return response.json()
        })
        .then(result => {
            let token = result['jwt'];
            console.log("RESULT " + result);
            AsyncStorage.setItem('@jwt', token)
        })
        .catch(error => console.log('error ', error));
}
/**
 * creates a user
 * navigtes to sign in if succesful
 * @param {*} username 
 * @param {*} password 
 */
function createUser(username, password) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": username,
        "password": password
    })

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fjellturchallenge-backend-dev.herokuapp.com/api/v1/accounts/register", requestOptions)
        .then(result => {
            if (result.status === 200) {
                console.log('Success')
                navigation.navigate("Sign In")
            }
        })
        .catch(error => console.log('error', error));
}
/**
 * get a jwt token from AsyncStorage
 */
async function getToken(setToken) {
    try {
        const tok = await AsyncStorage.getItem('@jwt')
        if (tok !== null) {
            console.log("Setting token")
            setToken(tok)
        }
    } catch (e) {
        console.log('Failed to fetch the data from storage ', e)
    }
}

export { signInUser, createUser }