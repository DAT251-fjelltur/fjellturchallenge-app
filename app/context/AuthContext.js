
import createDataContext from './createDataContext';
import {SERVER_URL} from '../services/utils';
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
    return ({ userName, password, navigation }) => {
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

        fetch(SERVER_URL + "/api/v1/accounts/register", requestOptions)
            .then(result => {
                if (result.status === 200) {
                    console.log('Success')
                    console.log("TIKTOK: ", result.json()['jwt']);
                    navigation.navigate("Sign In")
                }
            })
            .catch(error => console.log('error', error));
    };
};

const signin = dispatch => {
    return ({ userName, password }) => {
        // Do some API Request here
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
        fetch(SERVER_URL + "/api/v1/accounts/login", requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status !== 200) {
                    console.log('error logging in');
                }
                return response.json()
            })
            .then(resultJson => {
                dispatch({
                    type: 'signin',
                    payload: {
                        token: resultJson['jwt'],
                        userName: userName,
                    },
                });
            })
            .catch(error => console.log('error ', error));

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