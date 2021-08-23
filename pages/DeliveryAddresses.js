import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Address from '../components/Address';
import GeneralButton from '../components/Button';
import { BannerHeader } from '../components/Header';


const RadioButton = ({pressed}) => {

    const styles = StyleSheet.create({
        container: {
            borderColor: '#37474F',
            borderWidth: 2,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            width: 30,
            borderRadius: 100,
        },

        buttonPressed: {
            backgroundColor: '#37474F',
            borderRadius: 1000,
            height: 15,
            width: 15,
        },

        button: {
            borderRadius: 10,
            height: 15,
            width: 15,
        },


    })

    return(
        <View style={styles.container}>
            <View style={!pressed ? styles.button: styles.buttonPressed}></View>
        </View>
    )
}

const DeliveryAddresses = ({navigation, route}) => {

    const {addresses} = useSelector(state => state)

    // console.log(addresses)

    const [pressed, setPressed] = useState(0)

    // const allAddressesList = [tempAddress, ...addresses]

    return(
        <View style={styles.page}>
            <BannerHeader title="My Addresses" />
            <ScrollView style={{height: '60%'}}>
                {addresses.map((address) => 
                (   
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%'}} key={address.Id}>
                    
                    {route.params && 
                        <TouchableOpacity onPress={() => setPressed(address.Id)} style={{justifyContent: 'center'}}>
                            <RadioButton pressed={address.Id == pressed}/>
                        </TouchableOpacity>}
                    <Address address={address} navigation={navigation} radioed={route.params} />
                    </View>
                )
                )}
            </ScrollView>
            <View style={{marginHorizontal: '5%', flexDirection: 'row', justifyContent: 'space-around'}}>
                <GeneralButton styleType="secondary" text="Add Address" onPress={()=>navigation.navigate('AddAddress')}/>
                {route.params && <GeneralButton styleType="secondary" text="Continue" onPress={() => navigation.navigate('Checkout', {user: route.params.user, address: addresses.filter(address => address.Id == pressed)[0]})}/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        height: '100%',
        paddingBottom: '5%'
    }
})

export default DeliveryAddresses