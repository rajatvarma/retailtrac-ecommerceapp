import { faAngleRight, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector} from 'react-redux'

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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesomeIcon icon={faShoppingBag} size={22} color="white" />
                <View style={{marginHorizontal: '10%'}}>
                    <Text style={styles.quantityText}>{cart ? cart.length : 0} item(s) in cart</Text>
                    <Text style={styles.amountText}>Rs. <Text>{total}</Text></Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.ctaText}>Proceed to Cart</Text>
                <FontAwesomeIcon icon={faAngleRight} size={22} color="white" />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        backgroundColor: '#067DFF',
        alignItems: 'center',
    },

    quantityText: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Epilogue_600SemiBold'
    },

    amountText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Epilogue_700Bold',
        marginTop: '2%'
    },

    ctaText: {
        fontFamily: 'Epilogue_700Bold',
        fontSize: 15,
        color: 'white',
    }
})

export default CartPreview