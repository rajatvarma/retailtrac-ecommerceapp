import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Option = ({text, redirectTo, navigation, onPress, icon}) => {
    return(
        <Pressable style={styles.option} onPress={
            redirectTo ?
            () => navigation.navigate(redirectTo)
            :
            () => onPress()
        }>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {icon && <FontAwesomeIcon icon={icon} size={24} style={{marginRight: 15}} color='#37474F' />}
                <Text style={styles.optionText}>{text}</Text>
            </View>
            <FontAwesomeIcon icon={faAngleRight} size={24} color="#FF595F" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D0D0D0',
        justifyContent: 'space-between',
        paddingVertical: '7.5%',
        paddingHorizontal: '5%',
        alignItems: 'center'
    },

    optionText: {
        textAlign: 'left',
        fontSize: 20,
    }
})

export default Option