import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';
import {SERVER_URL, getToken} from '../services/utils';

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
            "latitude": 0.0,
            "longitude": 0.0,
            "accuracy": 0.0
        });

        raw = JSON.stringify({
            "latitude": 0.0,
            "longitude": 0.0,
            "accuracy": 0.0
        });
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        let result = fetch(SERVER_URL+"/api/v1/trip/start", requestOptions)
          .then(response => response.json())
          .then(result => {
              return result;
          })
          .catch(error => console.log('error sending start activity request', error));

        return result;
    })
}

/**
 * get current trip
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
              //console.log("activity.current result: " + result);
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

        fetch(SERVER_URL+"/api/v1/trip/stop", requestOptions)
          .then(response => response.text())
          .then(result => console.log("activity.endActivity result: " + result))
          .catch(error => console.log('error sending en activity request', error));
    })
}


/**
 * get info about trip
 */
export function getInfo(cur) {
    let myHeaders = new Headers();
        return getToken().then((token)=>{
            //after token is read from storage, send request
            myHeaders.append("Authorization", "Bearer "+token);

        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        let result = fetch(SERVER_URL+"/api/v1/trip/"+cur+"/info", requestOptions)
              .then(response => response.json())
              .then(result => {
                  console.log("activity.getInfo result: " + result);
                  return result;
              })
              .catch(error => console.log('error sending current request', error));

            return result;
    })
}