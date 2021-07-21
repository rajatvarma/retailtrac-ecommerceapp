import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Text, View , StyleSheet, ScrollView, Pressable} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../actions/userAction'
import GeneralButton from '../components/Button'
import Header  from '../components/Header'
import { DotsWave } from '../components/LoadingAnimations'
import Option from '../components/Option'

const AccountPage = ({navigation}) => {

    const {user} = useSelector(state => state)
    const dispatch = useDispatch()

    return(
        <View style={styles.pageContainer}>
            <Header title='Your Account' />
            <View style={styles.userProfileContainer}>
                <Text style={styles.userName}>{user.customer_name}</Text>
                <Text style={styles.userDetails}>{user.telephone1} • {user.email}</Text>
            </View>
            <Option text="Previous Orders" redirectTo={'Orders'} navigation={navigation}/>
            <Option text="Edit Account" redirectTo={'EditAccount'} navigation={navigation}/>
            {/* <Option text="Manage Addresses" redirectTo={null} navigation={navigation}/>
            <Option text="Edit Payment Details" redirectTo={null} navigation={navigation}/> */}
            <Option text="More Info" redirectTo={'Settings'} navigation={navigation}/>
            <View style={styles.buttonContainer}>
                <GeneralButton text='Sign Out' onPress={() => {
                    dispatch(setUser({}))
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingTop: '10%',
        paddingHorizontal: '5%',
        height: '100%'
    },

    mainHeading: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: '10%'

    },

    userProfileContainer: {
        marginVertical: '5%'
    },

    userName:{
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 5
    },

    userDetails: {
        fontSize: 16,
        fontWeight: '500'
    },

    buttonContainer: {
        width: '100%',
        marginVertical: '5%'
    },
})

export default AccountPage