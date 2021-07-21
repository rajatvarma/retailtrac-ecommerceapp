import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import GeneralButton from '../components/Button'
import Input from '../components/TextInput'
import querystring from 'querystring'
import { useDispatch } from 'react-redux'
import { setUser } from '../actions/userAction'
import FormErrorMessage from '../components/FormErrorMessage'

const LoginPage = ({navigation}) => {

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const [loginError, SetLoginError] = useState(false)
    const [loginErrorMessage, setErrorMessage] = useState('')

    const validatePhone = () => {
        if (phone.length != 10) {
            return true
        }
        return false
    }
    
    const loginHandler = () => {
        SetLoginError(false)
        axios.post('http://pvanam.retailtrac360.com:8080/MergedWebservicesFMCG/rest/EcomCustomer/ecomLoginCheck', querystring.stringify({
            'username': phone,
            'password': password
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((r) => {
            if (r.data.user) {
                dispatch(setUser(r.data.user))
            }
            else if (r.data.erorr || r.data.error) {
                SetLoginError(true)
                setErrorMessage(r.data.erorr)
            }
        }).catch(e => console.log(e))
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={LoginStyles.pageContainer}>
                <Text style={LoginStyles.mainHeading}>Login</Text>
                <View style={LoginStyles.formContainer}>
                    {loginError && <FormErrorMessage message={loginErrorMessage} />}
                    <View style={LoginStyles.fieldContainer}>
                        <Input placeholder="Phone number" state={phone} setState={setPhone} type="phone" validate={validatePhone}/>
                    </View>
                    <View style={LoginStyles.fieldContainer}>
                        <Input placeholder="Password" state={password} setState={setPassword} type="password"/>
                    </View>
                </View>
                <GeneralButton text="Login" onPress={loginHandler}/>
                <View style={{marginVertical: 50, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: '400'}}>Don't have an account? </Text>
                    <Pressable onPress={() => {navigation.navigate('SignUp')}}>
                        <Text style={{fontSize: 16, fontWeight: '600', textDecorationLine: 'underline'}}>Register</Text>
                    </Pressable>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const LoginStyles = StyleSheet.create({
    pageContainer: {
        paddingTop: '10%',
        paddingHorizontal: '5%',
        height: '100%'
    },

    mainHeading: {
        fontSize: 42,
        fontWeight: 'bold'
    },

    formContainer: {
        marginVertical: '10%',
    },

    fieldContainer: {
        marginVertical: '2%'
    },

    fieldHeading: {
        marginBottom: '2%',
        fontSize: 18, 
        fontWeight: '500'
    },

    button: {
        marginVertical: 20,
        borderWidth: 2,
        padding: 5,
    },

    buttonText: {
        fontSize: 18,
        textAlign: 'center'
    }

})

export default LoginPage