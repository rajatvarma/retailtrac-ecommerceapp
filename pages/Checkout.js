import { faMapMarkerAlt, faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { checkoutHandler } from '../paymentGatewayHandler'
import GeneralButton from '../components/Button'
import { BannerHeader } from '../components/Header'

const ErrorBanner = () => {
    return(
        <View style={styles.bannerContainer}>
            <Text style={styles.bannerText}>⚠ There was an error, please try again later</Text>
        </View>
    )
}

const CheckoutPage = ({navigation, route}) => {

    const {cart, user, addresses} = useSelector(state => state)
    const name = route.params ? route.params.user.customer_name : user.customer_name
    const phone = route.params in route ? route.params.user.telephone1 : user.telephone1
    let checkoutAddress = {}

    if (addresses.length) {
        checkoutAddress = route.params ? route.params.address ? route.params.address : {
            address: addresses[0].address,
            area: addresses[0].area,
            city: addresses[0].city,
            pincode: addresses[0].pincode
        } : {
            address: addresses[0].address,
            area: addresses[0].area,
            city: addresses[0].city,
            pincode: addresses[0].pincode
        }
    }

    const [cartTotal, setCartTotal] = useState(0)
    const [shippingAmount, setShippingAmount] = useState(0)

    const [checkoutError, setCheckoutError] = useState(false)

    const [checkoutStage, setCheckoutStage] = useState(0)

    useEffect(() => {
        let sum = 0
        let totalItemCount = 0
        let shipping = 0
        cart.forEach(element => {
            sum = sum + (element.cart_quantity*Number(element.sell_price))
            totalItemCount = totalItemCount + element.cart_quantity
            shipping = shipping + (Number(element.charges)*element.cart_quantity)
        });
        setCartTotal(sum)
        setShippingAmount(shipping)
    }, [cart])

    return(
        <View style={styles.pageContainer}>
            <BannerHeader title='Checkout' />
            {checkoutError && <ErrorBanner />}
            <View style={styles.invoice}>
                {checkoutStage >= 0 &&
                <View>
                    <View style={styles.itemHeadingContainer}>
                        <Text style={styles.invoiceHeading}>Contact Details</Text>
                        <Pressable onPress={() => {navigation.navigate('EditAccount', {fromCheckout: true})}}>
                            <FontAwesomeIcon icon={faPen} color="#236CD9" size={18} />
                        </Pressable>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: '5%'}}>
                        <View style={{backgroundColor: '#236CD923', padding: '5%', borderRadius: 100, marginRight: '5%'}}>
                            <FontAwesomeIcon icon={faUser} />
                        </View>
                        <View style={{justifyContent: 'space-between'}}>
                            <Text style={styles.invoiceContent}>{!name ? user.customer_name : name}</Text>
                            <Text style={styles.invoiceContent}>{!phone ? user.telephone1 : phone}</Text>
                        </View>
                    </View>
                </View>
                }

                {checkoutStage >= 1 &&
                <View>
                    <View style={styles.itemHeadingContainer}>
                        <Text style={styles.invoiceHeading}>Delivery Address</Text>
                        <Pressable onPress={() => {navigation.navigate('UserAddresses', {fromCheckout: true, user: {customer_name: name, telephone1: phone}})}}>
                            <FontAwesomeIcon icon={faPen} color="#236CD9" size={18} />
                        </Pressable>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: '5%'}}>
                        <View style={{backgroundColor: '#236CD923', padding: '5%', borderRadius: 100, marginRight: '5%'}}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </View>
                        <View style={{justifyContent: 'space-between'}}>
                            <Text style={styles.invoiceContent}>
                                {
                                    Object.keys(checkoutAddress).length ? 
                                        `${checkoutAddress.address}\n${checkoutAddress.area}\n${checkoutAddress.city}, ${checkoutAddress.pincode}`
                                    :
                                    `You have no addresses. Please add an address to proceed with the order.`
                                }
                            </Text>
                        </View>
                    </View>
                </View>
                }
                {checkoutStage >= 2 &&
                <>
                <View style={{borderBottomColor: '#a7a5a5', borderBottomWidth: 1, marginVertical: '5%'}}></View>
                <View style={styles.invoiceItem}>
                    <Text style={styles.invoiceHeading}>Subtotal</Text>
                    <Text style={styles.invoiceContent}>Rs. {cartTotal}</Text>
                </View>
                <View style={styles.invoiceItem}>
                    <Text style={styles.invoiceHeading}>Shipping Charges</Text>
                    <Text style={styles.invoiceContent}>Rs. {shippingAmount}</Text>
                </View>
                <View style={styles.invoiceItem}>
                    <Text style={styles.invoiceHeading}>Total Amount</Text>
                    <Text style={styles.invoiceContent}>Rs. {cartTotal + shippingAmount}</Text>
                </View>
                </>
                }
            </View>

            <View style={styles.buttonContainer}>
                {checkoutStage !== 2 ? 
                <GeneralButton styleType='secondary' text="Continue" onPress={() => {setCheckoutStage(checkoutStage => checkoutStage+1)}} />
                :
                <GeneralButton styleType='secondary' text="Continue" onPress={async () => {
                    const paymentURL = await checkoutHandler({...user, 
                        customer_name: name, 
                        telephone1: phone,
                        addressLine1: checkoutAddress.address, 
                        addressLine2: checkoutAddress.area, 
                        city: checkoutAddress.city,
                        pincode: checkoutAddress.pincode
                    }, cart, cartTotal, shippingAmount)
                    if (paymentURL.url) {
                        navigation.navigate('PaymentGateway', {url: paymentURL.url, ...paymentURL})
                    } else if (paymentURL.error) {
                        setCheckoutError(true)
                    }
                    
                }} />
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    pageContainer: {
        height: '100%',
    },

    mainHeading: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: '10%'

    },

    buttonContainer: {
        marginHorizontal: '5%'
    },

    invoice: {
        paddingHorizontal: '5%',
        paddingVertical: '5%'

    },

    invoiceItem: {
        marginVertical: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    
    invoiceHeading: {
        fontFamily: 'Epilogue_500Medium',
        fontSize: 20,
    },

    invoiceContent: {
        fontSize: 18,
        fontFamily: 'Epilogue_400Regular',
        color: '#37474F'
    },

    itemHeadingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    editCardContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 25,
        width: '115%',
        height: '120%',
        backgroundColor: '#111111AA',
        zIndex: 100,
    },

    editCard: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        justifyContent: 'space-evenly'
    },

    editCardHeading: {
        fontSize: 20,
        fontWeight: '600',
        padding: 5,
        marginBottom: 10
    },

    editCardInput: {
        marginVertical: 20
    },

    bannerContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#FF9292',
        borderWidth: 2,
        borderColor: '#FF1B1B'
    },
    
    bannerText: {
        textAlign: 'center',
        fontSize: 14,
    }
})

export default CheckoutPage