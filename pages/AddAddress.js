import { faCheckCircle, faMapPin, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Alert, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, editAddress } from '../actions/addressesAction';
import GeneralButton, { SmallButton } from '../components/Button';
import { BannerHeader } from '../components/Header';
import Input from '../components/TextInput';
import { phoneValidation } from '../formValidations';


export const ResponseMessageBox = ({status}) => {

    const styles = StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: status ? 'green' : 'red',
            marginVertical: '2%',
            paddingHorizontal: '5%',
            paddingVertical: '2%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },

        text: {
            fontSize: 12,
            color: status ? 'green' : 'red',
            fontWeight: '500',
            marginLeft: '5%'
        }
    })

    let message = ""

    if (status) {
        message = "Woohoo! We deliver to this pincode!"
    } else {
        message = "Sorry, we don't deliver to this pincode at the moment."
    }

    return(
        <View style={styles.container}>
            <FontAwesomeIcon icon={status ? faCheckCircle : faTimesCircle} color={status ? 'green' : 'red'} />
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}



export default ({route, navigation, ...props}) => {

    let address

    let isEditingAddress

    const {user} = useSelector(state => state)

    if(route.params) {
        isEditingAddress = true
        address = route.params.address
        console.log(route.params.address)
    } else {
        address = {
            address: "",
            area: "",
            city: "",
            pincode: "",
            mobileNumber: "",
            landMark: "",
            customerName: user.customer_name
        }
    }

    

    const [line1, setLine1] = useState(address.address)
    const [city, setCity] = useState(address.city)
    const [area, setArea]= useState(address.area)
    const [nickname, setNickname]= useState(address.customerName)
    const [pincode, setPincode] = useState(String(address.pincode))
    const [phone, setPhone] = useState(address.mobileNumber)
    const [landmark, setLandmark] = useState(address.landMark)

    const [pincodeValidated, setPincodeValidated] = useState(false)
    const [error, setError] = useState(false)

    const [validation, setValidation] = useState({
        address: false,
        area: false,
        city: false,

    })

    const [buttonLoading, SetButtonLoading] = useState(false)

    const [isPincodeSent, setPincodeSent] = useState(false)

    async function validatePincode(pincode) {
        Keyboard.dismiss()
        axios.get(`http://pvanam.retailtrac360.com:8080/eComWS/rest/EcomSales/eComPincodeValidation?pin_code=${pincode}`).then(response => {
            if (response.data == 'true'){
                setPincodeSent(true)
                setPincodeValidated(true)
            } else if (response.data == 'false') {
                setPincodeSent(true)
                setPincodeValidated(false)
            } else {
                setError(true)
            }
        })

    }

    const dispatch = useDispatch()
    async function writeAddress() {       
        setValidation({area: false, city: false, address: false})
        if (area.length === 0 || address.length === 0 || city.length === 0 || phone.length === 0) {
            if (area.length === 0 || address.length === 0 || city.length === 0) {
                setValidation({
                    address: !Boolean(address.length),
                    area: !Boolean(area.length),
                    city: !Boolean(city.length)
                })
                Alert.alert('Incomplete Form', 'Please fill in all the necessary details.')
            }
            if (phone.length === 0 || phoneValidation(phone)) {
                Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.')
            }
        }
        else {
            const currentAddress = {address: line1, area: area, city: city, pincode: pincode, customerName: (nickname.length ? nickname : user.customer_name), mobileNumber: phone, landmark: landmark, Id: 0}
            if(isEditingAddress) {
                dispatch(editAddress({...address, address: line1, area: area, city: city, pincode: pincode, customerName: (nickname.length ? nickname : user.customer_name), mobileNumber: phone, landmark: landmark}, user.customer_id))
                navigation.navigate('UserAddresses')
            } else {
                dispatch(addAddress(currentAddress, user.customer_id))
                navigation.navigate('UserAddresses')
            }
        }
    }

    return(
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.page}>
            <BannerHeader title={isEditingAddress ? "Edit Address" : "Add Address"} />
            <View style={styles.formContainer}>
                {!isEditingAddress &&
                    <View style={styles.pincodeContainer}>
                        <View style={{flex: 2, marginRight: '5%'}}>
                            <Input placeholder="Pin Code" state={pincode} setState={setPincode} type="pincode" editable={!pincodeValidated}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <SmallButton text="Validate" icon={faMapPin} onPress={() => {validatePincode(pincode)}} />
                        </View>
                    </View>
                }
                {isPincodeSent && <ResponseMessageBox status={pincodeValidated} /> }
                {pincodeValidated && 
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View onStartShouldSetResponder={() => true}>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="Your building, apartment no. or house no." state={line1} setState={setLine1} type='address' styleType="secondary" validate={validation.address} />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="The area you live in" state={area} setState={setArea} type='address' styleType="secondary" validate={validation.area} />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="City" state={city} setState={setCity} type='address' styleType="secondary" validate={validation.city}/>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="Name" state={nickname} setState={setNickname} styleType="secondary" />                
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="Phone Number" state={phone} setState={setPhone} type="address" validate={validation.phone && phoneValidation(phone)}/>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="Landmark" state={landmark} setState={setLandmark} />
                    </View>
                    <GeneralButton text="Submit" styleType="secondary" onPress={writeAddress} isLoading={buttonLoading} />
                    </View>
                </ScrollView>
                }

                {isEditingAddress && 
                <ScrollView>
                    <View onStartShouldSetResponder={() => true}>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="Your building name & apartment no. or house no." state={line1} setState={setLine1} type='address' validate={validation.address} styleType="secondary" />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="The area you live in" state={area} setState={setArea} validate={validation.area} type='area' styleType="secondary" />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="City" state={city} setState={setCity} type='city' validate={validation.city} styleType="secondary" />                
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="Pin Code" state={pincode} setState={setPincode} type="pincode" />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="Landmark" state={landmark} setState={setLandmark} type="landmark" />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="Name" state={nickname} setState={setNickname} type='city' styleType="secondary" />                
                    </View>
                    <View style={styles.fieldContainer}>
                        <Input placeholder="Phone Number" state={phone} validate={phoneValidation(phone)} setState={setPhone} type="phone" />
                    </View>
                    <GeneralButton text="Submit" styleType="secondary" onPress={() => {writeAddress()}} />
                    </View>
                </ScrollView>
                }
            </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#FF595F'
    },

    pincodeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    formContainer: {
        flex: 2,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingVertical: '15%',
        elevation: 20,
        justifyContent: 'center',
        shadowColor: '#1112',
        shadowOffset: {width: 0, height: -10},
        shadowOpacity: 0.8,
        shadowRadius: 10,
        paddingHorizontal: '10%',
        backgroundColor: 'white'
    },

    fieldContainer: {
        marginVertical: '2.5%'
    },
})