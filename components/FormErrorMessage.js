import React from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable'

const FormErrorMessage = ({message}) => {
    return (
        <Animatable.View
            style={styles.container}
            animation="shake"
            duration={1000}
            easing='ease-in-out'
        >
            <Text style={styles.text}>{message}</Text>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },

    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700'
    }

})

export default FormErrorMessage