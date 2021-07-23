import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'

import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native'

const SearchBar = ({state, setState}) => {
    return(
        <View style={SearchBarStyles.searchBarContainer}>
            <View style={SearchBarStyles.searchBox}>
                <View style={SearchBarStyles.searchIconContainer}>
                    <FontAwesomeIcon icon={ faSearch }></FontAwesomeIcon>
                </View>
                <TextInput 
                    style={SearchBarStyles.input}
                    placeholder="Search" 
                    value={state}
                    onChangeText={(val) => {setState(val)}}/>
                <Pressable style={SearchBarStyles.searchIconContainer} onPress={() => {setState('')}}>
                    <FontAwesomeIcon icon={ faTimes } size={14} color='grey'></FontAwesomeIcon>
                </Pressable>
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
        width: '100%',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',        
        flexDirection: 'row'
    },

    searchIconContainer: {
        justifyContent: 'center',
        width: '10%',
        paddingHorizontal: 10
    }, 
    
    input: {
        width: '80%'
    }
})

export default SearchBar