import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'

import {View, Text, StyleSheet} from 'react-native'

const SearchBar = () => {
    return(
        <View style={SearchBarStyles.searchBarContainer}>
            <View style={SearchBarStyles.searchBox}>
                <View style={SearchBarStyles.searchIconContainer}>
                    <FontAwesomeIcon icon={ faSearch }></FontAwesomeIcon>
                </View>
                <Text style>Search....</Text>
            </View>
        </View>
    )
}

const SearchBarStyles = StyleSheet.create({
    searchBarContainer: {
        marginTop: '5%',
    },
        
    searchBox: {
        backgroundColor: '#ECECEC',
        height: 35,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',        
        flexDirection: 'row'
    },

    searchIconContainer: {
        justifyContent: 'center',
        paddingHorizontal: 20
    },  
})

export default SearchBar