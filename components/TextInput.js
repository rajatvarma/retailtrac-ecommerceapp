import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import TextInputError from './TextInputError'

const Input = ({placeholder, state, setState, type, validate, styleType, editable}) => {
    var styles = styles_secondary
    
    const [isPasswordVisible, setPasswordVisible] = useState(false)

    if (styleType == 'primary') {
        styles = styles_primary
    } else if (styleType == 'secondary') {
        styles = styles_secondary
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>{placeholder}</Text>
            <View style={styles.row}>
                <TextInput  
                    value={state}
                    secureTextEntry={type==="password" && !isPasswordVisible}
                    onChangeText={(val) => {setState(val)}}
                    style={styles.input}
                    keyboardType={type=='phone' || type=='OTP' || type=='pincode' ? 'numeric' : 'default'}
                    editable={editable}
                />
                {type==="password" && 
                    <Pressable onPress={() => setPasswordVisible(isPasswordVisible => !isPasswordVisible)}>
                        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                    </Pressable>
                }
                <TextInputError display={type == 'phone' || type == 'email' ? validate && state.length : validate}/>
            </View>
        </View>
    )
}

const styles_primary = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFCFCF',
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderRadius: 10,
    },

    input: {
        width: '80%',
        paddingVertical: 5,
        fontFamily: 'Epilogue_500Medium'
    },

    label: {
        fontSize: 11,
        color: '#373737',
        fontWeight: '600',
        paddingVertical: 5,
        fontFamily: 'Epilogue_600SemiBold'

    },
    
    row: {
        width: '100%',
        flexDirection: 'row',   
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

const styles_secondary = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#b5b5b5',
        borderRadius: 10,
    },

    input: {
        width: '80%',
        paddingVertical: 5,
        fontSize: 16,
        fontFamily: 'Epilogue_400Regular'
    },

    label: {
        fontSize: 11,
        color: '#373737',
        paddingVertical: 2,
        marginTop: 5,
        fontFamily: 'Epilogue_600SemiBold'

    },
    
    row: {
        width: '100%',
        flexDirection: 'row',   
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default Input