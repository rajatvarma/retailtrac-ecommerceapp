import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

const GeneralButton = ({text, onPress, styleType}) => {
    const [disabled, setDisabled] = useState(false)

    var styles = styles_primary

    if (styleType == 'primary') {
        var styles = styles_primary
    } else if (styleType == 'secondary') {
        var styles = styles_secondary
    }


    return (
        <> 
        {(styleType == 'secondary') ?
            <Pressable onPress={() => {onPress()}}>  
                <LinearGradient
                    start={{x: 0.1, y: 0}}
                    end={{x:0.9, y: 0}}
                    colors={['#00C2FF', '#0066FF']}
                    style={styles.container}>
                    <Text style={styles.text}>{text}</Text>
                </LinearGradient>
            </Pressable>

            :

            <Pressable style={styles.container} onPress={() => {onPress()}}>  
                    <Text style={styles.text}>{text}</Text>
            </Pressable>

            }
        </>

    )
}

const styles_primary = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        borderRadius: 5,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    text: {
        fontWeight: '700',
        color: '#C6012C',
        fontFamily: 'Epilogue_700Bold',
        fontSize: 20,
        textAlign: 'center',
    }

})

const styles_secondary = StyleSheet.create({
    container: {
        // backgroundColor: '#00B3FF',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    text: {
        fontWeight: '700',
        color: 'white',
        fontSize: 20,
        fontFamily: 'Epilogue_700Bold',
        textAlign: 'center',
    }

})

export const SmallButton = ({icon, text, onPress}) => {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: '#067DFF',
            padding: '5%',
            borderRadius: 10,
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },

        text: {
            color: 'white',
            marginHorizontal: '5%',
            fontSize: 14,
            fontFamily: 'Epilogue_700Bold',
        }
    })

    return(
        <Pressable style={styles.container} onPress={() => onPress()}>
            <FontAwesomeIcon icon={icon} size={14} color="white" />
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

export default GeneralButton