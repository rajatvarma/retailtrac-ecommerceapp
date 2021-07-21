import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'

const CategoryCard = ({category}) => {
    dimensions = useWindowDimensions()
    return(
        <View style={[styles.container, {
            width: dimensions.width*0.45, 
            // height: dimensions.height*0.3
        }]}>
            <View style={styles.categoryImage}>
                <FontAwesomeIcon icon={faImage} size={64} color="#CCC"/>
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
        shadowColor: '#0002',
        shadowOffset:{height: 2, width: 1},
        shadowRadius: 3,
        shadowOpacity: 0.9,
        marginHorizontal: 2,
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
        fontSize: 16,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        paddingTop: 10
    }
})

export default CategoryCard