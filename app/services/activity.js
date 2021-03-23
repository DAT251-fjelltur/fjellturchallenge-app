import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';
import {SERVER_URL, getToken} from '../services/utils';

let tok = getToken();
/**
 * start activity
 */
export function startActivity(la, lo, ac) {
    let myHeaders = new Headers();
    return getToken().then((token)=>{
        //after token is read from storage, send request
        myHeaders.append("Authorization", "Bearer "+token);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
          "startLocation": {
            "latitude": 0.0,
            "longitude": 0.0,
            "accuracy": 0.0
          }
        });

        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(SERVER_URL+"/api/v1/trip/start", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("o");
                console.log(result);
                console.log("u");
                return result;
            })
            .catch(error => console.log('error sending me request', error));
    })
}

/**
 * current
 */
export function current() {
    let myHeaders = new Headers();
    return getToken().then((token)=>{
        //after token is read from storage, send request
        myHeaders.append("Authorization", "Bearer "+token);

        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        let result = fetch(SERVER_URL+"/api/v1/trip/current", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log('current trip:', result);
              return result;
          })
          .catch(error => console.log('error sending current request', error));

        return result;
    })
}


/**
 * end activity
 */
export function endActivity(cur, la, lo, ac) {
    let myHeaders = new Headers();
    return getToken().then((token)=>{
        //after token is read from storage, send request
        myHeaders.append("Authorization", "Bearer "+token);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
          "latitude": 1,
          "longitude": 0.1,
          "accuracy": 100
        });

        let requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(SERVER_URL+"/api/v1/trip/"+cur+"/stop", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    })
}