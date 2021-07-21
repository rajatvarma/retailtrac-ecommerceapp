import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'

const QuantityControl = ({value, onPress}) => {
    return(
        <View style={styles.wrapper}>
            <Pressable style={styles.button} onPress={() => onPress(value-1)}>
                <FontAwesomeIcon icon={faMinus} size={8}></FontAwesomeIcon>
            </Pressable>
            <Text style={styles.text}>{value}</Text>
            <Pressable style={styles.button} onPress={() => onPress(value+1)}>
                <FontAwesomeIcon icon={faPlus} size={8}></FontAwesomeIcon>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#F5F6FD',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        borderRadius: 10,
        shadowColor: '#0002',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },

    button: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        shadowColor: '#0002',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },

    text: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: 'center',
        height: '100%',
    }
})

export default QuantityControl