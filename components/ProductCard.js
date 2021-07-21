import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem, deleteCartItem, updateCart } from '../actions/cartActions'
import GeneralButton from './Button'
import QuantityControl from './CartQuantityControl'

const ProductCard = ({product}) => {
    let qty = 0 
    if (product.cart_quantity) {
        qty = product.cart_quantity
    }

    const [isAdded, setAdded] = useState(Boolean(product.cart_quantity))
    const [itemQuantity, setQuantity] = useState(qty)
    const dispatch = useDispatch()

    const buttonOnPressHandler = () => {
        setQuantity(1)
        setAdded(true)
        dispatch(addCartItem({...product, cart_quantity: 1}))
    }

    const quantityOnPressHandler = (value) => {
        setQuantity(value)
        if (value == 0) {
            dispatch(deleteCartItem(product))
            setAdded(false)
            return 
        }
        dispatch(updateCart({...product, cart_quantity: value}))
    }

    return(
        <View style={ProductCardStyles.card}>
            <View style={ProductCardStyles.productImage}>
                <FontAwesomeIcon icon={faImage} size={42} color="#CCC"/>
            </View>
            <View style={ProductCardStyles.textContainer}>
                <View>
    	            <Text style={ProductCardStyles.productName}>{product.item_name}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <View>
                        <Text style={{fontSize: 12}}>Rs.</Text>
                        <Text style={ProductCardStyles.productPrice}>{product.sell_price}</Text>
                    </View>
                    {!isAdded ? 
                        <GeneralButton text="Add to Cart" onPress={buttonOnPressHandler}/> 
                        :
                        <QuantityControl value={itemQuantity} onPress={quantityOnPressHandler} />
                    }   
                </View>
            </View>
        </View>
    )
}

const ProductCardStyles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        margin: 5,
        paddingVertical: 15,
        paddingHorizontal: 15,
        height: 150,
        flexDirection: 'row',
        elevation: 5,
        shadowColor: '#0003',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        borderRadius: 15
    },

    productImage: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    textContainer: {
        width: '70%',
        justifyContent: 'space-between',
        height: '100%'
    },

    productName: {
        fontSize: 15,
        fontWeight: '600',
    },

    subheading: {
        color: '#989D97',
        fontWeight: '600',
        fontSize: 14
    },

    productPrice: {
        fontSize: 18,
        fontWeight: '800',
    },

    buttonWrapper: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
})

export default ProductCard