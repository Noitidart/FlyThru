import { StyleSheet } from 'react-native'

const BULLET_WIDTH = 30;

const styles = StyleSheet.create({
    bullet: {
        width: BULLET_WIDTH,
        height: BULLET_WIDTH,
        borderRadius: BULLET_WIDTH / 2,
        backgroundColor: '#999999',
        position: 'absolute',
        bottom: 0,
        left: 0
    }
})

export default styles