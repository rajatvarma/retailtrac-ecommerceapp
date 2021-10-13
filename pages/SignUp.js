import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView, Alert } from 'react-native'
import GeneralButton from '../components/Button'
import Input from '../components/TextInput'
import axios from 'axios'
import querystring from 'querystring'
import FormErrorMessage from '../components/FormErrorMessage'
import { registerOTPURL, userRegistrationURL } from '../apiCalls'
import { emailValidation, phoneValidation } from '../formValidations'
import crashlytics from '@react-native-firebase/crashlytics'
import { BannerHeader } from '../components/Header'
import { useSelector } from 'react-redux'


const SignUpPage = ({navigation}) => {
    const [isOTPSent, setOTPSent] = useState(false)
    const [isOTPVerified, setOTPVerified] = useState(false)
    const [response, setResponse] = useState({})

    const [phone, setPhone] = useState("")
    const [otp, setOTP] = useState("")
    const [password, setPassword] = useState("")

    const [formError, setFormError] = useState(false)
    const [formErrorMessage, setFormErrorMessage] = useState('')

    const [buttonLoading, setButtonLoading] = useState(false)

    const {cart} = useSelector(state => state)

    const getOTPHandler = async () => { 
        setButtonLoading(true)
        const data = await axios.post(registerOTPURL, querystring.stringify({
            'mobileNo': phone,
            }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            }).then(r => {
                console.log(r.data[0]["Comments"])
                if (r.data){
                    if(r.data[0]["Status"]){
                        setResponse({customer_id: r.data[0]["Comments"].split(':')[0], otp: r.data[0]["Comments"].split(':')[1]})
                        setOTPSent(true)
                        crashlytics().log(r.data[0])
                    }
                    console.log(response)
                } else {
                    setFormError(true)
                    setFormErrorMessage(r.data[0]["Comments"])
                }
                setButtonLoading(false)
        }).catch(e => {
            setButtonLoading(false)
            crashlytics().log(e)
            setFormError(true)
            setFormErrorMessage('There was an error. Please try again later.')
        })
        }   

    const verifyOTPHandler = () => {
        if (response.otp === otp) {
            setOTPVerified(true)
        }
    }

    const registerUserHandler = async () => {
        setButtonLoading(true)
        var data = querystring.stringify({
            'password': password,
            'otpmsg': otp,
            'otpSent': response.otp,
            'mobileNo': phone,
            'customer_id': response.customer_id,
          });

          crashlytics().log(data)
          var config = {
            method: 'post',
            url: userRegistrationURL,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
                setButtonLoading(false)
            if(response.data == true) {
                if (cart.length) {
                    navigation.replace('Checkout')
                }
                else {
                    navigation.navigate('Login')
                }
            }
          })
          .catch(function (error) {
            crashlytics.log(error)
          });
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1}}>
            <SafeAreaView style={styles.container}>
                <BannerHeader title="Sign Up" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        {formError && <FormErrorMessage message={formErrorMessage} />}
                        <View style={styles.formContainer}>
                        {!isOTPSent &&
                            <>
                            <View style={styles.fieldContainer}>
                                <Input placeholder="Enter your phone number" state={phone} setState={setPhone} type='phone' validate={phoneValidation(phone)} styleType="secondary" />
                            </View>
                            <View style={styles.fieldContainer}>
                                {/* <Input placeholder="Enter your phone number" state={phone} setState={setPhone} type='phone' validate={phoneValidation(phone)} styleType="secondary" /> */}
                            </View>
                            <GeneralButton text="Next" onPress={getOTPHandler} styleType="secondary" isLoading={buttonLoading}/>
                            </>
                        }
                        {isOTPSent && !isOTPVerified && 
                            <>
                                <View style={styles.fieldContainer}>
                                    <Input placeholder="Enter the OTP you just received" state={otp} setState={setOTP} type='OTP' styleType="secondary" />
                                </View>
                                <GeneralButton text="Next" onPress={verifyOTPHandler} styleType="secondary" isLoading={buttonLoading} />
                            </>
                        }
                        {isOTPVerified &&
                        <>
                            <View style={styles.fieldContainer}>
                                {/* <Text style={styles.fieldHeading}>Set a password</Text> */}
                                <Input placeholder="Choose a strong password" state={password} setState={setPassword} type="password"/>
                            </View>
                            <View style={styles.fieldContainer}>
                                {/* {This has been left empty to make the design look better} */}
                            </View>
                            <GeneralButton text="Submit" onPress={registerUserHandler} styleType="secondary" isLoading={buttonLoading} />
                        </>
                        }                                  
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    fieldContainer: {
        marginVertical: '5%'
    },

    container: {
        flex: 1,
    },
    
    inner: {
        flex: 1,
        backgroundColor: '#FF595F',
        justifyContent: 'flex-end',
    },

    formContainer: {
        borderTopLeftRadius: 50,
        height: '100%',
        justifyContent: 'center',
        borderTopRightRadius: 50,
        paddingVertical: '5%',
        paddingHorizontal: '10%',
        backgroundColor: 'white'
    }
})

export default SignUpPage