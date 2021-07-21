import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../actions/userAction'
import GeneralButton from '../components/Button'
import Header from '../components/Header'
import Input from '../components/TextInput'

const EditAccountPage = ({navigation}) => {

    const {user} = useSelector(state => state)
    console.log(user)

    const dispatch = useDispatch()

    const [name, setName] = useState(user.customer_name)
    const [phone, setPhone] = useState(user.telephone1)
    const [email, setEmail] = useState(user.email)

    return(
        <View style={styles.pageContainer}>
            <Header title="Edit Account" />
            <View style={styles.infoContainer}>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Name" state={name} setState={setName} type={name} />
                </View>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Phone number" state={phone} setState={setPhone} type={phone} />
                </View>
                <View style={styles.fieldContainer}>
                    <Input placeholder="Email Address" state={email} setState={setEmail} type={email} />
                </View>
            </View>
            <GeneralButton text='Submit' onPress={()=>{
                dispatch(setUser({...user, customer_name: name, telephone1: phone, email: email}))
                navigation.navigate('Account')
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingTop: '10%',
        paddingHorizontal: '5%',
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