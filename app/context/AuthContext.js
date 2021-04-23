
import createDataContext from './createDataContext';
import { SERVER_URL } from '../services/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
const authReducer = (state, action) => {
    switch (action.type) {
        case 'signout':
            return { token: null, userName: '' };
        case 'signin':
        case 'signup':
            return {
                token: action.payload.token,
                userName: action.payload.userName,
            };
        default:
            return state;
    }
};

const signup = dispatch => {
    return ({ userName, password, navigation, setLoading, setError }) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": userName,
            "password": password
        })

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        setLoading(true)
        fetch(SERVER_URL + "/api/v1/accounts/register", requestOptions)
            .then(result => {
                if (result.status === 200) {
                    console.log('Success')
                    console.log("TIKTOK: ", result.json()['jwt']);
                    navigation.navigate("Sign In")
                }
                else {
                    throw new Error('Failed to register user');
                }
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setError('Failed to register user')
                console.log('error', error)
            });
    };
};



const signin = dispatch => {
    return ({ userName, password, setLoading, setError }) => {
        console.log('signing in...');
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "username": userName,
            "password": password
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        console.log(SERVER_URL + "/api/v1/accounts/login");
        setLoading(true)
        fetch(SERVER_URL + "/api/v1/accounts/login", requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status !== 200) {
                    console.log('error logging in');
                }
                return response.json()
            })
            .then(resultJson => {
                AsyncStorage.setItem('@jwt', resultJson['jwt'])
                dispatch({
                    type: 'signin',
                    payload: {
                        token: resultJson['jwt'],
                        userName: userName,
                    },
                });
                setLoading(false)
            })
            .catch(error => {
                setError("Incorrect username or password")
                setLoading(false)
                console.log('error ', error)
            });

    };
};

const signout = dispatch => {
    return () => {
        dispatch({ type: 'signout' });
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup },
    { token: null, userName: '' },
);