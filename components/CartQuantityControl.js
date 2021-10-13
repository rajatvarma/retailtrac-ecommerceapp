import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, StyleSheet, View, Text, Alert } from 'react-native'

const QuantityControl = ({value, onPress, maxQuantity}) => {
    return(
        <View style={styles.wrapper}>
            <Pressable style={styles.button} onPress={() => onPress(value-1)}>
                <FontAwesomeIcon icon={faMinus} size={12}></FontAwesomeIcon>
            </Pressable>
            <Text style={styles.text}>{value}</Text>
            {value < maxQuantity && 
            <Pressable style={styles.button} onPress={() => {
                if (value === maxQuantity-1){
                    Alert.alert('Maximum Stock Reached', `Available quantity for this item is ${maxQuantity}`)
                }
                onPress(value+1)
            }}>
                <FontAwesomeIcon icon={faPlus} size={12}></FontAwesomeIcon>
            </Pressable>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 5,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        borderRadius: 10,
    },

    button: {
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },

    text: {
        fontFamily: 'Epilogue_600SemiBold',
        backgroundColor: 'white',
        fontSize: 16,
        paddingVertical: 4,
        paddingHorizontal: 6,
        textAlign: 'center',
        height: '100%',
        borderWidth: 1,
        borderRadius: 5
    }
})

export default QuantityControl