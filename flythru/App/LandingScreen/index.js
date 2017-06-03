import React, { Component } from 'react'
import { View, Text, Animated, Easing } from 'react-native'

import Title from './Title'
import Ball from '../Ball'

import styles from './style.css'

const ANIM_DURATION = 1000;
const HOVER_DURATION = 1000;

class LandingScreen extends React.Component {
    static navigationOptions = {
        title: 'Landing'
    }
    state = {
        anim: new Animated.Value(0)
    }
    gotoSettings = () => this.props.navigation.navigate('Settings')
    gotoPlay = () => this.props.navigation.navigate('Play')
    gotoHistory = () => this.props.navigation.navigate('History')
    componentDidMount() {

        // animation
        const { anim } = this.state;
        Animated.timing(anim, { toValue:1, duration:ANIM_DURATION }).start(this.cycleHover);

    }
    cycleHover = () => {
        const { anim } = this.state;
        Animated.sequence([
            Animated.timing(anim, { toValue:2, duration:HOVER_DURATION, easing:Easing.inOut(Easing.linear) }),
            Animated.timing(anim, { toValue:1, duration:HOVER_DURATION, easing:Easing.inOut(Easing.linear) })
        ]).start(this.cycleHover);
    }
    render() {
        const {navigation:{ navigate }} = this.props;
        const { anim } = this.state;

        const style_ball_play = {
            alignSelf: 'flex-start',
            transform: [
                { scale: anim.interpolate({ inputRange:[0,1,2], outputRange:[0,1,1] }) },
                { translateX:anim.interpolate({ inputRange:[0,1,1.1,1.2,1.5,1.9,1.9,2], outputRange:[0,0,1,0,-1,0,1,0]}) },
                { translateY:anim.interpolate({ inputRange:[0,1,1.2,1.4,1.6,1.8,2,2], outputRange:[0,0,1,0,-1,0,1,0]}) }
            ],
            opacity: anim.interpolate({ inputRange:[0,1,2], outputRange:[0,1,1] })
        };
        const style_ball_settings = {
            alignSelf: 'flex-start',
            transform: [
                { scale: anim.interpolate({ inputRange:[0,1,2], outputRange:[0,1,1] }) },
                { translateX:anim.interpolate({ inputRange:[0,1,1.2,1.4,1.6,1.8,2,2], outputRange:[0,0,-1,0,1,0,-1,0]}) },
                { translateY:anim.interpolate({ inputRange:[0,1,1.2,1.4,1.6,1.8,2,2], outputRange:[0,0,-1,0,1,0,-1,0]}) }
            ],
            opacity: anim.interpolate({ inputRange:[0,1,2], outputRange:[0,1,1] })
        };
        const style_ball_history = {
            alignSelf: 'flex-start',
            transform: [
                { scale: anim.interpolate({ inputRange:[0,1,2], outputRange:[0,1,1] }) },
                { translateX:anim.interpolate({ inputRange:[0,1,1.2,1.4,1.6,1.8,2,2], outputRange:[0,0,1,0,-1,0,1,0]}) },
                { translateY:anim.interpolate({ inputRange:[0,1,1.4,1.5,1.7,2,2,2], outputRange:[0,0,-1,0,1,0,-1,0]}) }
            ],
            opacity: anim.interpolate({ inputRange:[0,1,2], outputRange:[0,1,1] })
        };

        return (
            <View>
                <Title anim={anim}>FlyThru</Title>
                <Animated.View style={style_ball_play}>
                    <Ball label="&#61455;" onPress={this.gotoPlay} size={224} />
                </Animated.View>
                <Animated.View style={style_ball_history}>
                    <Ball label="&#62768;" onPress={this.gotoHistory} size={140} />
                </Animated.View>
                <Animated.View style={style_ball_settings}>
                    <Ball label="&#39041;" onPress={this.gotoSettings} size={130} />
                </Animated.View>
            </View>
        )
    }
}

export default LandingScreen