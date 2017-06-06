import React, { Component } from 'react'
import { Vibration, View, Text, Animated } from 'react-native'

import { randInt } from '../utils'

import Hole from './Hole'
import Bullet from './Bullet'
import Ball from '../Ball'

import styles from './style.css'

const DURATION_MIN = 1000;
const DURATION_INITIAL = 3000;

const SEN = 0.2; // shake finish time point

class PlayScreen extends Component {
  static navigationOptions = {
    title: 'Play'
  }
  state = {
    score: 0,
    duration: DURATION_INITIAL, // bullet duration
    bullet_number: -1,
    bullets: [],
    gameover: false,
    gameover_anim: new Animated.Value(0)
  }
  constructor(props) {
    super(props);
    this.hole = {};
  }
  crash = () => {
    const { gameover, gameover_anim } = this.state;
    if (gameover) return;
    this.setState(()=>({gameover:true}));
    this.hole.stop();
    Animated.timing(gameover_anim, { toValue:1, duration:700, useNativeDriver:true }).start();
    // console.log('you lose');
    Vibration.vibrate();
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
  componentDidUpdate(props_old, state_old) {
    const { gameover, gameover_anim } = this.state;
    const { gameover:gameover_old } = state_old;

    if (!gameover && gameover_old) {
      // game was restarted
      gameover_anim.setValue(0);
      this.shootAgain();
    }
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
  goBack = () => this.props.navigation.goBack();
  restartGame = () => {
    const { gameover_anim } = this.state;
    this.setState(() => ({
      score:0,
      bullets: []
    }));
    Animated.timing(gameover_anim, { toValue:SEN, duration:500, useNativeDriver:true }).start(() => {
      this.setState(() => ({
        gameover: false,
        duration: DURATION_INITIAL,
        score: 0,
        bullets: [],
        bullet_number: -1
      }));
      this.hole.start();
    });
  }
  render() {
    const { gameover, gameover_anim, score, bullets } = this.state;

    let style_controls;
    let style_replay;
    let style_home;
    let style_score;
    let style_barview;
    if (gameover) {
      style_controls = {
        transform: [{ translateY:gameover_anim.interpolate({ inputRange:[0,SEN,1], outputRange:[0,0,-200] }) }]
      };
      style_home = {
        padding: 5, // needed for android so oveflow doesnt cut off on ball hover
        transform: [{ translateY:gameover_anim.interpolate({ inputRange:[0,SEN,SEN+.2,SEN+.6,1], outputRange:[50,50,50,0,0] }) }]
      };
      style_replay = {
        padding: 5, // needed for android so oveflow doesnt cut off on ball hover
        transform: [{ translateY:gameover_anim.interpolate({ inputRange:[0,SEN,SEN+.4,SEN+.8,1], outputRange:[75,75,75,0,0] }) }]
      };
      style_score = {
        transform: [
          { translateY:gameover_anim.interpolate({ inputRange:[0,SEN,1,1], outputRange:[0,0,100,100] }) },
          { scale:gameover_anim.interpolate({ inputRange:[0,SEN,SEN+.5,1], outputRange:[1,1,3,3] }) }
        ]
      };

      style_barview = {
        transform: [{ translateY:gameover_anim.interpolate({ inputRange:[...range(0,SEN,10),1], outputRange:[0,5,-5,5,-5,5,-5,5,-5,0,0] }) }]
      };
    }

    return (
      <View style={styles.mainview}>
        <Animated.View style={[styles.scoreview, style_score]}>
          <Text style={styles.scoretext}>{score}</Text>
        </Animated.View>
        <Animated.View style={[styles.barview, style_barview]}>
          <View style={styles.bar} />
          <Hole hackref={this.hole} />
          { bullets.map( ({ bullet_number, duration }) => <Bullet duration={duration} key={bullet_number} bullet_number={bullet_number} hole={this.hole} bulletPassed={this.bulletPassed} incrementScore={this.incrementScore} bulletReachedEOS={this.bulletReachedEOS} crash={this.crash} gameover={gameover} /> ) }
        </Animated.View>
        { gameover && <Animated.View style={[styles.controls, style_controls]}>
          <Animated.View style={style_replay}>
            <Ball label="&#61477;" size={120} hover onPress={this.restartGame} />
          </Animated.View>
          <Animated.View style={style_home}>
            <Ball label="&#8962;" onPress={this.goBack} size={120} hover />
          </Animated.View>
        </Animated.View> }
      </View>
    );
  }
}

function range(min, max, len, decimals=2) {
  const range = [min];
  const interval = (max - min) / (len - 1);
  for (let i=1; i<len-1; i++) {
    const num = range[i-1] + interval;
    // console.log('num:', num);
    const str_fixed = num.toFixed(decimals);
    const float = parseFloat(str_fixed);
    range.push(float);
  }
  range.push(max);
  return range;
}

export default PlayScreen