import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

import { HOLE_HEIGHT } from './Hole/style.css'

const styles = StyleSheet.create({
    mainview: {
        flex: 1
    },
    scoreview: {
        // backgroundColor: 'springgreen',
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent', // ios needs this else on react-navigation transition to landing we see it covered by this
        marginTop: Platform.OS === 'ios' ? 15 : undefined, // ios needs this // ios has status bar height in way /Users/noitidart/Pictures/Screenshot -  4, 2017 8.42 PM.png
    },
    barview: {
        flex: 1,
        justifyContent: 'center'
    },
    bar: {
        backgroundColor: 'lightsteelblue',
        height: HOLE_HEIGHT,
        position: 'absolute',
        width: '100%'
    },
    scoretext: {
        fontSize: 50,
        textAlign: 'center'
    },
    controls: {
        position: 'absolute',
        top: '100%',
        width: '100%',
        backgroundColor: '#FFFFFF', // if i dont set this - for some reason on restart game and lose again - android doesnt show the controls again
        height: 200, // android needs to show the anim
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default styles