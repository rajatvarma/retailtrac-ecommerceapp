import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions }  from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPersonBooth, faPortrait, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import CategoryCard from '../components/CategoryCard'
import SearchBar from '../components/Searchbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getCategories from '../actions/categoriesAction'
import CartPreview from '../components/CartPreview'
import Header from '../components/Header'

const HomePage = ({navigation}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const dimensions = useWindowDimensions()


    const {categories} = useSelector((state) => state.categories)
    const {user} = useSelector((state) => state)

    return(
        <View style={[HomePageStyles.pageContainer, {height: dimensions.height}]}>

            <Header title={`Welcome`} icons={[{icon: faUser, destination: 'Account'}, {icon: faShoppingCart, destination: 'Cart'}]} nav={navigation}/>

            <SearchBar />

            <View style={HomePageStyles.categoriesContainer}>
                <Text style={HomePageStyles.categoriesHeading}>{`What would you like to buy today?\n`}</Text>
                {categories ? 
                    <ScrollView style={HomePageStyles.categoriesListContainer}>
                        <View style={HomePageStyles.categoriesList}>
                            {categories.map((item) => (
                                <Pressable onPress={() => navigation.navigate('Category', {category: item})} key={item.category}>
                                    <CategoryCard category={item}/>
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>                
                :
                <Text style={{textAlign: 'center', paddingVertical: '40%', color: '#999', fontWeight: '600'}}>Loading...</Text>
                }
            </View>
            <CartPreview navigation={navigation}/>
        </View>   
    )
}

export default HomePage

const HomePageStyles = StyleSheet.create({
    pageContainer: {
        paddingHorizontal: '3%',
        paddingVertical: '10%',
    },

    headingContainer: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: '5%'
    },

    mainHeading: {
        fontSize: 22,
        fontWeight: 'bold',
    },

    categoriesContainer: {
        flexDirection: 'column',
        marginTop: '5%',
    },

    categoriesListContainer: {
        height: '65%'
    },

    categoriesHeading: {
        fontSize: 16,
        fontWeight: '400',
    },
    
    categoriesList: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-between'
    }
})