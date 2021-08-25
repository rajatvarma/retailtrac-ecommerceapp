import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import * as Animatable from 'react-native-animatable'

const TextInputError = ({display = false}) => {
    if (!display) {
        return null
    }

    return (
        <Animatable.View
            animation='shake'
            duration={200}
            easing="linear">
            <FontAwesomeIcon icon={faTimesCircle} color="#C10312"/>
        </Animatable.View>
    )
}

export default TextInputError