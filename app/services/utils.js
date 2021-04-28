import AsyncStorage from '@react-native-async-storage/async-storage';
import useContext from 'react'
import { Context as AuthContext } from '../context/AuthContext';
export const SERVER_URL = 'https://fjellturchallenge-backend-dev.herokuapp.com'

/**
 * lookup Asyncstorage for a jwt token
 * @returns promise <String>: jwt token
 */

export const getToken =()=> {
    try {
        const tok = AsyncStorage.getItem('@jwt')
        if (tok !== null) {
            return tok;
        }
        else{
            console.log('No token in storage');
        }
    } catch (e) {
        console.log('Failed to fetch the data from storage ', e)
    }
}

export function deleteToken() {
    return getToken().then((token)=>{
        try {
            AsyncStorage.removeItem('@jwt');
            return true;
        }
        catch(exception) {
            console.log("ERROR: " + exception)
            return false;
        }
    })
}


/**
     * convert seconds to h and min
     */
 export function convertSeconds(s) {
    var h = Math.floor(s / 3600);
    var s = s % 3600;
    var min = Math.floor(s / 60);
    var s = s % 60;
    return h + "h, " + min + "min and " + s + "s";
}