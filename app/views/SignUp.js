import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    ActivityIndicator
} from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { Context as AuthContext } from '../context/AuthContext'
import Loading from '../components/Loading'


function SignUp({ navigation }) {
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { state, signup } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    return (
        <>
            {loading ?
                <Loading></Loading>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Username</Text>
                    <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
                    <Text>Password</Text>
                    <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
                    <View style={{marginBottom: 10}}>
                        {error && <Text style={{ color: "red" }}>{error}</Text>}
                    </View>
                    <Button title="REGISTER" onPress={() => { signup({ userName, password, navigation, setLoading, setError }) }}></Button>
                    <Text>Already have an account? </Text>
                    <Text onPress={() => navigation.navigate("Sign In")}>Sign in here</Text>
                </View>
            }
        </>
    );
};

export default SignUp