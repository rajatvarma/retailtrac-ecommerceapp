import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import GeneralButton from '../components/Button'
import Input from '../components/TextInput'
import axios from 'axios'
import querystring from 'querystring'
import FormErrorMessage from '../components/FormErrorMessage'
import { registerOTPURL, userRegistrationURL } from '../apiCalls'


const SignUpPage = ({navigation}) => {
    const [isOTPSent, setOTPSent] = useState(false)
    const [isOTPVerified, setOTPVerified] = useState(false)
    const [response, setResponse] = useState({})
    const [isAddressEntered, setAddressEntered] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState("")
    const [pincode, setPincode] = useState("")
    const [otp, setOTP] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [area, setArea]= useState("")
    const [password, setPassword] = useState("")

    const [formError, setFormError] = useState(false)
    const [formErrorMessage, setFormErrorMessage] = useState('')
    
    const verifyEmail = (value) => {
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        return filter.test(value)
    }

    const verifyPhoneNumber = () => {
        if (phone.length != 10) {
            return true
        }
        return false
    }

    const getOTPHandler = async () => { 
        console.log(name, email, phone, pincode)
        const data = await axios.post(registerOTPURL, querystring.stringify({
            'username': name,
            'email': email,
            'mobileNo': phone,
            'pincode': pincode
            }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            }).then(r => {
                if (r.data.includes('CI')) {
                    setResponse({customer_id: r.data.split(':')[0], otp: r.data.split(':')[1]})
                    setOTPSent(true)
                } else {
                    setFormError(true)
                    setFormErrorMessage(r.data)
                }
        }).catch(e => {
            console.log(e)
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
        console.log('Start')
        var data = querystring.stringify({
            'username': name,
            'password': password,
            'email': email,
            'otpmsg': otp,
            'otpSent': response.otp,
            'mobileNo': phone,
            'area': area,
            'city ': city,
            'location': '',
            'customer_id': response.customer_id,
            'pincode': pincode 
          });
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
              console.log(response.data)
            if(response.data == true) {
                console.log(response.data)
                navigation.navigate('Login')   
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.mainHeading}>Sign Up</Text>
                    
                    {formError && <FormErrorMessage message={formErrorMessage} />}
                    
                    {!isOTPSent &&
                    <View style={styles.formContainer}>
                        <View style={styles.fieldContainer}>
                            <Input placeholder="Enter your name" state={name} setState={setName} type='name' styleType="secondary" />
                        </View>                
                        <View style={styles.fieldContainer}>
                            <Input placeholder="Enter your email address" state={email} setState={setEmail} type='email' validate={verifyEmail} styleType="secondary" />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Input placeholder="Enter your PIN code" atate={pincode} setState={setPincode} type='pincode' styleType="secondary" />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Input placeholder="Enter your phone number" state={phone} setState={setPhone} type='phone' validate={verifyPhoneNumber} styleType="secondary" />
                        </View>
                        <View style={styles.fieldContainer}>
                            {/* {This has been left empty to make the design look better} */}
                        </View>
                        <GeneralButton text="Next" onPress={getOTPHandler} styleType="secondary" />
                    </View>
                    }
                    
                    {isOTPSent && !isOTPVerified && 
                        <View style={styles.formContainer}>
                            <Input placeholder="Enter the OTP you just received" state={otp} setState={setOTP} type='OTP' validate={verifyPhoneNumber} styleType="secondary" />
                            <GeneralButton text="Next" onPress={verifyOTPHandler} styleType="secondary" />
                        </View>
                    }
                    
                    {!isAddressEntered && isOTPVerified &&
                        <View style={styles.formContainer}>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeading}>Address Line 1</Text>
                                <Input placeholder="Enter your building name & apartment no. or house no." state={address} setState={setAddress} type='address' styleType="secondary" />
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeading}>Area</Text>
                                <Input placeholder="Enter the area you live in" state={area} setState={setArea} type='area' styleType="secondary" />
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeading}>City</Text>
                                <Input placeholder="Enter your city" state={city} setState={setCity} type='city' styleType="secondary" />                
                            </View>
                            <View style={styles.fieldContainer}>
                                {/* {This has been left empty to make the design look better} */}
                            </View>
                            <GeneralButton text="Submit" onPress={() => setAddressEntered(true)} styleType="secondary" />
                        </View>
                    }    
                    
                    {isAddressEntered &&
                        <>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeading}>Set a password</Text>
                                <Input placeholder="Choose a strong password" state={password} setState={setPassword} type='password'/>                
                            </View>
                            <View style={styles.fieldContainer}>
                                {/* {This has been left empty to make the design look better} */}
                            </View>
                            <GeneralButton text="Submit" onPress={registerUserHandler} styleType="secondary"/>
                        </>
                    }
                    
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    mainHeading: {
        fontSize: 42,
        marginTop: '10%',
        // fontFamily: 'Epilogue_700Bold',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },

    fieldContainer: {
        marginVertical: '3%'
    },

    container: {
        flex: 1
    },
    
    inner: {
        flex: 1,

        justifyContent: 'space-between',
        backgroundColor: '#FF595F'
    },

    formContainer: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: '15%',
        elevation: 20,
        shadowColor: '#f11212',
        shadowOffset: {width: 0, height: -10},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        paddingHorizontal: '10%',
        backgroundColor: 'white'
    }
})

export default SignUpPage