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
                        onPress
                    } : ()=>{}} key={i}>
                    <FontAwesomeIcon icon={icons[i].icon} size={24} color="white"></FontAwesomeIcon>
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
        // flex: 1,
        backgroundColor: '#FF595F',
        width: '100%',
        paddingTop: '7.5%',
        paddingBottom: '2.5%',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        flex: 8,
        fontSize: 30,
        fontFamily: 'Epilogue_700Bold',
        color: 'white'

    },

    icon: {
        paddingVertical: 5,
        paddingHorizontal: 15
    }
})

export const BannerHeader = ({title}) => {

    const bannerHeaderStyles = StyleSheet.create({
        container: {
            height: '12.5%',
            backgroundColor: '#FF595F',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
    
        title: {
            flex: 8,
            fontSize: 30,
            textAlign: 'center',
            fontFamily: 'Epilogue_600SemiBold',
            color: 'white'
    
        }
    })

    return(
        <View style={bannerHeaderStyles.container}>
            {title && <Text style={bannerHeaderStyles.title}>{title}</Text>}
        </View>
    )
}

export default Header