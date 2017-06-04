import React, { Component } from 'react'
import { View, Text, Dimensions, Animated, Platform, Easing } from 'react-native'

import { wait, getStatusBarHeight } from '../../utils'
import { HOLE_HEIGHT } from '../Hole/style.css' // bar height is same as hole height

import styles from './style.css'

const BULLET_WIDTH = 30;

const ANIM_DURATION = 2000;
const ANIM_DELAY = 1000;

class Bullet extends Component {
    /* props
    children - string
    hole - object
    */
    state = {
        anim: new Animated.Value(0)
    }
    componentDidMount() {
        const { anim } = this.state;
        const inst_anim = Animated.timing(anim, { toValue:1, duration:ANIM_DURATION, easing:Easing.inOut(Easing.linear), useNativeDriver:true });

        const translate_en = (Dimensions.get('screen').height / 2) - BULLET_WIDTH;

        // anim.addListener(({value})=>{
        //     // if (value > 0.5) {
        //     //     console.log('stopping now, value:', value);
        //     //     anim.stopAnimation();
        //     // } else {
        //     //     console.log('value:', value);
        //     // }
        //     const top = value * travel_dist;
        //     console.log('top:', top);
        //     if (top >= bar_btm_dist) {
        //         anim.stopAnimation();
        //     }
        // });

        // setTimeout(() => {
        //     anim.stopAnimation();
        //     // inst_anim.stop();
        //     console.log('stopped it');
        // }, 300);

        inst_anim.start();
        console.log('started now');

    }
    getTranslatePoints() {
        // on android
            // `0` lines top of bullet to bottom of status bar
            // `0 - getStatusBarHeight()` lines top of bullet to top of screen
            // `0 - getStatusBarHeight() - (BULLET_WIDTH - getStatusBarHeight())` lines bottom of bullet to bottom of status bar

            // `(Dimensions.get('window').height / 2)` lines top of bullet to bottom of bar plus some kind of gap ~10 (im not sure what that gap is)
            // `(Dimensions.get('screen').height / 2) - BULLET_WIDTH` lintes top of bullet to bottom of bar
        // const translate_en = 0 - getStatusBarHeight() - (BULLET_WIDTH - getStatusBarHeight());
        const translate_en = (Dimensions.get('screen').height / 2) - BULLET_WIDTH;

        // on android
            // `height - getStatusBarHeight()` this lines the top of the bullet, to top of the soft menu bar
        const translate_st = Dimensions.get('window').height - getStatusBarHeight();

        return [translate_st, translate_en];
    }
    render() {
        const { anim } = this.state;

        const bullet_protrusions_height = (BULLET_WIDTH-HOLE_HEIGHT)/2; // this is the height of the bullet that sticks on out top, and on bottom of bar
        const transform_to_bottom_of_bar = bullet_protrusions_height + HOLE_HEIGHT; // top_portion_height + bar_height
        const style_bullet = {
            transform: [{ translateY:anim.interpolate({ inputRange:[0,1], outputRange:[0,transform_to_bottom_of_bar] }) }]
        };

        return <Animated.View style={[styles.bullet, style_bullet]} />;
    }
}

export default Bullet