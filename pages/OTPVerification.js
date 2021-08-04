import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import GeneralButton from '../components/Button';

export const OtpVerificationPage = ({route, navigation}) => {

    const inputs = Array(6).fill()

    const [otp, setOTP] = useState('')

    const {phone, serverOTP} = route.params

    console.log(otp)

    const otpTextInputs = []

    const verifyOTP = () => {

    }

    return(
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "height" : "padding"}>
        <View style={styles.pageConatiner}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../assets/images/otp_page/Group.png')}
                />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        console.log(serverOTP)
                        if(otp == serverOTP) {
                            
                            navigation.navigate('Login', {otp: otp})
                        }
                    }} />
                </View>
            </View>
            </TouchableWithoutFeedback>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    pageConatiner: {
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