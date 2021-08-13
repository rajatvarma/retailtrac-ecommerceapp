import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { getForgotPasswordOTP, resetPasswordURL } from '../apiCalls';
import querystring from 'querystring'
import GeneralButton from '../components/Button';
import Input from '../components/TextInput';

export const OtpVerificationPage = ({route, navigation}) => {

    const inputs = Array(6).fill()

    const [otpSent, setOtpSent] = useState(false)
    const [response, setResponse] = useState('')
    const [otpVerified, setOTPVerified] = useState(false)

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOTP] = useState('')

    console.log(otp)

    const otpTextInputs = []

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
            console.log(e);
            // SetLoginError(true)
            // setErrorMessage(e)
        })
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
                            navigation.navigate('Login')
                        }
                    }
                ])
            }
        })
    }

    return(
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "height" : "padding"}>
        <View style={styles.pageContainer}>
            <View style={styles.imageContainer}>
                {!otpSent ?
                    <Image source={require('../assets/images/otp_page/Group_475.png')}/> 
                    :
                    <Image source={require('../assets/images/otp_page/Group.png')} />
                }
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {otpSent ? 
                <View>
                    <Text style={styles.headingText}>OTP Verification</Text>
                    <Text style={styles.text}>Enter the OTP sent to <Text style={{
                        fontFamily: 'Epilogue_700Bold',
                        color: 'black'
                    }}>{phone}</Text></Text>
                    <View style={styles.inputContainer}>
                        {Array.from(inputs.keys()).map((i) => (
                            <TextInput 
                                style={styles.input} 
                                maxLength={1} 
                                keyboardType='numeric'
                                onChangeText={(value) => {
                                    if (value) {
                                        setOTP(otp => otp+value)
                                        if(i < otpTextInputs.length-1) {
                                            otpTextInputs[i+1].focus()
                                        }
                                        if(i == otpTextInputs.length) {
                                            Keyboard.dismiss
                                        }
                                    } else {
                                        setOTP(otp => otp.slice(0, otp.length-1))
                                        if(i !== 0) {
                                            otpTextInputs[i-1].focus()
                                        }
                                    }
                                }}
                                key={i}
                                ref={ref => otpTextInputs[i] = ref}
                            />
                        ))}
                    </View>
                    <View style={{
                        flexDirection: 'row', 
                        marginVertical: '5%', 
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.text}>Didn't receive the OTP?  </Text>
                        <Pressable onPress={() => {}}>
                            <Text style={styles.highlightText}>Resend OTP</Text>
                        </Pressable>
                    </View>
                    <View style={{marginHorizontal: '10%', marginTop: '5%'}}>
                        <GeneralButton styleType="secondary" text="Confirm" onPress={() => {
                            setOTPVerified(true)
                            setOtpSent(false)
                            }} />
                    </View>
                </View>
                :
                <View>
                    <Text style={styles.headingText}>{otpVerified ? 'Enter new Password' : 'Enter your mobile number'}</Text>
                    <View style={styles.inputContainer}>
                        {!otpVerified ? 
                            <Input styleType="secondary" state={phone} setState={setPhone} placeholder='Your mobile number' />
                            :
                            <Input styleType="secondary" state={password} setState={setPassword} placeholder='New Password' />
                        }
                        
                    </View>
                    <GeneralButton styleType="secondary" onPress={otpVerified ? changePasswordHandler : forgotPasswordOTPHandler} text="Submit" />
                </View>
            }
            </TouchableWithoutFeedback>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingHorizontal: '5%',
        paddingVertical: '10%',
        backgroundColor: 'white',
        height: '100%'
    },

    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: '5%',
    },

    headingText: {
        fontSize: 18,
        fontFamily: 'Epilogue_500Medium',
        textAlign: 'center',
        marginVertical: '5%'
    },

    text: {
        fontSize: 16,
        fontFamily: 'Epilogue_500Medium',
        color: '#525252',
        textAlign: 'center',
    },

    highlightText: {
        color: '#FF595F',
        fontSize: 18,
        fontFamily: 'Epilogue_700Bold',
        textAlign: 'center'
    },

    inputContainer: {
        marginVertical: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: '5%'
    },

    input: {
        borderBottomWidth: 2,
        fontFamily: 'Epilogue_400Regular',
        borderBottomColor: 'black',
        padding: 10,
        marginHorizontal: '2%',
        justifyContent: 'center',
        fontSize: 22,
        fontWeight: '700'
    }
})

export default OtpVerificationPage