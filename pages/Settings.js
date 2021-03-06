import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Option from '../components/Option'
import {WebView} from 'react-native-webview'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faDollarSign, faLock, faPhone, faPortrait, faTimes } from '@fortawesome/free-solid-svg-icons'
import { BannerHeader } from '../components/Header'

const SettingsPage = () => {

    const urls = {
        aboutUs: 'https://prakruthivanam.com/about-us/',
        contactUs: 'https://prakruthivanam.com/contact-us/',
        refund: 'https://prakruthivanam.com/cancellation-and-refund-policy/',
        terms: 'https://prakruthivanam.com/terms-and-conditions/',
        privacyPolicy: 'https://prakruthivanam.com/privacy-policy/'
    }

    const [showWebView, setWebView] = useState(false)
    const [url, setUrl] = useState('')

    return(
        <>
        {!showWebView ? 
        <View style={styles.pageContainer}>
            <BannerHeader title="Policies" />
            <View>
                <Option text="About Us" icon={faPortrait} onPress={()=>{
                    setUrl(urls.aboutUs)
                    setWebView(true)
                }}/>
                <Option text="Terms & Conditions" icon={faCheckCircle} onPress={()=>{
                    setUrl(urls.terms)
                    setWebView(true)
                }}/>
                <Option text="Refund & Cancellation Policy" icon={faDollarSign} onPress={()=>{
                    setUrl(urls.refund)
                    setWebView(true)
                }}/>
                <Option text="Privacy Policy" icon={faLock} onPress={()=>{
                    setUrl(urls.privacyPolicy)
                    setWebView(true)
                }}/>
                <Option text="Contact Us" icon={faPhone} onPress={()=>{
                    setUrl(urls.contactUs)
                    setWebView(true)
                }}/>
            </View>
        </View>
        :
        <View style={styles.pageContainer}>
            <Pressable onPress={() => {setWebView(false)}} style={{margin: '2.5%', alignSelf: 'flex-end'}}>
                <FontAwesomeIcon icon={faTimes} size={24} />
            </Pressable>
            <WebView source={{uri: url}} />
        </View>
        }
        </>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        height: '100%'
    },

    buttonContainer: {
        width: '100%',
        marginVertical: '5%'
    },
})

export default SettingsPage