import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import TextInputError from './TextInputError'

const Input = ({placeholder, state, setState, type, validate}) => {
    const [error, setError] = useState(false)

    return(
        <View style={styles.container}>
            <Text style={styles.label}>{placeholder}</Text>
            <View style={styles.row}>
                <TextInput  
                    value={state}
                    onChangeText={(val) => {setState(val)}}
                    style={styles.input}
                    keyboardType={type=='phone' || type=='OTP' || type=='pincode' ? 'numeric' : 'default'}
                    onEndEditing={validate ? () => setError(validate()) : null}
                />
                
                <TextInputError display={error}/>
            </View>
            {/* <Text style={styles.label}>Hello</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F4F6F8',
        paddingVertical: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5
    },

    input: {
        width: '80%',
        paddingVertical: 5
    },

    label: {
        fontSize: 12,
        color: '#919293',
        fontWeight: '600',
        paddingVertical: 2
    },
    
    row: {
        width: '100%',
        flexDirection: 'row',   
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default Input