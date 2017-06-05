import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    title_view: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'flex-start',
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    title_char: {
        marginHorizontal: 5,
        fontSize: 50,
        lineHeight: 70,
        color: '#888888',
        fontFamily: 'Balder LL'
    },
    title_char_big: {
        marginHorizontal: 5,
        fontSize: 60,
        color: '#666666',
        fontFamily: 'Balder LL'
    }
})

export default styles