import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'


const styles = StyleSheet.create({
    title_view: {
        flexDirection: 'row',
        padding: 15,
        marginTop: Platform.OS === 'ios' ? 15 : undefined, // ios needs this
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
        backgroundColor: 'transparent', // on ios i need transparent otherwise it is whtie
        fontFamily: Platform.OS === 'ios' ? 'BalderLL' : 'Balder LL'
    },
    title_char_big: {
        marginHorizontal: 5,
        fontSize: 60,
        color: '#666666',
        backgroundColor: 'transparent',
        fontFamily: Platform.OS === 'ios' ? 'BalderLL' : 'Balder LL'
    }
})

export default styles