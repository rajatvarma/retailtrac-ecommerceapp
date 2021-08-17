import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions }  from 'react-native'
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import CategoryCard from '../components/CategoryCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getCategories from '../actions/categoriesAction'
import CartPreview from '../components/CartPreview'
import Header from '../components/Header'
import { getAddresses } from '../actions/addressesAction'

const HomePage = ({navigation}) => {

    const dispatch = useDispatch();

    const {user, cart} = useSelector((state) => state)

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getAddresses(user.customer_id))
    }, [dispatch])

    const dimensions = useWindowDimensions()


    const {categories} = useSelector((state) => state.categories)

    return(
        <View style={[HomePageStyles.pageContainer, {height: dimensions.height}]}>

            <View style={HomePageStyles.headingContainer}>
                <Header title={`Welcome`} icons={[{icon: faUser, destination: 'Account'}, {icon: faShoppingCart, destination: 'Cart'}]} nav={navigation}/>
                <Text style={HomePageStyles.categoriesHeading}>{`What would you like to buy today?\n`}</Text>
            </View>
            <View style={HomePageStyles.categoriesContainer}>
                <ScrollView style={{height: '50%'}} showsVerticalScrollIndicator={false}>
                    {categories ? 
                            <View style={HomePageStyles.categoriesList}>
                                {categories.map((item) => (
                                    <Pressable onPress={() => navigation.navigate('Category', {category: item})} key={item.category}>
                                        <CategoryCard category={item}/>
                                    </Pressable>
                                ))}
                            </View>
                    :
                    <Text style={{textAlign: 'center', paddingVertical: '40%', color: '#999', fontWeight: '600'}}>Loading...</Text>
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