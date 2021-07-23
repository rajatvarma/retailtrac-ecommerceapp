import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Header = ({title, icons, nav}) => {
    let iconsList = []

    if (icons) {
        for (var i=0; i < icons.length; i++) {
            const destination = icons[i].destination
            const onPress = icons[i].onPress
            iconsList.push(
                <Pressable style={styles.icon} onPress={destination ? () => nav.navigate(destination) : onPress ? () => {
                    console.log('Pressed')
                        onPress
                    } : ()=>{}} key={i}>
                    <FontAwesomeIcon icon={icons[i].icon} size={24}></FontAwesomeIcon>
                </Pressable>
            )
        }
    }

    return(
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            {iconsList}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: '5%',
        width: '100%',
        borderBottomWidth: 1,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    title: {
        flex: 8,
        fontSize: 28,
        fontWeight: '700',
    },

    icon: {
        paddingVertical: 5,
        paddingHorizontal: 15
    }
})

export default Header