import axios from 'axios'
import QueryString from 'qs'
import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../actions/userAction'
import { editAccountURL } from '../apiCalls'
import GeneralButton from '../components/Button'
import { BannerHeader } from '../components/Header'
import Input from '../components/TextInput'
import { emailValidation, phoneValidation } from '../formValidations'

const EditAccountPage = ({route, navigation}) => {

    const {user} = useSelector(state => state)
    
    const dispatch = useDispatch()

    const [name, setName] = useState(user.customer_name)
    const [phone, setPhone] = useState(user.telephone1)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState(user.addressLine1)
    const [area, setArea] = useState(user.addressLine2)
    const [city, setCity] = useState(user.city)
    const [pincode, setPincode] = useState(user.pincode)

    const [phoneError, setPhoneError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const checkoutEditHandler = () => {
        navigation.navigate('Checkout', {'user': {...user, customer_name: name, telephone1: phone}})
    }

    const defaultEditHandler = () => {
        const formData = QueryString.stringify({
            'customer_id': user.customer_id,
            'email': email,
            'username': name,
            'mobileNo': user.telephone1,
            'addressLine1': address,
            'area': area,
            'city': city,
            'pincode': pincode,
            'location': ''
        })
        console.log(formData)
        axios.post(editAccountURL, formData).then(response => {
            if (response.data.error) {
                Alert.alert('Error', response.data.error)
            } else if (response.data.customer) {
                const responseUser = response.data.customer
                dispatch(setUser({...user, 
                    customer_name: responseUser.username, 
                    addressLine1: responseUser.addressLine1,
                    addressLine2: responseUser.area,
                    ...responseUser
                }))
                navigation.navigate('Account')
            }
        }).catch((e) => {
            Alert.alert('Error', e)
        })
    }

    function validateForm() {
        if (!phoneValidation(phone) && !emailValidation(email)) {
            if (route.params) {
                checkoutEditHandler()
            } else {
                defaultEditHandler()
            }
        }
        if (phoneValidation(phone)) {
            setPhoneError(true)
        } 
        if (emailValidation(email)) {
            setEmailError(true)
        }
    }
    
    return(
        <View style={styles.pageContainer}>
            <BannerHeader title="Edit Account" />
            <ScrollView style={styles.infoContainer}>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Name" state={name} setState={setName} type={name} />
                </View>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Phone number" editable={false} validate={phoneError} state={phone} setState={setPhone} type='phone'/>
                </View>
                {!route.params &&
                <>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Email ID" validate={emailError} state={email} setState={setEmail} type='email'/>
                </View>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Address Line 1" state={address} setState={setAddress} type='address'/>
                </View>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Area" state={area} setState={setArea} type='address'/>
                </View>
                <View style={styles.fieldContainer}>
                    <Input placeholder="City" state={city} setState={setCity} type='address'/>
                </View>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Pincode" state={pincode} setState={setPincode} type='address'/>
                </View>
                </>
                }
                <View style={{marginHorizontal: '20%', marginVertical: '10%'}}>
                        <GeneralButton text='Submit' styleType='secondary' onPress={validateForm}/>
                </View>
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        height: '100%'
    },

    infoContainer: {
        marginVertical: '5%',
        backgroundColor: '#EEE',
        height: '70%',
    },

    fieldContainer: {
        padding: 10,
    },

    fieldHeading: {
        marginVertical: '1%',
        fontSize: 18,
        fontWeight: '600'
    }
})

export default EditAccountPage