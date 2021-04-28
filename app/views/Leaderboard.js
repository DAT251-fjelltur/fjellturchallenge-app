
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
import { scoreboard } from '../assets/styles'
import Loading from '../components/Loading'

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
            <Card key={i} containerStyle={{ margin: 0 }}>
                <View style={scoreboard.cardContainer}>
                    <View style={scoreboard.numberContainer}>
                        <Text style={scoreboard.boldText}>{i + 1}.</Text>
                    </View>
                    <View style={scoreboard.avatarContainer}>
                        <Avatar rounded source={{
                            uri:
                                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                        }} />
                    </View>
                    <View style={scoreboard.usernameContainer} >
                        <Text>{user['username']}</Text>
                    </View>
                    <View style={scoreboard.scoreContainer}>
                        <Text>{user['score']}</Text>
                    </View>
                </View>
            </Card>

        )
    }

    function LeaderboardHeader() {
        return (
            <Card containerStyle={{ margin: 0 }}>

                <View style={scoreboard.cardContainer}>
                    <View style={scoreboard.numberContainer}>
                        <Text style={scoreboard.headerText}>Nr.</Text>
                    </View>
                    <View style={scoreboard.avatarContainer}>

                    </View>
                    <View style={scoreboard.usernameContainer}>
                        <Text style={scoreboard.headerText}>Name</Text>
                    </View>
                    <View style={scoreboard.scoreContainer}>
                        <Text style={scoreboard.headerText}>Score</Text>
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
                                progressBackgroundColor="#FFC24B"
                                colors={['white']}
                            />
                        }>
                            {leaderboard.map((user, i) => {
                                return sortedLeaderboard(user, i)
                            })}
                        </ScrollView>
                    </View>
                    :
                    <Loading></Loading>
            }


        </>
    )
}

export default Leaderboard