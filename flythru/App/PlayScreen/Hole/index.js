import React, { PureComponent } from 'react'
import { View, Text, Dimensions, Animated, Platform } from 'react-native'
import { decorator as sensors } from 'react-native-sensors'

import styles, { HOLE_WIDTH } from './style.css'

class Hole extends PureComponent {
    /* props
    children - string
    anim
    hackref - object
    */
    constructor(props) {
        super(props);
        this.left = 901;
        this.props.hackref.getLeft = () => this.left;
    }
    render() {
        const { Accelerometer } = this.props;

        let { width, height } = Dimensions.get('window');
        const portrait = width > height ? false : true;

        // if (!portrait && Platform.OS === 'android') {
        //     // because in landscape, android puts the statusbar on the right side of the screen
        //     width -= getStatusBarHeight() * 2;
        // }

        let info_el;

        if (this.left === 901) {
            const center = (width / 2) - (HOLE_WIDTH / 2);
            this.left = Math.round(center);
        } else {
            if (typeof Accelerometer !== 'undefined') {
                const { x, y, z } = Accelerometer;
                const roll = Math.atan2(y, z) * 57.3
                const pitch = Math.atan2((-1*x) , Math.pow((y * y) + (z * z), 0.5)) * 57.3;

                const tilt = portrait ? pitch : roll; // portrait ? x : y;

                const inverse_landscape = !portrait && pitch > 0;
                // const inverse_portrait = portrait && pitch < 0; // doesnt work, and i cant get a inverse portrait orientation
                const left_new = this.left + (tilt * (inverse_landscape ? -1 : 1));
                if (left_new < 0) {
                    this.left = 0;
                } else if (left_new > (width - HOLE_WIDTH)) {
                    this.left = width - HOLE_WIDTH;
                } else {
                    this.left = left_new;
                }

                info_el = [
                    <Text key="0">Orienation: {portrait ? 'Portrait' : 'Landscape'}</Text>,
                    <Text key="1">Tilt: {tilt.toFixed(2)}</Text>,
                    <Text key="2">Roll: {roll.toFixed(2)}</Text>,
                    <Text key="3">Pitch: {pitch.toFixed(2)}</Text>,
                    <Text key="4">Accel X: {x.toFixed(2)}</Text>,
                    <Text key="5">Accel Y: {y.toFixed(2)}</Text>,
                    <Text key="6">Accel Z: {z.toFixed(2)}</Text>
                ];
            }
        }
        const styles_tilt = {
            left: this.left
        };
        return (
            <View style={[styles.hole, styles_tilt]}>
                {/*{info_el}*/}
            </View>
        )
    }
}
// export default Hole

export default sensors({
  Accelerometer: {
      updateInterval: 20
  },
  Gyroscope: false,
  Magnetometer: false
})(Hole);