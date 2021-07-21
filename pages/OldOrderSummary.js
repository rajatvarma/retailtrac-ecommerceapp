import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderSummary } from '../actions/ordersAction'

const ItemCard = ({item}) => {
    return(
        <View style={styles.itemCard}>
            <Text style={styles.itemText}>Item: <Text style={{fontWeight: '600'}}>{item.description}</Text></Text>
            <Text style={styles.itemText}>Quantity: <Text style={{fontWeight: '600'}}>{item.ordered}</Text></Text>
            <Text style={styles.itemText}>Cost: <Text style={{fontWeight: '600'}}>{item.price}</Text></Text>
            <Text style={styles.itemText}>Taxes: <Text style={{fontWeight: '600'}}>{item.tax_amount} ({item.taxcode})</Text></Text>
            <Text style={styles.itemText}>Total Cost: <Text style={{fontWeight: '600'}}>{Number(item.tax_amount)+Number(item.price)}</Text></Text>
        </View>
    )
}


const OrderSummaryPage = ({route, navigation}) => {

    const {order_id, order_date} = route.params

    const {orderDetails} = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrderSummary(order_id))
    }, [dispatch])

    console.log(orderDetails)

    return(
        <View style={styles.pageContainer}>
            <Header title="Order Summary" />
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{fontSize: 18, fontWeight: '500', marginVertical: '2%'}}>{order_id}</Text>
                <Text style={{fontSize: 18, fontWeight: '500', marginVertical: '2%'}}>{order_date}</Text>
            </View>
            <ScrollView>
                {orderDetails && orderDetails.map((item) => <ItemCard item={item} key={item.item_code} />)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingTop: '10%',
        paddingHorizontal: '5%',
        height: '100%',
    },

    itemCard: {
      padding: 5,
      marginVertical: '2%',
      borderWidth: 1
    },

    itemText: {
        fontSize: 16
    }
})

export default OrderSummaryPage