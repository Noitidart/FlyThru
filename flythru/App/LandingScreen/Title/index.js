import React, { PureComponent } from 'react'
import { View, Text, Dimensions, Animated } from 'react-native'

import styles from './style.css'

class Title extends PureComponent {
    /* props
    children - string
    anim
    */
    dirs = []
    height = Dimensions.get('screen').height
    width = Dimensions.get('screen').width
    constructor(props) {
        super (props);

        // randomize directions for fly in of chars
        const { children } = this.props;
        const diropts = ['top', 'bottom', 'left', 'right'];
        shuffle(diropts);
        for (let i=0; i<children.length; i++) {
            this.dirs.push(diropts[randInt(0, 3)]);
        }
    }
    render() {
        const { children, anim } = this.props;

        const len = children.length;
        const chars = children.split('').map( (char, ix) => {
            const translate = ['top', 'bottom'].includes(this.dirs[ix]) ? 'translateY' : 'translateX';
            const inverse = ['right', 'bottom'].includes(this.dirs[ix]) ? -1 : 1;
            const dim = ['top', 'bottom'].includes(this.dirs[ix]) ? 'height' : 'width';
            const inst = 0+((1/len)*ix);
            const inout = Math.min(inst + 0.3, 1);
            const style_anim = {
                transform: [{ [translate]:anim.interpolate({ inputRange:[inst,inout,1,2], outputRange:[this[dim]*inverse,0,0,0]}) }]
            };
            // return <Animated.Text key={ix.toString()} style={[styles.title_char, style_anim]}>{char}</Animated.Text>;
            return <Animated.Text key={ix.toString()} style={[styles.title_char, style_anim, ['F','T'].includes(char) ? styles.title_char_big : undefined]}>{char}</Animated.Text>;
        });

        const style_hover = {
            transform: [{ translateY:anim.interpolate({ inputRange:[0,1,1.2,1.4,1.6,1.8,2,2], outputRange:[0,0,-2,0,2,0,-2,0]}) }]
        };

        return (
            <Animated.View style={[styles.title_view, style_hover]}>
                {chars}
            </Animated.View>
        )
    }
}

// https://stackoverflow.com/a/6274381/1828637
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (1+max-min)) + min
}

export default Title