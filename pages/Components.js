import React from 'react'
import { View } from 'react-native'
import GeneralButton from '../components/Button'
import ProductCard from '../components/ProductCard'


const ComponentsPage = () => {
    const data = {
        item_name: 'Item Name',
        sell_price: 2000,
        measure: 20
    }

    return(
        <View style={{marginTop: '10%'}}>
            <GeneralButton text='Add to Cart'/>
        </View>
    )
}

export default ComponentsPage