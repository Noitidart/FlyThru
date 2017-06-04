import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Hole from './Hole'
import Bullet from './Bullet'

import styles from './style.css'

class PlayScreen extends React.Component {
  static navigationOptions = {
    title: 'Play'
  }
  state = {
    tilt: 0
  }
  render() {
    return (
      <View style={styles.mainview}>
        <Bullet />
        <View style={styles.scoreview}>
          <Text style={styles.scoretext}>0</Text>
        </View>
        <View style={styles.barview}>
          <View style={styles.bar} />
          <Hole />
        </View>
        <View style={styles.footview} />
      </View>
    );
  }
}

export default PlayScreen