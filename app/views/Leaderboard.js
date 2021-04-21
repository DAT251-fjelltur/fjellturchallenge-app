
import React, { useContext } from 'react';
import {
    View,
    Text,
    Button,
    RefreshControl
} from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { getLeaderboard } from '../services/account';
import { Context as AuthContext } from '../context/AuthContext'
import { Card, Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native';

function Leaderboard() {
    const [isLoading, setLoading] = useState(false)
    const [leaderboard, setLeaderboard] = useState(null)

    const { state } = useContext(AuthContext)
    const tok = state.token


    useEffect(() => {
        getLeaderboard({ setLoading, setLeaderboard, tok })
    }, [])

    function sortedLeaderboard(user, i) {
        return (
            <Card containerStyle={{ margin: 0 }}>
                <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{i + 1}.</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Avatar rounded source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }} />
                    </View>
                    <View style={{ flex: 5, justifyContent: 'center' }} key={user['id']}>
                        <Text>{user['username']}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text>{user['score']}</Text>
                    </View>
                </View>
            </Card>

        )
    }

    function LeaderboardHeader() {
        return (
            <Card containerStyle={{ margin: 0 }}>

                <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nr.</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>

                    </View>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Name</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Score</Text>
                    </View>
                </View>
            </Card>

        )
    }

    const onRefresh = React.useCallback(() => {
        getLeaderboard({ setLoading, setLeaderboard, tok })
    }, []);

    return (
        <>
            {
                leaderboard ?
                    <View style={{ flex: 1 }}>
                        <LeaderboardHeader></LeaderboardHeader>
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={onRefresh}
                            />
                        }>
                            {leaderboard.map((user, i) => {
                                return sortedLeaderboard(user, i)
                            })}
                        </ScrollView>
                    </View>
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>LOADING...</Text>
                    </View>
            }


        </>
    )
}

export default Leaderboard