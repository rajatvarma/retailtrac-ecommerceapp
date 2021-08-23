import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import TextInputError from './TextInputError'

const Input = ({placeholder, state, setState, type, validate, styleType}) => {
    const [error, setError] = useState(false)

    var styles = styles_secondary
    
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
                    secureTextEntry={type=="password"}
                    onChangeText={(val) => {setState(val)}}
                    style={styles.input}
                    keyboardType={type=='phone' || type=='OTP' || type=='pincode' ? 'numeric' : 'default'}
                />
                
                <TextInputError display={validate && state.length}/>
            </View>
            {/* <Text style={styles.label}>Hello</Text> */}
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
        marginVertical: 5
    },

    input: {
        width: '80%',
        paddingVertical: 5
    },

    label: {
        fontSize: 11,
        color: '#373737',
        fontWeight: '600',
        paddingVertical: 5,
        fontFamily: 'Epilogue_500Medium'

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
        marginVertical: 5
    },

    input: {
        width: '80%',
        paddingVertical: 5,
        fontSize: 16
    },

    label: {
        fontSize: 11,
        color: '#373737',
        fontWeight: '600',
        paddingVertical: 2,
        marginTop: 5,
        fontFamily: 'Epilogue_500Medium'

    },
    
    row: {
        width: '100%',
        flexDirection: 'row',   
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default Input