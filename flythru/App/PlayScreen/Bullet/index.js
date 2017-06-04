import React, { Component } from 'react'
import { View, Text, Dimensions, Animated, Platform } from 'react-native'

import styles from './style.css'

const BULLET_WIDTH = 30;

const BULLET_ANIM_DURATION = 2000;
const BULLET_ANIM_DELAY = 1000;
// const banim = new Animated.Value(0);

// function repeatShot() {
//     banim.setValue(0);
//     Animated.timing(banim, { toValue:1, duration:BULLET_ANIM_DURATION, delay:1000 }).start(repeatShot);
// }


class Bullet extends Component {
    /* props
    children - string
    anim
    */
    state = {
        anim: new Animated.Value(0)
    }
    componentDidMount() {
        const { anim } = this.state;
        Animated.timing(anim, { toValue:1, duration:BULLET_ANIM_DURATION, useNativeDriver:true }).start();
    }
    render() {
        const { anim } = this.state;
        const { height } = Dimensions.get('screen');

        const style_bullet = {
            transform: [{ translateY:anim.interpolate({ inputRange:[0,1], outputRange:[0,-1*height] }) }]
        };

        return <Animated.View style={[styles.bullet, style_bullet]} />;
    }
}

export default Bullet