import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../actions/cartActions'
import GeneralButton from '../components/Button'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'

const Cart = ({navigation}) => {

    const {cart, images} = useSelector((state) => state)

    function getImages(id) {
        const images_url = 'https://pvanam.retailtrac360.com/images_item/'
        if(images[id]) {
            return images_url+images[id]
        }
        return images_url+'Noimage.jpg'

    }
    
    const dispatch = useDispatch()

    return(
        <View style={styles.pageContainer}>
            <Header title="Your Cart" icons={[{icon: faTrash, onPress: () => {
                dispatch(clearCart())}}]} nav={navigation} />
            <ScrollView>
                {cart.length ? 
                    cart.map((item) => (<ProductCard product={item} key={item.item_code} image_url={getImages(item.item_code)} />))
                    :
                    <Text style={{textAlign: 'center', paddingVertical: '40%', color: '#EEE', fontWeight: '600'}}>Your cart is empty</Text>
            }
            </ScrollView>

            <View style={styles.buttonContainer}>
                {cart.length > 0 && <GeneralButton text='Proceed to checkout' onPress={() => navigation.navigate('Checkout')} styleType="secondary" />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingHorizontal: '5%',
        height: '100%',
        backgroundColor: '#FE595F'
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