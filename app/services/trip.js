import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';
import { SERVER_URL, getToken } from './utils';
import Geolocation from '@react-native-community/geolocation';

/**
 * start activity
 */
export function startTrip(setTripID) {
  return Geolocation.getCurrentPosition(info => {
    var lat_1 = info.coords.latitude;
    var long_1 = info.coords.longitude;
    let myHeaders = new Headers();
    return getToken().then((token) => {
      //after token is read from storage, send request
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "latitude": lat_1,
        "longitude": long_1,
        "accuracy": 0.0
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let result = fetch(SERVER_URL + "/api/v1/trip/start", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('trip started, updates state', result);
          setTripID(result['id']);
          return result;
        })
        .catch(error => console.log('error sending start activity request', error));

      return result;
    })
  }, err => {
    console.log(err)
    alert('fetching the position failed')
  }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });


}

/**
 * get current trip
 */
export function current() {
  let myHeaders = new Headers();
  return getToken().then((token) => {
    //after token is read from storage, send request
    myHeaders.append("Authorization", "Bearer " + token);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let result = fetch(SERVER_URL + "/api/v1/trip/current", requestOptions)
      .then(response => response.json())
      .then(result => {
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
  return getToken().then((token) => {
    //after token is read from storage, send request
    myHeaders.append("Authorization", "Bearer " + token);
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

    fetch(SERVER_URL + "/api/v1/trip/stop", requestOptions)
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
  return getToken().then((token) => {
    //after token is read from storage, send request
    myHeaders.append("Authorization", "Bearer " + token);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let result = fetch(SERVER_URL + "/api/v1/trip/" + cur + "/info", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("activity.getInfo result: " + result);
        return result;
      })
      .catch(error => console.log('error sending current request', error));

    return result;
  })
}

/**
 * update location with current corrdinates
 */
export async function updateLocation(lat, long) {
  let myHeaders = new Headers();
  const token = await getToken();
  return Geolocation.getCurrentPosition(info => {
    console.log('geolocation curpos:', info['coords']);
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    var lat_1 = info.coords.latitude;
    var long_1 = info.coords.longitude;

    var raw = '{\n    "latitude": ' + lat_1 + ',  "longitude": ' + long_1 + ',  "accuracy": 0.0}';

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(SERVER_URL + "/api/v1/trip/update", requestOptions)
      .then(response => response.text())
      .then(result_2 => { })
      .catch(error => console.log('error sending update request', error));

    return { 'latitude': lat_1, 'longitude': long_1 }
  }, err => {
    console.log(err)
    alert('fetching the position failed')
  }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });

}
/**
 * 
  * @returns 0 if tripID is null
 */
export function getDistance(tripID) {
  if (tripID == null) {
    return "0";
  }
  let myHeaders = new Headers();
  return getToken().then((token) => {
    //after token is read from storage, send request
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    var result = fetch(SERVER_URL + "/api/v1/trip/" + tripID + "/distance", requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);
        return json['meters'];
      })
      .catch(error => console.log('error', error));
    return result;
  })

}
/**
 * get duration of a trip
  * @returns 0 if tripID is null
 */
export function getDuration(tripID) {
  if (tripID == null) {
    return "0";
  }
  let myHeaders = new Headers();
  return getToken().then((token) => {
    //after token is read from storage, send request
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    var result = fetch(SERVER_URL + "/api/v1/trip/" + tripID + "/duration", requestOptions)
      .then(response => response.text())
      .then(result => {
        var json = JSON.parse(result);
        return json['seconds'];
      })
      .catch(error => console.log('error', error));
    return result;
  })

}