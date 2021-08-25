import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

import { View, Text, StyleSheet, Pressable } from 'react-native';

export default ({radioed, address, navigation}) => {

    return (
        <View style={[styles.container, {width: radioed ? '95%' : '100%'}]}>
            <View>
                <Text style={styles.title}>{address.customerName ? address.customerName : 'Primary Address'}</Text>
                <Text style={styles.text}>{address.address},{'\n'}{address.area}</Text>
                <Text style={styles.text}>{address.city}, {address.pincode}</Text>  
            </View>
            {address.id !== 0 &&
            <View style={styles.iconsContainer}>
                <Pressable style={[styles.iconContainer, {backgroundColor: '#F37A20'}]} onPress={() => navigation.navigate('AddAddress', {address: address})}>
                    <FontAwesomeIcon icon={faPen} color='white' size={16} />
                </Pressable>
                {/* <Pressable style={[styles.iconContainer, {backgroundColor: 'grey'}]} onPress={() => {}}>
                    <FontAwesomeIcon icon={faTrash} color='white' size={16} />
                </Pressable> */}
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#E1E1E1'
    },

    title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: '2.5%'
    },

    text: {
        fontSize: 16,
        fontWeight: '400'
    },

    iconsContainer: {
    },

    iconContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '10%',
        borderRadius: 100
    }

})

