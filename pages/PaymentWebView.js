import { faCheck, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { useDispatch } from 'react-redux'
import { clearCart } from '../actions/cartActions'
import GeneralButton from '../components/Button'
import { logTransactionToServer } from '../paymentGatewayHandler'

const PaymentGatewayPage = ({route, navigation}) => {
    const {url, data, so_code} = route.params
    const webViewRef = useRef(null)
    const runFirst = `
      window.ReactNativeWebView.postMessage(document.getElementsByTagName("body")[0].innerText);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

    const [isTransationFinished, setTransactionFinished] = useState(false)
    const [transactionStatus, setTransactionStatus] = useState('')

    const StatusCard = () => {

      let text = "";
      let icon;
      let iconBackgroundColor = '';

      if(transactionStatus === "success") {
        text = 'Your transaction was successful! \n Thank you for ordering from us.'
        icon = faCheck
        iconBackgroundColor = "green"
      } else if (transactionStatus === "failed") {
        text = 'Your transaction was unsuccessful! \n Please try again or contact your bank to resolve this.'
        icon = faTimes
        iconBackgroundColor = "#C50E13"
      } else if(transactionStatus === "aborted") {
        text = 'Your transaction has been cancelled.'
        icon = faExclamationTriangle
        iconBackgroundColor = "#F1A738"
      }

      const styles = StyleSheet.create({
        container: {
          marginTop: '40%',
          borderRadius: 10,
          justifyContent: 'center',
          backgroundColor: '#FF595F',
          padding: '5%',
          marginHorizontal: '5%'
        },

        iconContainer: {
          padding: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 1000,
          alignSelf: 'center',
          marginVertical: '5%'
        },

        text: {
          color: 'white',
          fontSize: 20,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '5%'
        }
      })

      const dispatch = useDispatch()

      return(
        <View style={styles.container}>
          {icon &&
          <View style={[styles.iconContainer, {backgroundColor: iconBackgroundColor}]}>
            <FontAwesomeIcon icon={icon} color="white" size={25} />
          </View>
          }
          <Text style={styles.text}>{text}</Text>
          <GeneralButton text='OK' onPress={() => {
            if(transactionStatus === 'success') {
              logTransactionToServer(data, so_code)
              dispatch(clearCart())
            }
            navigation.navigate('Home')
          }} />
        </View>
      )
    }

    console.log(transactionStatus, isTransationFinished)

    return (
      <View style={{ flex: 1}}>
        {isTransationFinished ? <StatusCard />
        :
        <WebView
          source={{
            uri: url,
          }}
          startInLoadingState={true}
          renderLoading={()=>(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18}}>Please Wait while we process your order....</Text>
                <ActivityIndicator color="black" size="large"/>
            </View>
          )}
          ref={webViewRef}
          onMessage={
            (event) => {
              console.log(event.nativeEvent.url)
                  if (event.nativeEvent.data.includes('Successful')) {
                      setTransactionFinished(true)
                      setTransactionStatus('success')
                      console.log('Success')
                  } else if(event.nativeEvent.data.includes('Unsuccessful')) {
                      setTransactionFinished(true)
                      setTransactionStatus('failed')
                      console.log('Fail')
                  }
              if (event.nativeEvent.data.includes('Aborted')) {
                setTransactionFinished(true)
                setTransactionStatus('aborted')
                console.log('Aborted') 
              }
            }}
          injectedJavaScript={runFirst}
        />
        }
      </View>
    )
}

export default PaymentGatewayPage