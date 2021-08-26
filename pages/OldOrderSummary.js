import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import { BannerHeader } from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderSummary } from '../actions/ordersAction'
import { validateOrderStatusURL } from '../apiCalls'

const ItemCard = ({item}) => {

    return(
        <View style={styles.itemCard}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
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


const OrderSummaryPage = ({route}) => {

    const {order_id, order_date, order_amount} = route.params

    const {orderDetails} = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrderSummary(order_id))
    }, [dispatch])

    console.log(orderDetails)

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
        fontFamily: 'Epilogue_400Regular',
        color: '#37474F'
    },

    descriptionText: {
        color: '#FF595F',
        fontSize: 18, 
        fontFamily: 'Epilogue_700Bold',
        marginVertical: '2%'
    },

    itemHeading: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Epilogue_600SemiBold',
        flex: 9
    },

    itemPrice: {
        flex: 5,
        fontWeight: '700',
        fontFamily: 'Epilogue_700Bold',
        fontSize: 20,
        textAlign: 'right'
    }
})

export default OrderSummaryPage