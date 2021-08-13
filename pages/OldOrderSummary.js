import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import Header, { BannerHeader } from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderSummary } from '../actions/ordersAction'
import GeneralButton from '../components/Button'
import { validateOrderStatusURL } from '../apiCalls'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

const ItemCard = ({item}) => {

    console.log(item)

    return(
        <View style={styles.itemCard}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{backgroundColor: '#F37A20', padding: '5%', borderRadius: 100, marginRight: '5%', flex: 1,}}>
                        <FontAwesomeIcon icon={faShoppingBag} color="white" />
                    </View>
                    <Text style={styles.itemHeading}>{item.description}</Text>
                <Text style={styles.itemPrice}>Rs. {Number(item.price).toFixed(2)}</Text>
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '2.5%'}}>
                <Text style={styles.itemText}>Quantity</Text>
                <Text style={styles.itemText}>{item.ordered}</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '2.5%'}}>
                <Text style={styles.itemText}>Taxes ({item.taxcode})</Text>
                <Text style={styles.itemText}>{item.tax_amount}</Text>
            </View>
        </View>
    )
}


const OrderSummaryPage = ({route, navigation}) => {

    const {order_id, order_date, order_status, order_amount} = route.params

    const {orderDetails} = useSelector(state => state)

    const dispatch = useDispatch()

    const [buttonLoading, setButtonLoading] = useState(false)

    useEffect(() => {
        dispatch(getOrderSummary(order_id))
    }, [dispatch])

    // console.log(orderDetails)

    const validateOrderStatus = () => {

        setButtonLoading(true)

        const url = validateOrderStatusURL + `?salesOrderCode=${order_id}`

        axios.get(url).then(r => {
            setButtonLoading(false)
            if (r.data) {
                Alert.alert('Attention', r.data.params[0].status, [
                    {
                        text: 'OK',
                        onPress: () => {}
                    }
                ])
            }
        })
    }

    return(
        <View style={styles.pageContainer}>
            <BannerHeader title="Order Summary" />
            <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: '5%', paddingVertical: '5%'}}>
                <View>
                    <Text style={styles.descriptionText}>{order_id}</Text>
                    <Text style={styles.descriptionText}>{order_date}</Text>
                </View>
                <Text style={styles.descriptionText}>Total: Rs. {order_amount}</Text>
            </View>
            {order_status !== "complete" &&
            <View style={{marginVertical: '5%', paddingHorizontal: '10%'}}>
                <GeneralButton styleType="secondary" text="Validate" onPress={validateOrderStatus} isLoading={buttonLoading} />
            </View>
            }
            <ScrollView style={{paddingHorizontal: '5%'}}>
                {orderDetails && orderDetails.map((item) => <ItemCard item={item} key={item.item_code} />)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        height: '100%',
    },

    itemCard: {
        borderRadius: 15,
        backgroundColor: '#5EC40114',
        padding: '5%',
        marginBottom: '2%'
    },

    itemText: {
        fontSize: 16,
        color: '#37474F'
    },

    descriptionText: {
        color: '#FF595F',
        fontSize: 18, 
        fontWeight: '700', 
        marginVertical: '2%'
    },

    itemHeading: {
        fontSize: 18,
        fontWeight: '500',
        flex: 9
    },

    itemPrice: {
        flex: 5,
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'right'
    }
})

export default OrderSummaryPage