import React, { useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Pressable} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import getOrders from '../actions/ordersAction'
import Header from '../components/Header'


const OrderCard = ({data, nav}) => {
    return(
        <Pressable style={styles.orderCard} onPress={() => nav.navigate('Order', {order_id: data[0], order_date: data[3], order_status: data[2]})}>
            <Text style={styles.orderHeading}>Order ID:</Text>
            <Text>{data[0]}</Text>
            <Text style={styles.orderHeading}>Amount:</Text>
            <Text>Rs. {data[1]}</Text>
            <Text style={styles.orderHeading}>Order Status:</Text>
            <Text>{data[2]}</Text>
            <Text style={styles.orderHeading}>Order Date:</Text>
            <Text>{data[3]}</Text>
        </Pressable>
    )
}


const OrdersPage = ({navigation}) => {

    const dispatch = useDispatch()

    const {user, orders} = useSelector(state => state)

    let ordersCardList = []

    // console.log(orders)

    orders.forEach(element => {
        data = element.split(":")
        if(data[0].length) {
        ordersCardList.push(<OrderCard data={data} nav={navigation} key={data[0]} orderStatus={data[2]} />) 
        }
    });

    useEffect(() => {
        dispatch(getOrders(user.customer_id))
    }, [dispatch])

    return(
        <View style={styles.pageContainer}>
            <Header title="Your Orders" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {ordersCardList.length ? ordersCardList : <Text style={{textAlign: 'center', paddingVertical: '40%', color: '#999', fontWeight: '600'}}>Your previous orders show up here</Text>}
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

    mainHeading: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: '10%'

    },

    buttonContainer: {
        width: '100%',
        marginVertical: '5%'
    },

    orderCard: {
        // backgroundColor: 'white',
        marginVertical: 5,
        padding: 10,
        borderWidth: 1
        // borderRadius: 10,
        // elevation: 5,
        // shadowColor: '#111B',
        // shadowOffset: {width: 2, height:2},
        // shadowOpacity: 0.8,
        // shadowRadius: 3
    },

    orderHeading: {
        fontSize: 16,
        fontWeight: '600'
    }

})

export default OrdersPage