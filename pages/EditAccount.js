import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../actions/userAction'
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

    const [phoneError, setPhoneError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const checkoutEditHandler = () => {
        navigation.navigate('Checkout', {'user': {...user, customer_name: name, telephone1: phone}})
    }

    const defaultEditHandler = () => {
        dispatch(setUser({...user, customer_name: name, telephone1: phone, email: email}))
        navigation.navigate('Account')
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
            <View style={styles.infoContainer}>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Name" state={name} setState={setName} type={name} />
                </View>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Phone number" validate={phoneError} state={phone} setState={setPhone} type='phone'/>
                </View>
                {!route.params &&
                <View style={styles.fieldContainer}>
                    <Input placeholder="Email ID" validate={emailError} state={email} setState={setEmail} type='email'/>
                </View>
                }
                <View style={{marginHorizontal: '20%', marginVertical: '10%'}}>
                        <GeneralButton text='Submit' styleType='secondary' onPress={validateForm}/>
                </View>
            </View>
            
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