import { StyleSheet } from 'react-native'

export const HOLE_WIDTH = 100;
export const HOLE_HEIGHT = 10;

const styles = StyleSheet.create({
    hole: {
        position: 'absolute',
        height: HOLE_HEIGHT,
        width: HOLE_WIDTH,
        backgroundColor: '#FFFFFF'
    }
})

export default styles