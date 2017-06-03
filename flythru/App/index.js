import React from 'react'
import { AppRegistry, Text } from 'react-native'
import { StackNavigator } from 'react-navigation';

import LandingScreen from './LandingScreen'
import HistoryScreen from './HistoryScreen'
import PlayScreen from './PlayScreen'
import SettingsScreen from './SettingsScreen'

import styles from './style.css'

const App = StackNavigator(
    {
        Landing: { screen: LandingScreen },
        History: { screen: HistoryScreen },
        Play: { screen: PlayScreen },
        Settings: { screen: SettingsScreen }
    },
    {
        headerMode: 'none',
        cardStyle: styles.navigator
    }
);

AppRegistry.registerComponent('flythru', () => App);