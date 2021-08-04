import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import SearchBar from '../components/Searchbar'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import getProductsFromCategory from '../actions/productsAction'
import CartPreview from '../components/CartPreview'
import Header from '../components/Header'
import { getImagesFromServer } from '../actions/imagesAction'


const CategoryPage = ({route, navigation}) => {
 
    const {category} = route.params
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsFromCategory(category.category));
        dispatch(getImagesFromServer())
    }, [dispatch, category])


    const {images} = useSelector(state => state)

    const {cart} = useSelector((state) => state)

    function getImages(id) {
        const images_url = 'https://pvanam.retailtrac360.com/images_item/'
        if(images[id]) {
            return images_url+images[id]
        }
        return images_url+'Noimage.jpg'

    }

    const [searchText, setSearchText] = useState('')

    const {products} = useSelector((state) => state.products)

    const checkCartForItem = (item) => {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].item_code == item.item_code) {
                return cart[i]
            }
        }
        return null
    }

    return (
        <View style={CategoryPageStyles.pageContainer}>
            <Header icons={[{icon: faArrowLeft, destination: 'Home'}, {icon: faShoppingCart, destination: 'Cart'}]} nav={navigation}/>
            <SearchBar state={searchText} setState={setSearchText}/>

            <View style={CategoryPageStyles.productsContainer}>
                {
                    (Boolean(searchText.length)) &&
                    <ScrollView style={CategoryPageStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                        {products.filter((item) => {return item.item_name.toLowerCase().includes(searchText.toLowerCase())}).map((item) => {
                            if (checkCartForItem(item)) {
                                return <ProductCard product={checkCartForItem(item)} image_url={getImages(item.item_code)} key={item.item_code}/>
                            } else {
                                return <ProductCard product={item} image_url={getImages(item.item_code)} key={item.item_code}/>
                            }
                        })}
                    </ScrollView>
                }

                {
                    products && !Boolean(searchText.length) ?

                    <ScrollView style={CategoryPageStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                        {products.map((item) => {
                            if (checkCartForItem(item)) {
                                return <ProductCard product={checkCartForItem(item)} image_url={getImages(item.item_code)} key={item.item_code}/>
                            } else {
                                return <ProductCard product={item} image_url={getImages(item.item_code)} key={item.item_code}/>
                            }
                        })}
                    </ScrollView>

                    :

                    <Text style={{textAlign: 'center', paddingVertical: '40%', color: '#999', fontWeight: '600'}}>Loading...</Text>
                }
            </View>
            <View style={{justifyContent: 'center', height: '12.5%', alignSelf: 'flex-end'}}>
                <CartPreview navigation={navigation}/>
            </View>
        </View>
    )
}

const CategoryPageStyles = StyleSheet.create({
    pageContainer: {
        height: '100%',
        paddingHorizontal: '5%',
        backgroundColor: '#FE595F'
    },

    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    productsContainer: {
    },

    scrollContainer: {
        height: '65%'
    }
})

export default CategoryPage

