import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable'

export const DotsWave = () => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            height: 50,
            backgroundColor: 'white',
            padding: 10,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
        },

        dot: {
            width: 10, 
            height: 10, 
            backgroundColor: 'red',
            borderRadius: 10
        }
    })

    const dotsAnim = useRef(new Animated.Value(-20)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    dotsAnim,
                    {
                        toValue: 20,
                        duration: 1000,
                        useNativeDriver: false
                    }
                ),
                Animated.timing(
                    dotsAnim,
                    {
                        toValue: -20,
                        duration: 500,
                        useNativeDriver: false
                    }
                )
            ]),
            {iterations: 10}
        ).start()
    }, [dotsAnim])


    return(
        <View style={styles.container}>
            <Animated.View style={{...styles.dot, transform: [{translateY: dotsAnim}, {perspective: 1000}]}}></Animated.View>
            <Animated.View style={{...styles.dot, transform: [{translateY: dotsAnim}, {perspective: 1000}]}}></Animated.View>
            <Animated.View style={{...styles.dot, transform: [{translateY: dotsAnim}, {perspective: 1000}]}}></Animated.View>
        </View>
    )
}


    {/* <Animatable.View 
                style={styles.dot}
                delay={0}
                animation='slideInDown'                
                direction= 'alternate'
                easing='ease-in-out'
                iterationCount='infinite'
             />
             <Animatable.View 
                style={styles.dot}
                delay={500}
                animation='slideInDown'                
                direction= 'alternate'
                easing='ease-in-out'
                iterationCount='infinite'
             />
             <Animatable.View 
                style={styles.dot}
                animation='slideInDown'                
                delay={1000}
                direction= 'alternate'
                easing='ease-in-out'
                iterationCount='infinite'
             /> */}