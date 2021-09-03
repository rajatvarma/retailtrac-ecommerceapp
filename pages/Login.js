import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert, Image, ImageBackground } from 'react-native'
import GeneralButton from '../components/Button'
import Input from '../components/TextInput'
import { useDispatch } from 'react-redux'
import querystring from 'querystring'
import { setUser } from '../actions/userAction'
import FormErrorMessage from '../components/FormErrorMessage'
import { loginURL } from '../apiCalls'
import { saveUserData } from '../userStorage'
import { phoneValidation } from '../formValidations'

const LoginPage = ({navigation}) => {

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const [loginError, SetLoginError] = useState(false)
    const [loginErrorMessage, setErrorMessage] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)


    const loginHandler = async () => {
        setButtonLoading(true)
        SetLoginError(false)
        axios.post(loginURL, querystring.stringify({
            'username': phone,
            'password': password
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((r) => {
            if (r.data.user) {
                try {
                    saveUserData('phone', phone)
                    saveUserData('password', password)
                } catch (error) {
                }
                dispatch(setUser(r.data.user))
                setButtonLoading(false)
            }
            else if (r.data.erorr || r.data.error) {
                setButtonLoading(false)
                SetLoginError(true)
                setErrorMessage(r.data.erorr)
            }
        }).catch(e => {console.log(e)})
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ImageBackground source={require('../assets/images/login/Background.png')} style={{justifyContent: "center"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.pageContainer}>
                    
                    <View style={styles.imagesContainer}></View>

                    <View style={styles.formContainer}>    
                                {loginError && <FormErrorMessage message={loginErrorMessage} />}
                                <View style={styles.fieldContainer}>
                                    <Input placeholder="Phone number" state={phone} setState={setPhone} type="phone" validate={phoneValidation(phone)} styleType="primary" />
                                </View>
                                <View style={styles.fieldContainer}>
                                    <Input placeholder="Password" state={password} setState={setPassword} type="password" styleType="primary" />
                                </View>
                                <View style={styles.fieldContainer}>
                                    {/* {This has been left empty to make the design look better} */}
                                </View>
                                <GeneralButton text="Login" onPress={loginHandler} styleType="primary" />
                        <Pressable onPress={()=>{navigation.navigate('OTP')}}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </Pressable>
                    </View>
                    
                    <View style={styles.bottomLabelContainer}>
                        <Text style={styles.bottomLabelText}>Don't have an account? </Text>
                        <Pressable onPress={() => {navigation.navigate('SignUp')}}>
                            <Text style={[styles.bottomLabelText,  {fontFamily: 'Epilogue_700Bold'}]}>Register here</Text>
                        </Pressable>
                    </View>

                </View>
            </TouchableWithoutFeedback>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        height: '100%',
        justifyContent: 'space-between',
    },

    imagesContainer: {
        height: '40%',
        paddingVertical: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    }
    ,
    
    formContainer: {
        paddingHorizontal: '10%',
    },

    fieldContainer: {
        marginVertical: '2%'
    },

    bottomLabelContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderTopWidth: 2,
        borderTopColor: 'white',
        width: '100%',
        paddingVertical: 20,
    },

    bottomLabelText: {
        fontFamily: 'Epilogue_400Regular',
        fontSize: 16,
        color: 'white',
        fontWeight: '400'
    },

    forgotPassword: {
        marginVertical: '10%',
        color: 'white', 
        fontWeight: '700', 
        fontSize: 16,
        alignSelf: 'flex-end',
        fontFamily: 'Epilogue_700Bold'
    }


})

export default LoginPage