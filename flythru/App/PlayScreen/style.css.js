import { StyleSheet } from 'react-native'

import { HOLE_HEIGHT } from './Hole/style.css'

const styles = StyleSheet.create({
    mainview: {
        flex: 1
    },
    scoreview: {
        // backgroundColor: 'springgreen',
        position: 'absolute',
        width: '100%'
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
        height: HOLE_HEIGHT,
        position: 'absolute',
        width: '100%'
    },
    scoretext: {
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'Balder LL'
    }
})

export default styles