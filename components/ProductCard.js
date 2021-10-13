import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addCartItem, deleteCartItem, updateCart } from '../actions/cartActions'
import { SmallButton } from './Button'
import QuantityControl from './CartQuantityControl'

const ProductCard = ({product, image_url}) => {
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
                <Image style={{flex: 1, height: 80, width: 80}} resizeMode="contain" source={{uri: image_url}} />
            </View>
            
            <View style={ProductCardStyles.textContainer}>
                <View>
    	            <Text style={ProductCardStyles.productName}>{product.item_name}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <View>
                        <Text style={ProductCardStyles.productPrice}><Text style={{fontSize: 14}}>Rs.</Text>{product.sell_price}</Text>
                    </View>
                    {!isAdded ? 
                        <SmallButton text="Add" icon={faShoppingBag} onPress={buttonOnPressHandler}/> 
                        :
                        <QuantityControl value={itemQuantity} onPress={quantityOnPressHandler} maxQuantity={Number(product.total_stock)} />
                    }   
                </View>
            </View>
        </View>
    )
}

const ProductCardStyles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderRadius: 15
    },

    productImage: {
        marginRight: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    textContainer: {
        width: '70%',
        justifyContent: 'space-between',
    },

    productName: {
        fontFamily: 'Epilogue_500Medium',
        fontSize: 18,
    },

    subheading: {
        color: '#989D97',
        fontWeight: '600',
        fontSize: 14
    },

    productPrice: {
        fontSize: 22,
        fontFamily: 'Epilogue_800ExtraBold',
        color: '#F37A20',
    },

    buttonWrapper: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
})

export default ProductCard