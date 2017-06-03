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
            alignSelf: 'center',
            marginRight: '10%',
            transform: [
                { scale: anim.interpolate({ inputRange:[0,1,2], outputRange:[0,1,1] }) }
            ],
            opacity: anim.interpolate({ inputRange:[0,0.5,2], outputRange:[0,1,1] })
        };
        const style_ball_settings = {
            alignSelf: 'flex-end',
            marginTop: '16%',
            marginRight: '12%',
            transform: [
                { scale: anim.interpolate({ inputRange:[0,.2,2], outputRange:[0,1,1] }) }
            ],
            opacity: anim.interpolate({ inputRange:[0,0.5,2], outputRange:[0,1,1] })
        };
        const style_ball_history = {
            alignSelf: 'flex-start',
            marginTop: '5%',
            marginLeft: '10%',
            transform: [
                { scale: anim.interpolate({ inputRange:[0,.4,2], outputRange:[0,1,1] }) }
            ],
            opacity: anim.interpolate({ inputRange:[0,0.5,2], outputRange:[0,1,1] })
        };

        return (
            <View style={styles.mainview}>
                <Title anim={anim}>FlyThru</Title>
                <View style={styles.controls}>
                    <Animated.View style={style_ball_play}>
                        <Ball label="&#61455;" onPress={this.gotoPlay} size={200} hover />
                    </Animated.View>
                    <View style={styles.subcontrols}>
                        <Animated.View style={style_ball_history}>
                            <Ball label="&#62768;" onPress={this.gotoHistory} size={100} hover />
                        </Animated.View>
                        <Animated.View style={style_ball_settings}>
                            <Ball label="&#39041;" onPress={this.gotoSettings} size={110} hover />
                        </Animated.View>
                    </View>
                </View>
            </View>
        )
    }
}

export default LandingScreen