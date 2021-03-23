import AsyncStorage from '@react-native-async-storage/async-storage';

export const SERVER_URL = 'https://fjellturchallenge-backend-dev.herokuapp.com'

/**
 * lookup Asyncstorage for a jwt token
 * @returns promise<String>: jwt token
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