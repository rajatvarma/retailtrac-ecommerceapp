import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert, Image, ImageBackground } from 'react-native'
import GeneralButton from '../components/Button'
import Input from '../components/TextInput'
import querystring from 'querystring'
import { useDispatch } from 'react-redux'
import { setUser } from '../actions/userAction'
import FormErrorMessage from '../components/FormErrorMessage'
import { getForgotPasswordOTP, loginURL, resetPasswordURL } from '../apiCalls'
import { saveUserData } from '../userStorage'

const LoginPage = ({navigation, route}) => {

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    // const [email, setEmail] = useState("")
    const dispatch = useDispatch()

    const [loginError, SetLoginError] = useState(false)
    const [loginErrorMessage, setErrorMessage] = useState('')

    const [forgotPassword, setForgotPassword] = useState(false)

    const [otpSent, setOtpSent] = useState(false)

    const [response, setResponse] = useState('')
    const [otpVerified, setOTPVerified] = useState(false)

    const validatePhone = () => {
        if (phone.length != 10) {
            return true
        }
        return false
    }

    const forgotPasswordOTPHandler = () => {
        axios.post(getForgotPasswordOTP, querystring.stringify({
            'email': '',
            'mob_num': phone
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(r => {
            console.log(r.data)
            setResponse(r.data)
            setOtpSent(true)
            navigation.navigate('OTP', {serverOTP: r.data, phone: phone})
            
        }).catch((e) => {
            SetLoginError(true)
            setErrorMessage(e)
        })
    }
    
    const loginHandler = async () => {
        console.log('login')
        SetLoginError(false)
        axios.post(loginURL, querystring.stringify({
            'username': phone,
            'password': password
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((r) => {
            console.log(r.data)
            if (r.data.user) {
                try {
                    saveUserData('phone', phone)
                    saveUserData('password', password)
                } catch (error) {
                    console.log(error)
                }
                dispatch(setUser(r.data.user))
            }
            else if (r.data.erorr || r.data.error) {
                SetLoginError(true)
                setErrorMessage(r.data.erorr)
            }
        }).catch(e => console.log(e))
    }

    const changePasswordHandler = () => {
        axios.post(resetPasswordURL, querystring.stringify({
            'otpmsg': route.params.otp,
            'newPwd': password,
            'mobileNum': phone
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.status == '200') {
                Alert.alert('Attention', response.data, [
                    {
                        text: 'Ok',
                        onPress: () => {
                            setForgotPassword(false)
                        }
                    }
                ])
            }
        })
    }

    if(route.params && !otpVerified) {
        setOTPVerified(true)
    }   

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ImageBackground source={require('../assets/images/login/Background.png')} style={{justifyContent: "center"}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.pageContainer}>
                    
                    <View style={styles.imagesContainer}></View>

                    <View style={styles.formContainer}>
                        {forgotPassword && !otpVerified &&
                            <>
                                <View style={styles.fieldContainer}>
                                    <Input placeholder="Phone number" state={phone} setState={setPhone} type="phone" validate={validatePhone} styleType="primary" />
                                </View>
                                <GeneralButton 
                                    text="Confirm" 
                                    styleType="primary"
                                    onPress={() => {
                                        forgotPasswordOTPHandler()
                                    }}
                                />
                            </>
                        }

                        {!forgotPassword && 
                            <>
                                {loginError && <FormErrorMessage message={loginErrorMessage} />}
                                <View style={styles.fieldContainer}>
                                    <Input placeholder="Phone number" state={phone} setState={setPhone} type="phone" validate={validatePhone} styleType="primary" />
                                </View>
                                <View style={styles.fieldContainer}>
                                    <Input placeholder="Password" state={password} setState={setPassword} type="password" styleType="primary" />
                                </View>
                                <View style={styles.fieldContainer}>
                                    {/* {This has been left empty to make the design look better} */}
                                </View>
                                <GeneralButton text="Login" onPress={loginHandler} styleType="primary" />
                            </>
                        }  

                        {
                            forgotPassword && otpVerified && 
                            <>
                                <View style={styles.fieldContainer}>
                                    <Input placeholder="Enter new password" state={password} setState={setPassword} 
                                    type='password' styleType="primary" />
                                </View>                
                                <GeneralButton text="Next" onPress={changePasswordHandler} styleType="primary" />
                            </>
                        }

                        {!forgotPassword && 
                            <Pressable onPress={()=>{setForgotPassword(true)}}>
                                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            </Pressable>
                        }

                        {forgotPassword && 
                            <Pressable onPress={()=>{setForgotPassword(false)}}>
                                <Text style={styles.forgotPassword}>Back</Text>
                            </Pressable>
                        }

                    </View>
                    
                    <View style={styles.bottomLabelContainer}>
                    {!forgotPassword &&
                        <>
                        <Text style={styles.bottomLabelText}>Don't have an account? </Text>
                        <Pressable onPress={() => {navigation.navigate('SignUp')}}>
                            <Text style={[styles.bottomLabelText,  {fontFamily: 'Epilogue_700Bold'}]}>Register here</Text>
                        </Pressable>
                        </>
                    }   
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