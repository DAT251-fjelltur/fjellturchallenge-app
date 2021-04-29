import { StyleSheet, Dimensions } from 'react-native'

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export const button = StyleSheet.create({
    primaryButton: {
        width: Dimensions.get('window').width / 4,
        backgroundColor: "#FFDE9D",
        color: "black",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        margin: 10
    },
    secondaryButton: {
        width: Dimensions.get('window').width / 2,
        backgroundColor: "#FFDE9D",
        color: "black",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})


export const scoreboard = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row', 
        display: 'flex', 
        justifyContent: 'center',
    },
    numberContainer: {
        flex: 0.5, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    boldText: {
        fontWeight: 'bold'
    },
    avatarContainer: {
        flex: 1, 
        alignItems: 'center',
    },
    usernameContainer: {
        flex: 5, 
        justifyContent: 'center'
    },
    scoreContainer: {
        flex: 1, 
        alignItems: 'flex-end', 
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold', 
        fontSize: 18
    }
})

export const general = StyleSheet.create({
    center: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})

export const profile = StyleSheet.create({
    container: {
        flex: 1, 
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    score: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',

    },
    userText: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20
    },
    scoreText: {
        fontSize: 18,
    }
})
