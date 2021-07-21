import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'

const GeneralButton = ({text, onPress}) => {
    const [disabled, setDisabled] = useState(false)

    return (
        <>
        {!disabled ? 
            <Pressable style={styles.container} onPress={() => {
                onPress() 
            }
            }>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
            :
            <Pressable style={[styles.container, {backgroundColor: 'grey'}]} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#317BD4CC',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    text: {
        fontWeight: '700',
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    }

})

export default GeneralButton