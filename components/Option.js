import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const Option = ({text, redirectTo, navigation, onPress}) => {
    return(
        <Pressable style={styles.option} onPress={
            redirectTo ?
            () => navigation.navigate(redirectTo)
            :
            () => onPress()
        }>
            <Text style={styles.optionText}>{text}</Text>
            <FontAwesomeIcon icon={faAngleRight} size={20}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    option: {
        marginVertical: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        padding: 10,
        alignItems: 'center'
    },

    optionText: {
        fontSize: 20,
        fontWeight: '700'
    }
})

export default Option