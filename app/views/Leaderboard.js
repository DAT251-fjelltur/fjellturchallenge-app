
import React, { useContext } from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { getLeaderboard } from '../services/account';
import { Context as AuthContext } from '../context/AuthContext'

function Leaderboard() {
    const [isLoading, setLoading] = useState(false)
    const [leaderboard, setLeaderboard] = useState(null)

    const { state } = useContext(AuthContext)
    const tok = state.token

    const test = [
        {userName: 'Joe', highScore: 52},
        {userName: 'Jenny', highScore: 120},
        //...
    ]

    useEffect(() => {
        getLeaderboard({ setLoading, setLeaderboard, tok })
    }, [])

    function printLeaderboard() {
        getLeaderboard({ setLoading, setLeaderboard, tok })
    }

    function sortedLeaderboard(user) {
        return <Text key={user['id']}>{user['username']}</Text>
    }

    
    return (
        <>
            {isLoading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>LOADING...</Text>
                </View>
                :
                leaderboard ?
                
                    <View>
                        {leaderboard.map(user => {
                            return sortedLeaderboard(user)
                        })}
                    </View>
                    :
                    <Text>No leaderboard to display...</Text>
            }
            

        </>
    )
}

export default Leaderboard