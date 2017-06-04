import React, { Component } from 'react'
import { View, Text } from 'react-native'

import Hole from './Hole'
import Bullet from './Bullet'

import styles from './style.css'

class PlayScreen extends Component {
  static navigationOptions = {
    title: 'Play'
  }
  state = {
    tilt: 0,
    score: 0,
    duration: 3000, // bullet duration
    delay_after_pass: 3000 / 2, // duration divided 2 means it will wait till it gets to end of screen
    bullet_number: 0,
    bullets: [0]
  }
  constructor(props) {
    super(props);
    this.hole = {};
  }
  incrementScore = () => { // bind untested
    this.setState(({score})=>({score:score+1}));
  }
  bulletPassed = () => { // bind untested
    // bullet passed succesfully
    const { delay_after_pass } = this.state;
    setTimeout(this.shootAgain, delay_after_pass);
  }
  bulletReachedEOS = bullet_number => {
    this.setState(({ bullets })=>({
      bullets: bullets.filter(a_bulet_number => a_bulet_number !== bullet_number)
    }));
  }
  shootAgain = () => {
    this.setState(({ bullets, bullet_number })=>({
      bullet_number: bullet_number+1,
      bullets: [...bullets, bullet_number+1]
    }));
  }
  render() {
    const { score, duration, bullets } = this.state;

    return (
      <View style={styles.mainview}>
        <View style={styles.scoreview}>
          <Text style={styles.scoretext}>{score}</Text>
        </View>
        <View style={styles.barview}>
          <View style={styles.bar} />
          <Hole hackref={this.hole} />
          { bullets.map( bullet_number => <Bullet duration={duration} key={bullet_number} bullet_number={bullet_number} hole={this.hole} bulletPassed={this.bulletPassed} incrementScore={this.incrementScore} bulletReachedEOS={this.bulletReachedEOS} /> ) }
        </View>
      </View>
    );
  }
}

export default PlayScreen