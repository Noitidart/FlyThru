import React, { PureComponent } from 'react'
import { View, Text, Dimensions, Animated, Platform } from 'react-native'
import { decorator as sensors } from 'react-native-sensors'

import styles from './style.css'

const HOLE_WIDTH = 100;

class Hole extends PureComponent {
    /* props
    children - string
    anim
    */
    constructor(props) {
        super(props);
        this.left = 901;
    }
    render() {
        const { Accelerometer } = this.props;

        let { width, height } = Dimensions.get('window');
        const portrait = width > height ? false : true;

        // if (!portrait && Platform.OS === 'android') {
        //     // because in landscape, android puts the statusbar on the right side of the screen
        //     width -= getStatusBarHeight() * 2;
        // }

        if (this.left === 901) {
            const center = (width / 2) - (HOLE_WIDTH / 2);
            this.left = Math.round(center);
        } else {
            if (typeof Accelerometer !== 'undefined') {
                const { x, y, z } = Accelerometer;
                const roll = Math.atan2(y, z) * 57.3
                const pitch = Math.atan2((-1*x) , Math.pow((y * y) + (z * z), 0.5)) * 57.3;

                const tilt = portrait ? pitch : roll; // portrait ? x : y;

                const left_new = this.left + tilt;
                if (left_new < 0) {
                    this.left = 0;
                } else if (left_new > (width - HOLE_WIDTH)) {
                    this.left = width - HOLE_WIDTH;
                } else {
                    this.left = left_new;
                }
            }
        }
        const styles_tilt = {
            left: this.left
        };

        return (
            <View style={[styles.hole, styles_tilt]}>
                {/*<Text>Orienation: {portrait ? 'Portrait' : 'Landscape'}</Text>
                <Text>Tilt: {tilt.toFixed(2)}</Text>
                <Text>Roll: {roll.toFixed(2)}</Text>
                <Text>Pitch: {pitch.toFixed(2)}</Text>
                <Text>Accel X: {x.toFixed(2)}</Text>
                <Text>Accel Y: {y.toFixed(2)}</Text>*/}
            </View>
        )
    }
}
// export default Hole

export default sensors({
  Accelerometer: {
    updateInterval: 16, // optional
  },
  Gyroscope: false,
  Magnetometer: false
})(Hole);