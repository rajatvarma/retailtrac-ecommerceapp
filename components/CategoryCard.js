import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native'

const CategoryCard = ({category, image_url}) => {
    const dimensions = useWindowDimensions()
    console.log(image_url)
    return(
        <View style={[styles.container, {
            width: dimensions.width*0.40,
        }]}>
            <View style={styles.categoryImage}>
                <Image style={{height: 100, width: 100}} source={{uri: image_url}}></Image>
            </View>
            <View>
                <Text style={styles.categoryName}>{category.category}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 7,
        shadowColor: '#0004',
        shadowOffset:{height: 2, width: 0},
        shadowRadius: 5,
        shadowOpacity: 0.9,
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10
    },

    categoryImage: {
        height: 100,
        flex: 2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    categoryName: {
        textAlign: 'center',
        fontFamily: 'Epilogue_600SemiBold',
        fontSize: 16,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        paddingTop: 10
    }
})

export default CategoryCard