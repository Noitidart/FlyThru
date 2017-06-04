import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    mainview: {
        flex: 1
    },
    scoreview: {
        // backgroundColor: 'springgreen',
        flex: 1
    },
    barview: {
        flex: 1,
        justifyContent: 'center'
    },
    footview: {
        // backgroundColor: 'orange',
        flex: 1
    },
    bar: {
        backgroundColor: 'lightsteelblue',
        height: 10
    },
    hole: {
        position: 'absolute',
        height: 10,
        width: 100,
        backgroundColor: 'gray'
    }
})

export default styles