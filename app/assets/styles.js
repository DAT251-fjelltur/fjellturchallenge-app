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

