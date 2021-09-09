import React from 'react'
import { StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const GeneralButton = ({text, onPress, styleType, ...props}) => {
    var styles = styles_primary

    if (styleType == 'primary') {
        var styles = styles_primary
    } else if (styleType == 'secondary') {
        var styles = styles_secondary
    }


    return (
        <> 
        {(styleType == 'secondary') ?
            <Pressable onPress={() => {onPress()}}>  
                <LinearGradient
                    start={{x: 0.1, y: 0}}
                    end={{x:0.9, y: 0}}
                    colors={['#00C2FF', '#0066FF']}
                    style={styles.container}>
                    {props.isLoading && <ActivityIndicator animating={true} size='small' color='white' /> }
                    <Text style={styles.text}>{!props.isLoading ? text : 'Please Wait...'}</Text>
                </LinearGradient>
            </Pressable>

            :

            <Pressable style={styles.container} onPress={() => {onPress()}}>  
                    <Text style={styles.text}>{text}</Text>
            </Pressable>

            }
        </>

    )
}

const styles_primary = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        borderRadius: 5,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    text: {
        color: '#C6012C',
        fontFamily: 'Epilogue_700Bold',
        fontSize: 20,
        textAlign: 'center',
    }

})

const styles_secondary = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Epilogue_700Bold',
        textAlign: 'center',
    }

})

export const SmallButton = ({icon, text, onPress}) => {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: '#067DFF',
            padding: '5%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },

        text: {
            color: 'white',
            textAlign: 'center',
            fontSize: 14,
            fontFamily: 'Epilogue_700Bold',
        }
    })

    return(
        <Pressable style={styles.container} onPress={() => onPress()}>
            {icon && <FontAwesomeIcon icon={icon} size={12} color="white" style={{marginRight: '10%'}} />}
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

export default GeneralButton