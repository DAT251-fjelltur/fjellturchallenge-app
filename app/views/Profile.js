import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ActivityIndicator,
    Button,
    TouchableOpacity
} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'
import Loading from '../components/Loading'
import { profile } from '../assets/styles'
import { me } from '../services/account';
import { Avatar } from 'react-native-elements';


function Profile() {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const { state, signin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        me().then(res => {
            setUser(res)
            setLoading(false)
        })
    }, [])

    return (
        <>
            {!user ?
                <Loading></Loading>
                :
                <View style={profile.container}>
                    <View style={profile.user}>
                        <Avatar size="large" rounded source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }} />
                        <Text style={profile.userText}>{user['username']}</Text>
                    </View>
                    <View style={profile.score}>
                        <Text style={profile.scoreText}>{user['score']} points</Text>
                    </View>
                </View>
            }
        </>
    );
};

export default Profile