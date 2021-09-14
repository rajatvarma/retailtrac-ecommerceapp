import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions, ActivityIndicator }  from 'react-native'
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import CategoryCard from '../components/CategoryCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getCategories from '../actions/categoriesAction'
import CartPreview from '../components/CartPreview'
import Header from '../components/Header'
import { getAddresses } from '../actions/addressesAction'
import { getImagesFromServer } from '../actions/imagesAction'

const HomePage = ({navigation}) => {

    const dispatch = useDispatch();

    const {user, cart, images} = useSelector((state) => state)

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getAddresses(user.customer_id))
        dispatch(getImagesFromServer())
    }, [dispatch])

    const dimensions = useWindowDimensions()

    function getImageURL(name) {
        let base_url
        let default_url
        let image_url
        images.categories.forEach(element => {
            if (element.URL) {
                base_url = element.URL
            }
            if (element.default_image) {
                default_url = element.default_image
            }
            if (element.category_code) {
                if (element.category_code == name) {
                    image_url = base_url + element.category_images
                }
            } else {
                image_url = base_url+default_url
            }
        });
        return image_url
    }

    const {categories} = useSelector((state) => state.categories)

    return(
        <View style={[HomePageStyles.pageContainer, {height: dimensions.height}]}>

            <View style={HomePageStyles.headingContainer}>
                <Header title={`Welcome`} icons={[{icon: faUser, destination: 'Account'}, {icon: faShoppingCart, destination: 'Cart'}]} nav={navigation}/>
                <Text style={HomePageStyles.categoriesHeading}>{`What would you like to buy today?\n`}</Text>
            </View>
            <View style={HomePageStyles.categoriesContainer}>
                <ScrollView style={{height: '50%'}} showsVerticalScrollIndicator={false}>
                    {categories && images.categories ? 
                            <View style={HomePageStyles.categoriesList}>
                                {categories.map((item) => (
                                    <Pressable 
                                        onPress={() => {
                                            navigation.navigate('Category', {category: item})
                                        }}
                                        key={item.category}>
                                        <CategoryCard category={item} image_url={getImageURL(item.category)}/>
                                    </Pressable>
                                ))}
                            </View>
                    :
                    <ActivityIndicator size="large" color="#222" />
                    }
                </ScrollView>           
                {Boolean(cart.length) &&
                    <View style={{justifyContent: 'center', height: '10%'}}>
                        <CartPreview navigation={navigation}/>
                    </View>
                }
            </View>
        </View>   
    )
}

export default HomePage

const HomePageStyles = StyleSheet.create({
    pageContainer: {
        backgroundColor: '#FF595F',
        justifyContent: 'space-between'
    },

    headingContainer: {
        paddingHorizontal: '5%',
    },

    categoriesContainer: {
        paddingHorizontal: 10,
        paddingVertical: '5%',
        flexDirection: 'column',
        backgroundColor: 'white',
        height: '80%',
        justifyContent: 'space-between',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },

    categoriesHeading: {
        fontSize: 16,
        fontFamily: 'Epilogue_600SemiBold',
        color: 'white',
        marginVertical: '5%',
    },
    
    categoriesList: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'hidden'
    }
})