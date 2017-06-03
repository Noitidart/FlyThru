import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from './style.css'

class PlayScreen extends React.Component {
  static navigationOptions = {
    title: 'Play'
  }
  render() {
    return <Text>PlayScreen</Text>;
  }
}

export default PlayScreen