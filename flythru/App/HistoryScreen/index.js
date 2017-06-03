import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Ball from '../Ball'

import styles from './style.css'

class HistoryScreen extends React.Component {
    static navigationOptions = {
        title: 'History'
    }
    goBack = () => this.props.navigation.goBack()
    render() {
        return (
            <View style={styles.mainview}>
                <Text>HistoryScreen</Text>
                <Ball label="&#8647;" onPress={this.goBack} size={120} hover />
            </View>
        )
    }
}

export default HistoryScreen