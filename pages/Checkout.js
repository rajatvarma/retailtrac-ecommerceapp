import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useState } from 'react'
import { DatePickerIOS, DatePickerIOSComponent, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { checkoutHandler } from '../apiCallHandler'
import GeneralButton from '../components/Button'
import Header from '../components/Header'
import Input from '../components/TextInput'

const ErrorBanner = () => {
    return(
        <View style={styles.bannerContainer}>
            <Text style={styles.bannerText}>⚠ There was an error, please try again later</Text>
        </View>
    )
}


const FieldEditCard = ({field, close, state, setState}) => {
    const [line1, setLine1] = useState(state.line1)
    const [line2, setLine2] = useState(state.line2)
    const [city, setCity] = useState(state.city)
    const [pincode, setPincode] = useState(state.pincode)
    return(
        <Pressable style={styles.editCardContainer} onPress = {close}>
            <View style={styles.editCard}>
            {field !== "address" ?
                <>
                    <Text style={styles.editCardHeading}>New {field}</Text>
                    <View style={styles.editCardInput}>
                        <Input placeholder={`Enter new ${field}`} state={state} setState={setState} type={field} />
                    </View>
                    <GeneralButton text="Submit" onPress={close}/>
                </>
                :
                <>
                    <Text>Edit Address</Text>
                    <Input placeholder={`Enter Address Line 1`} state={line1} setState={setLine1} />
                    <Input placeholder={`Enter Address Line 2`} state={line2} setState={setLine2} />
                    <Input placeholder={`Enter City`} state={city} setState={setCity} />
                    <Input placeholder={`Enter Pincode`} state={pincode} setState={setPincode} />
                    <GeneralButton text="Submit" onPress={
                        () => {
                            setState({
                                ...state ,
                                line1: line1,
                                line2: line2, 
                                city: city,
                                pincode: pincode
                                
                            })
                            close()
                        }
                    }/>
                </>
            }
            </View>
        </Pressable>
    )
}


const CheckoutPage = ({navigation}) => {

    const {cart, user} = useSelector(state => state) 
    const [name, setName] = useState(user.customer_name)
    const [phone, setPhone] = useState(user.telephone1)
    const [address, setAddress] = useState({
        line1: user.addressLine1,
        line2: user.addressLine2,
        city: user.city,
        pincode: user.pincode
    })
    const [cartTotal, setCartTotal] = useState(0)
    const [shippingAmount, setShippingAmount] = useState(0)
    const [editing, setEditing] = useState({})

    const [checkoutError, setCheckoutError] = useState(false)


    useEffect(() => {
        let sum = 0
        let totalItemCount = 0
        cart.forEach(element => {
            sum = sum + (element.cart_quantity*Number(element.sell_price))
            totalItemCount = totalItemCount + element.cart_quantity
        });
        setCartTotal(sum)
        setShippingAmount(50*totalItemCount)
    }, [cart])


    return(
        <View style={styles.pageContainer}>
            {editing === "name" && <FieldEditCard field={'name'} state={name} setState={setName} close={() => setEditing({...editing, isEditing: false})} />}
            {editing === "phone" && <FieldEditCard field={'phone'} state={phone} setState={setPhone} close={() => setEditing({...editing, isEditing: false})} />}
            {editing === "address" && <FieldEditCard field={'address'} state={address} setState={setAddress} close={() => setEditing({...editing, isEditing: false})} />}
            <Header title='Checkout' />
            {checkoutError && <ErrorBanner />}
            <View style={styles.invoice}>
                <View style={styles.invoiceItem}>
                    <View>
                        <Text style={styles.invoiceHeading}>Name</Text>
                        <Text style={styles.invoiceContent}>{!name ? user.customer_name : name}</Text>
                    </View>
                    <Pressable onPress={() => setEditing('name')}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Pressable>
                </View>
                <View style={styles.invoiceItem}>
                    <View>
                        <Text style={styles.invoiceHeading}>Phone Number</Text>
                        <Text style={styles.invoiceContent}>{!phone ? user.telephone1 : phone}</Text>
                    </View>
                    <Pressable onPress={() => setEditing('phone')}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Pressable>
                </View>
                <View style={styles.invoiceItem}>
                    <View>
                        <Text style={styles.invoiceHeading}>Address</Text>
                        <Text style={styles.invoiceContent}>{
                                `${address.line1}\n${address.line2}\n${address.city}, ${address.pincode}`
                        }
                        </Text>
                    </View>
                    <Pressable onPress={() => setEditing('address')}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Pressable>
                </View>
                {/* <View style={styles.invoiceItem}>
                    <Text style={styles.invoiceHeading}>Delivery Date</Text>
                    <DatePickerIOS date={new Date()} />
                </View> */}
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
            </View>
            <View style={styles.buttonContainer}>
                <GeneralButton text="Place Order" onPress={async () => {
                    const paymentURL = await checkoutHandler({...user, 
                        customer_name: name, 
                        telephone1: phone, 
                        addressLine1: address.line1, 
                        addressLine2: address.line2, 
                        city: address.city,
                        pincode: address.pincode
                    }, cart, cartTotal)
                    if (paymentURL.url) {
                        navigation.navigate('PaymentGateway', {url: paymentURL.url})
                    } else if (paymentURL.error) {
                        setCheckoutError(true)
                    }
                    
                }} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    pageContainer: {
        paddingVertical: '10%',
        paddingHorizontal: '5%',
        height: '100%',
    },

    mainHeading: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: '10%'

    },

    buttonContainer: {
        width: '100%',
    },

    invoice: {
        backgroundColor: '#DDD',
        padding: 10,
        marginVertical: '5%'
    },

    invoiceItem: {
        marginVertical: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    
    invoiceHeading: {
        fontSize: 18,
        fontWeight: '600',
    },

    invoiceContent: {
        fontSize: 16
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