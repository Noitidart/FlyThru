import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Ball from '../Ball'

import styles from './style.css'

class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings'
    }
    goBack = () => this.props.navigation.goBack()
    render() {
        return (
            <View style={styles.mainview}>
                <Text>SettingsScreen</Text>
                <Ball label="&#8647;" onPress={this.goBack} size={120} hover />
            </View>
        )
    }
}

export default SettingsScreen