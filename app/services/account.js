import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';
import {SERVER_URL, getToken} from '../services/utils';

/**
 * send a 'me' request
 * @returns promise<JSON> info on logged in user
 */
export function me() {
    var myHeaders = new Headers();
    return getToken().then((token)=>{
        //after token is read from storage, send request
        myHeaders.append("Authorization", "Bearer "+token);
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        var result = fetch(SERVER_URL+"/api/v1/accounts/me", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result); 
                return result;
            })
            .catch(error => console.log('error sending me request', error));

        return result;
    })
}
/*
 * Sign in user and set jwt token in Asyncstorage
 */
export function signInUser(username, password) {
    console.log('signing in...');
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

    console.log(SERVER_URL+"/api/v1/accounts/login");
    fetch(SERVER_URL+"/api/v1/accounts/login", requestOptions)
        .then(response => {
            console.log(response.status);
            if (response.status !== 200) {
                console.log('error logging in');
            }
            return response.json()
        })
        .then(resultJson => {
            let token = resultJson['jwt'];
            console.log("RESULT " + resultJson);
            AsyncStorage.setItem('@jwt', token)
        })
        .catch(error => console.log('error ', error));
}
/**
 * creates a user
 * navigtes to sign in if succesful
 */
export function createUser(username, password) {
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

    fetch(SERVER_URL+"/api/v1/accounts/register", requestOptions)
        .then(result => {
            if (result.status === 200) {
                console.log('Success')
                navigation.navigate("Sign In")
            }
        })
        .catch(error => console.log('error', error));
}