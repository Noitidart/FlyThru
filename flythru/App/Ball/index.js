import React, { PureComponent } from 'react'
import { View, Text, TouchableHighlight, Animated, Easing } from 'react-native'

import { randInt } from '../utils'

import styles from './style.css'

const HOVER_DURATION = 1000;

class Ball extends PureComponent {
    /* props
    size - number - width/height of sqaure
    label - string
    anim -
    onPress
    hover - bool
    */
    state = {
        anim: new Animated.Value(0)
    }
    componentDidMount() {
        // hover?
        const { hover } = this.props;
        if (hover) {
            this.cycleHover();
        }
    }
    cycleHover = () => {
        const { anim } = this.state;
        Animated.sequence([
            Animated.timing(anim, { toValue:1, duration:HOVER_DURATION, easing:Easing.inOut(Easing.linear), useNativeDriver:true }),
            Animated.timing(anim, { toValue:0, duration:HOVER_DURATION, easing:Easing.inOut(Easing.linear), useNativeDriver:true })
        ]).start(this.cycleHover);
    }
    render() {
        const { children, label, onPress, size, hover } = this.props;
        const { anim } = this.state;

        const style_size = {
            width: size,
            height: size,
            borderRadius: Math.round(size / 2)
        };

        const label_size = {
            fontSize: Math.round(size / 2.5)
        };

        const style_hover = !hover ? undefined : {
            alignSelf: 'flex-start',
            padding: 2,
            transform: [
                // { translateX:anim.interpolate({ inputRange:[0,.2,.4,.6,.8,1,1], outputRange:[0,-2,0,2,0,-2,0]}) },
                // { translateY:anim.interpolate({ inputRange:[0,.2,.4,.6,.8,1,1], outputRange:[0,2,0,-2,0,2,0]}) }
                { translateX:anim.interpolate({ inputRange:[0,.2,.4,.6,.8,1,1], outputRange:[0,randInt(-2, 2),0,randInt(-2, 2),0,randInt(-2, 2),0]}) },
                { translateY:anim.interpolate({ inputRange:[0,.2,.4,.6,.8,1,1], outputRange:[0,randInt(-2, 2),0,randInt(-2, 2),0,randInt(-2, 2),0]}) }
            ]
        };

        return (
            <Animated.View style={style_hover}>
                <TouchableHighlight style={styles.touch} activeOpacity={0.7} onPress={onPress} underlayColor="#FFFFFF" >
                    <View style={[styles.background, style_size]}>
                        <Text style={[styles.label, label_size]}>{label}</Text>
                    </View>
                </TouchableHighlight>
            </Animated.View>
        )
    }
}

export default Ball