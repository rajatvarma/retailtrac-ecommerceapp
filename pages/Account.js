import { faInfo, faMapMarkerAlt, faPen, faShoppingBasket, faUserAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Text, View , StyleSheet} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../actions/userAction'
import GeneralButton from '../components/Button'
import { BannerHeader }  from '../components/Header'
import Option from '../components/Option'
import { saveUserData } from '../userStorage'

const AccountPage = ({navigation}) => {

    const {user} = useSelector(state => state)
    const dispatch = useDispatch()

    return(
        <View style={styles.pageContainer}>
            <BannerHeader title="Your Account" />
            <View style={styles.userProfileContainer}>
                <View style={{padding: '5%', borderRadius: 100, backgroundColor: '#FF595F', marginRight: '5%'}}>
                    <FontAwesomeIcon icon={faUserAlt} color="white" />
                </View>
                <View>
                    <Text style={styles.userName}>{user.customer_name}</Text>
                    <Text style={styles.userDetails}>{user.telephone1}</Text>
                    <Text style={styles.userDetails}>{user.email}</Text>
                </View> 
            </View>
            
            <Option text="Previous Orders" redirectTo='Orders' navigation={navigation} icon={faShoppingBasket} />
            <Option text="Manage Addresses" redirectTo={"UserAddresses"} navigation={navigation} icon={faMapMarkerAlt} />            
            <Option text="Edit Account" redirectTo={'EditAccount'} navigation={navigation} icon={faPen} />
            <Option text="Policies" redirectTo={'Settings'} navigation={navigation} icon={faInfo} />
            
            <View style={styles.buttonContainer}>
                <GeneralButton text='Sign Out' styleType="secondary" onPress={() => {
                    dispatch(setUser({}))
                    saveUserData('phone', '')
                    saveUserData('password', '')
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: 'white',
        height: '100%'
    },

    userProfileContainer: {
        alignItems: 'center',
        paddingHorizontal: '5%',
        marginVertical: '5%',
        flexDirection: 'row'
    },

    userName:{
        fontSize: 24,
        fontFamily: 'Epilogue_700Bold',
        marginBottom: 5
    },

    userDetails: {
        fontSize: 16,
        fontFamily: 'Epilogue_500Medium',
    },

    buttonContainer: {
        width: '100%',
        marginVertical: '10%',
        paddingHorizontal: '20%'
    },
})

export default AccountPage