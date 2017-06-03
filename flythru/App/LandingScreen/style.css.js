import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    mainview: {
        flex: 1 // needed so title_view takes 100% height
    },
    controls: {
        marginTop: 120 // because title is absolutely position
    },
    subcontrols: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default styles