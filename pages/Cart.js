import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../actions/cartActions'
import GeneralButton from '../components/Button'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'

const Cart = ({navigation}) => {

    const {cart} = useSelector((state) => state)
    
    const dispatch = useDispatch()

    return(
        <View style={styles.pageContainer}>
            <Header title="Your Cart" icons={[{icon: faTrash, onPress: dispatch(clearCart())}]} nav={navigation} />
            <ScrollView>
                {cart.length ? 
                    cart.map((item) => (<ProductCard product={item} key={item.item_code}/>))
                    :
                    <Text style={{textAlign: 'center', paddingVertical: '40%', color: '#999', fontWeight: '600'}}>Your cart is empty</Text>
            }
            </ScrollView>

            <View style={styles.buttonContainer}>
                <GeneralButton text='Proceed to checkout ➡' onPress={() => navigation.navigate('Checkout')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingTop: '10%',
        paddingHorizontal: '5%',
        height: '100%'
    },

    mainHeading: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: '10%'

    },

    buttonContainer: {
        width: '100%',
        marginVertical: '5%'
    }

})

export default Cart