import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, Pressable} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import getOrders from '../actions/ordersAction'
import { BannerHeader } from '../components/Header'


const OrderCard = ({data, nav}) => {
    return(
        <Pressable style={styles.orderCard} onPress={() => nav.navigate('Order', {order_id: data[0], order_date: data[3], order_status: data[2], order_amount: data[1]})}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                    <FontAwesomeIcon icon={faShoppingBasket} color="white" size={20} />
                </View>
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={styles.orderID} >#{data[0].slice(2)}</Text>
                    <Text style={styles.orderDate} >{data[3]}</Text>
                </View>
            </View>
            <View style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
                <Text style={styles.orderAmount} >Rs. {data[1]}</Text>
                <Text style={styles.orderStatus} >{data[2].length >= 10 ? 'In Progress' : data[2]}</Text>
            </View>
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
            <BannerHeader title="Your Orders" />
                <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                    {ordersCardList.length ? ordersCardList : <Text style={{textAlign: 'center', paddingVertical: '40%', color: '#999', fontWeight: '600'}}>Your previous orders show up here</Text>}
                </ScrollView>
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
        width: '100%',
        marginVertical: '5%'
    },

    listContainer:{
        paddingHorizontal: '2%',
        flex: 1
    },

    orderCard: {
        backgroundColor: '#F37A2014',
        flexDirection: 'row',
        marginVertical: 5,
        borderWidth: 1,
        paddingVertical: '5%',
        paddingHorizontal: '3%',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    iconContainer: {
        backgroundColor: '#F37A20',
        padding: '5%',
        marginRight: '5%',
        borderRadius: 100
    },

    orderID: {
        fontSize: 18,
        fontWeight: '500',
        color: '#37474F',
        marginBottom: '10%'
    },

    orderDate: {
        fontSize: 16,
        color: '#37474FAA',
    },

    orderAmount: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: '600',
        marginBottom: '10%'
    },

    orderStatus: {
        fontSize: 16,
        color: '#5EC401',
        textTransform: 'capitalize',
        textAlign: 'right',
        fontWeight: '600',
        // width: '90%',
    },

})

export default OrdersPage