import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'

const QuantityControl = ({value, onPress}) => {
    return(
        <View style={styles.wrapper}>
            <Pressable style={styles.button} onPress={() => onPress(value-1)}>
                <FontAwesomeIcon icon={faMinus} size={12}></FontAwesomeIcon>
            </Pressable>
            <Text style={styles.text}>{value}</Text>
            <Pressable style={styles.button} onPress={() => onPress(value+1)}>
                <FontAwesomeIcon icon={faPlus} size={12}></FontAwesomeIcon>
            </Pressable>
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
        // shadowColor: '#0002',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,  
        // elevation: 5
    },

    button: {
        // backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        // shadowColor: '#0002',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,  
        // elevation: 5
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