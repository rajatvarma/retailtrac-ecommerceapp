import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert } from 'react-native'
import GeneralButton from '../components/Button'
import Input from '../components/TextInput'
import querystring from 'querystring'
import { useDispatch } from 'react-redux'
import { setUser } from '../actions/userAction'
import FormErrorMessage from '../components/FormErrorMessage'
import { getForgotPasswordOTP, loginURL, resetPasswordURL } from '../apiCalls'
import { saveUserData } from '../userStorage'

const LoginPage = ({navigation}) => {

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()

    const [loginError, SetLoginError] = useState(false)
    const [loginErrorMessage, setErrorMessage] = useState('')

    const [forgotPassword, setForgotPassword] = useState(false)

    const [otpSent, setOtpSent] = useState(false)

    const [otp, setOTP] = useState('')
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
        }).catch((e) => {
            SetLoginError(true)
            setErrorMessage(e)
        })
    }
    
    const loginHandler = async () => {
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
            'otpmsg': otp,
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

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.pageContainer}>
                    
                    <Text style={styles.mainHeading}>Login</Text>
                    
                    {forgotPassword && !otpVerified &&
                        <View style={styles.formContainer}>
                            <View style={styles.fieldContainer}>
                                <Input placeholder="Phone number" state={phone} setState={setPhone} type="phone" validate={validatePhone}/>
                                {otpSent && 
                                    <Input placeholder="Enter the OTP you just received" state={otp} setState={setOTP} type='OTP' />
                                }
                            </View>
                            <GeneralButton text="Confirm" onPress={!otpSent ? forgotPasswordOTPHandler : () => {
                                if (response == otp) {
                                    setOTPVerified(true)
                                }
                            }}/>
                        </View>
                    }

                    {!forgotPassword && 
                        <>
                            <View style={styles.formContainer}>
                                {loginError && <FormErrorMessage message={loginErrorMessage} />}
                                <View style={styles.fieldContainer}>
                                    <Input placeholder="Phone number" state={phone} setState={setPhone} type="phone" validate={validatePhone}/>
                                </View>
                                <View style={styles.fieldContainer}>
                                    <Input placeholder="Password" state={password} setState={setPassword} type="password"/>
                                </View>
                            </View>
                            <GeneralButton text="Login" onPress={loginHandler}/>
                        </>
                    }  

                    {
                        forgotPassword && otpVerified && 
                        <View style={styles.formContainer}>
                            <View style={styles.fieldContainer}>
                                <Input placeholder="Enter new password" state={password} setState={setPassword} type='password'/>
                            </View>                
                            <View style={styles.fieldContainer}>
                                {/* {This has been left empty to make the design look better} */}
                            </View>
                            <GeneralButton text="Next" onPress={changePasswordHandler}/>
                        </View>
                    }

                    {!forgotPassword && 
                        <Pressable onPress={()=>{setForgotPassword(true)}}>
                            <Text style={{marginVertical: '5%', textDecorationLine: 'underline'}}>Forgot Password?</Text>
                        </Pressable>
                    }

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

const styles = StyleSheet.create({
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