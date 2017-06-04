import React, { Component } from 'react'
import { View, Text, Dimensions, Animated, Platform, Easing } from 'react-native'

import { wait, getStatusBarHeight, randInt } from '../../utils'
import { HOLE_WIDTH, HOLE_HEIGHT } from '../Hole/style.css' // bar height is same as hole height

import styles from './style.css'

const BULLET_WIDTH = 30;

class Bullet extends Component {
    /* props
    gameover
    hole - object,
    duration - 2000 // time to spend on screen. it reaches bottom of bar at half this
    bullet_number
    bulletReachedEOS
    bulletPassed
    incrementScore
    */
    state = {
        anim: new Animated.Value(0)
    }
    static defaultProps = {
        duration: 2000
    }
    passed = false
    constructor(props) {
        super(props);
        const { width } = Dimensions.get('window');
        this.left = randInt(0, width - BULLET_WIDTH);
    }
    componentWillUpdate(props_next) {
        const { gameover:gameover_next } = props_next;
        const { gameover } = this.props;

        // if (gameover_next !== gameover && gameover_next)
        if (gameover_next) {
            if (!this.passed) {
                const { anim } = this.state;
                anim.stopAnimation();
            }
        }
    }
    componentDidMount() {
        const { anim } = this.state;
        const { gameover, duration, incrementScore, crash, bullet_number, bulletReachedEOS } = this.props;

        if (gameover) return;

        Animated.timing(anim, { toValue:.5, duration:duration/2, easing:Easing.inOut(Easing.linear), useNativeDriver:true })
            .start(({ finished })=> {
                if (finished) {
                    // hit test bullet and hole
                    if (this.isBulletWithinHole()) {
                        Animated.timing(anim, { toValue:1, duration:duration/2, easing:Easing.inOut(Easing.linear), useNativeDriver:true })
                            .start(()=>bulletReachedEOS(bullet_number))
                        this.passed = true;
                        incrementScore();
                    } else {
                        crash();
                    }
                }
            });
    }
    isBulletWithinHole = () => { // bind untested
        const { hole } = this.props;

        const hole_left = hole.getLeft();
        const hole_right = hole_left + HOLE_WIDTH;

        const bullet_left = this.left;
        const bullet_right = bullet_left + BULLET_WIDTH;

        console.log('bullet_left:', bullet_left, 'hole_left:', hole_left);
        console.log('bullet_right:', bullet_right, 'hole_right:', hole_right);
        if (bullet_left >= hole_left && bullet_right <= hole_right) {
            return true;
        } else {
            return false;
        }
    }
    getTranslatePoints() {
        // gets translate points for bullet
        const bullet_protrusions_height = (BULLET_WIDTH-HOLE_HEIGHT)/2; // this is the height of the bullet that sticks on out top, and on bottom of bar
        const { height } = Dimensions.get('screen');

        return {
            topoff: -1 * Math.round(height / 2), // some unexact/unmeasured place off screen on bottom
            btmoff: Math.round(height / 2), // some unexact/unmeasured place off screen on bottom
            btmbar: bullet_protrusions_height + HOLE_HEIGHT // top of bullet lined to bottom of bar // can read the math as "top_portion_height + bar_height"
        }
    }
    render() {
        const { anim } = this.state;
        const { duration } = this.props;


        const trans = this.getTranslatePoints();
        const style_bullet = {
            left: this.left,
            transform: [{ translateY:anim.interpolate({ inputRange:[0,.5,1], outputRange:[trans.btmoff, trans.btmbar, trans.topoff] }) }]
        };

        return (
            <Animated.View style={[styles.bullet, style_bullet]}>
                {/*<Text style={styles.text}>{duration}</Text>*/}
            </Animated.View>
        )
    }
}

export default Bullet