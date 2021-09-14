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
        let base_url
        let default_url
        let image_url
        images.products.forEach(element => {
            if(element.URL) {
                base_url = element.URL
            }
            if (element['default_image']) {
                default_url = element['default_image']
            } 
            if (element.item_code) {
                if (element.item_code == id) {
                    image_url = base_url+element.item_image
                }
            } else {
                image_url = base_url+default_url
            }
        });
        return image_url
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
                {cart.length > 0 ? 
                    <GeneralButton text='Proceed to CheckOut' onPress={() => navigation.navigate('Checkout')} styleType="secondary" />
                    :
                    <GeneralButton text="Continue Shopping" onPress={() => navigation.navigate('Home')} styleType="primary" />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        paddingHorizontal: '5%',
        height: '100%',
        backgroundColor: '#FF595F'
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