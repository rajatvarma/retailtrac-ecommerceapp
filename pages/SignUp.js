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
                    <View style={{marginVertical: 15, flexDirection: 'row'}}>
                        <Text style={{fontSize: 16, fontWeight: '400'}}>Already have an account? </Text>
                        <Pressable onPress={() => {navigation.navigate('Login')}}>
                            <Text style={{fontSize: 16, fontWeight: '600', textDecorationLine: 'underline'}}>Log In</Text>
                        </Pressable>
                    </View>
                    
                    {formError && <FormErrorMessage message={formErrorMessage} />}
                    
                    {!isOTPSent &&
                    <View style={styles.formContainer}>
                        <View style={styles.fieldContainer}>
                            <Input placeholder="Enter your name" state={name} setState={setName} type='name'/>
                        </View>                
                        <View style={styles.fieldContainer}>
                            <Input placeholder="Enter your email address" state={email} setState={setEmail} type='email' validate={verifyEmail}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Input placeholder="Enter your PIN code" atate={pincode} setState={setPincode} type='pincode'/>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Input placeholder="Enter your phone number" state={phone} setState={setPhone} type='phone' validate={verifyPhoneNumber}/>
                        </View>
                        <View style={styles.fieldContainer}>
                            {/* {This has been left empty to make the design look better} */}
                        </View>
                        <GeneralButton text="Next" onPress={getOTPHandler}/>
                    </View>
                    }
                    
                    {isOTPSent && !isOTPVerified && 
                        <View style={styles.formContainer}>
                            <Input placeholder="Enter the OTP you just received" state={otp} setState={setOTP} type='OTP' validate={verifyPhoneNumber}/>
                            <GeneralButton text="Next" onPress={verifyOTPHandler}/>
                        </View>
                    }
                    
                    {!isAddressEntered && isOTPVerified &&
                        <View style={styles.formContainer}>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeading}>Address Line 1</Text>
                                <Input placeholder="Enter your building name & apartment no. or house no." state={address} setState={setAddress} type='address'/>
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeading}>Area</Text>
                                <Input placeholder="Enter the area you live in" state={area} setState={setArea} type='area'/>
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldHeading}>City</Text>
                                <Input placeholder="Enter your city" state={city} setState={setCity} type='city'/>                
                            </View>
                            <View style={styles.fieldContainer}>
                                {/* {This has been left empty to make the design look better} */}
                            </View>
                            <GeneralButton text="Submit" onPress={() => setAddressEntered(true)} />
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
                            <GeneralButton text="Submit" onPress={registerUserHandler} />
                        </>
                    }
                    
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        marginHorizontal: '3%',
        marginTop: '5%'
    },

    mainHeading: {
        fontSize: 42,
        fontWeight: 'bold',
    },

    fieldContainer: {
        marginVertical: '3%'
    },

    fieldHeading: {
        marginBottom: '2%',
        fontSize: 18, 
        fontWeight: '500'
    },
    container: {
        flex: 1
    },
    
    inner: {
        padding: '5%',
        flex: 1,
        justifyContent: "center"
    },

    formContainer: {
        marginVertical: '3%',
    }
})

export default SignUpPage



// {/* <View style={styles.fieldContainer}>
//                     <Text style={styles.fieldHeading}>Phone Number</Text>
//                     <Input placeholder="Enter your phone number" submit={submit} type='phone' validate={verifyPhoneNumber}/>
//                 </View>
//                 <View style={styles.fieldContainer}>
//                     <Text style={styles.fieldHeading}>Address Line 1</Text>
//                     <Input placeholder="Enter your building name & apartment no. or house no." submit={submit} type='address'/>
//                 </View>
//                 <View style={styles.fieldContainer}>
//                     <Text style={styles.fieldHeading}>Area</Text>
//                     <Input placeholder="Enter the area you live in" submit={submit} type='area'/>
//                 </View>
//                 <View style={styles.fieldContainer}>
//                     <Text style={styles.fieldHeading}>City</Text>
//                     <Input placeholder="Enter your city" submit={submit} type='city'/>                
//                 </View>
//                 <View style={styles.fieldContainer}>
//                     <Text style={styles.fieldHeading}>PIN Code</Text>
//                     <Input placeholder="Enter your PIN code" submit={submit} type='pincode'/>
//                 </View>
// </View>                 */}