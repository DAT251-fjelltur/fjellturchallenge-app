import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * lookup Asyncstorage for a jwt token
 * @returns String: jwt token
 */
export const getToken = async () => {
    try {
        const tok = await AsyncStorage.getItem('@jwt')
        if (tok !== null) {
            return tok;
        }
        else{
            console.log('did not find Token');
        }
    } catch (e) {
        console.log('Failed to fetch the data from storage ', e)
    }
}