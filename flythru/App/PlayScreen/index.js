import React, { Component } from 'react'
import { Vibration, View, Text } from 'react-native'

import { randInt } from '../utils'

import Hole from './Hole'
import Bullet from './Bullet'

import styles from './style.css'

const DURATION_MIN = 1000;

class PlayScreen extends Component {
  static navigationOptions = {
    title: 'Play'
  }
  state = {
    tilt: 0,
    score: 0,
    duration: 1000, // bullet duration
    delay: 3000, // delay to next shot. if it === duration, then obviously will fire next one as previous one reaches end of screen
    bullet_number: -1,
    bullets: [],
    gameover: false
  }
  constructor(props) {
    super(props);
    this.hole = {};
  }
  crash = () => {
    const { gameover } = this.state;
    if (gameover) return;
    this.hole.stop();
    console.log('you lose');
    Vibration.vibrate();
    this.setState(()=>({gameover:true}));
  }
  incrementScore = () => { // bind untested
    this.setState(({score})=>({score:score+1}));
    // bullet passed succesfully
  }
  bulletPassed = () => { // bind untested
    // bullet passed succesfully
    // const { delay_after_pass } = this.state;
    // setTimeout(this.shootAgain, delay_after_pass);
  }
  bulletReachedEOS = bullet_number => {
    this.setState(({ bullets })=>({
      bullets: bullets.filter( ({ bullet_number:a_bullet_number }) => a_bullet_number !== bullet_number)
    }));
  }
  componentDidMount() {
    this.shootAgain();
  }
  shootAgain = () => { // bind untested
    const { gameover, duration, delay, score } = this.state;

    if (gameover) return;

    // every 5 points, randomly reduce duration or delay
    let duration_new = duration;
    if (score > 0 && score % 5 === 0) {
      // if (randInt(0, 1) === 0) {
        // reduce duration - not less then DURATION_MIN
        duration_new -= 200;
        if (duration_new < DURATION_MIN) {
          duration_new = DURATION_MIN;
        }
      // } else {
      //   // reduce delay - not less then half of duration
      // }
    }

    this.setState(({ bullets, bullet_number })=>({
      duration: duration_new,
      bullet_number: bullet_number+1,
      bullets: [...bullets, {
        bullet_number: bullet_number+1,
        duration: duration_new
      }]
    }));

    setTimeout(this.shootAgain, randInt(duration_new / 2, duration_new)); // timeout of duration means
  }
  render() {
    const { gameover, score, bullets } = this.state;

    return (
      <View style={styles.mainview}>
        <View style={styles.scoreview}>
          <Text style={styles.scoretext}>{score}</Text>
        </View>
        <View style={styles.barview}>
          <View style={styles.bar} />
          <Hole hackref={this.hole} />
          { bullets.map( ({ bullet_number, duration }) => <Bullet duration={duration} key={bullet_number} bullet_number={bullet_number} hole={this.hole} bulletPassed={this.bulletPassed} incrementScore={this.incrementScore} bulletReachedEOS={this.bulletReachedEOS} crash={this.crash} gameover={gameover} /> ) }
        </View>
      </View>
    );
  }
}

export default PlayScreen