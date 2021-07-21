import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector, useStore } from 'react-redux'
import GeneralButton from './Button'

const CartPreview = ({navigation}) => {

    const {cart} = useSelector(state => state)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let sum = 0
        cart.forEach(element => {
            sum = sum + (element.cart_quantity*Number(element.sell_price))
        });
        setTotal(sum.toFixed(2))
    }, [cart])
        
    return(
        <Pressable style={styles.container} onPress={() => navigation.navigate('Cart')}>
            <View>
            <Text><Text style={{fontSize: 16}}>{cart ? cart.length : 0}</Text> items in cart</Text>
            <Text>Rs. <Text style={{fontSize: 16, fontWeight: '900'}}>{total}</Text></Text>
            </View>
            <GeneralButton text="Checkout ➡" onPress={() => {navigation.navigate('Checkout')}} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 5,
        shadowColor: '#0003',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        borderRadius: 15,
        backgroundColor: '#FFF',
    }
})

export default CartPreview