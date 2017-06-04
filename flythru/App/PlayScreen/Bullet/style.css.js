import { StyleSheet } from 'react-native'

const BULLET_WIDTH = 30;

const styles = StyleSheet.create({
    bullet: {
        width: BULLET_WIDTH,
        height: BULLET_WIDTH,
        borderRadius: BULLET_WIDTH / 2,
        backgroundColor: '#CCCCCC',
        position: 'absolute',
        // // bottom: BULLET_WIDTH * -1,
        // top: 0,
        // left: 0
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        color: 'black'
    }
})

export default styles