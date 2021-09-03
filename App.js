import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import CategoryPage from './pages/CategoryPage';
import HomePage from './pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './pages/Cart';
import SignUpPage from './pages/SignUp'
import LoginPage from './pages/Login';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { setUser } from './actions/userAction';
import { getUserData } from './userStorage';
import CheckoutPage from './pages/Checkout';
import AccountPage from './pages/Account';
import OrdersPage from './pages/CustomerOrders';
import SettingsPage from './pages/Settings';
import EditAccountPage from './pages/EditAccount';
import OrderSummaryPage from './pages/OldOrderSummary';
import PaymentGatewayPage from './pages/PaymentWebView';
import axios from 'axios';
import { loginURL } from './apiCalls';
import querystring from 'querystring'
import { useFonts, Epilogue_400Regular, Epilogue_500Medium, Epilogue_600SemiBold, Epilogue_700Bold, Epilogue_800ExtraBold, Epilogue_900Black } from '@expo-google-fonts/epilogue';
import OtpVerificationPage from './pages/OTPVerification';
import DeliveryAddresses from './pages/DeliveryAddresses';
import AddAddress from './pages/AddAddress';
import crashlytics from '@react-native-firebase/crashlytics'


const Stack = createStackNavigator();

const AppContent = () => {
  const dispatch = useDispatch()

  const loginAttempt = async () => {
      try {
        var phone = await getUserData('phone')
        var password = await getUserData('password')
      } catch (error) {
        return false
      }

      axios.post(loginURL, querystring.stringify({
        'username': phone,
        'password': password
      }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        if (response.data.user) {
          crashlytics().log('User signed in.');
          Promise.all([
            crashlytics().setUserId(response.data.user.customer_id),
          ]);

          dispatch(setUser(response.data.user))
        }        
      }).catch(e => {})
      

  }

  const {user} = useSelector((state) => state)

  useEffect(() => {
    loginAttempt()
  }, [dispatch])

  let [fontsLoaded] = useFonts({Epilogue_400Regular, Epilogue_500Medium, Epilogue_600SemiBold, Epilogue_700Bold, Epilogue_800ExtraBold, Epilogue_900Black})

  return(
    <>
    {fontsLoaded ? 
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {Object.keys(user).length ? 
                <>
                  <Stack.Screen name="Home" component={HomePage} />
                  <Stack.Screen name="Category" component={CategoryPage} />
                  <Stack.Screen name="Cart" component={Cart} />
                  <Stack.Screen name="Checkout" component={CheckoutPage} />
                  <Stack.Screen name="Account" component={AccountPage} />
                  <Stack.Screen name="Orders" component={OrdersPage} />
                  <Stack.Screen name="Settings" component={SettingsPage} />
                  <Stack.Screen name="EditAccount" component={EditAccountPage} />
                  <Stack.Screen name="Order" component={OrderSummaryPage} />
                  <Stack.Screen name="PaymentGateway" component={PaymentGatewayPage} />
                  <Stack.Screen name="UserAddresses" component={DeliveryAddresses} />
                  <Stack.Screen name="AddAddress" component={AddAddress} /> 
                </> :
                <>
                  <Stack.Screen name="Login" component={LoginPage} />
                  <Stack.Screen name="SignUp" component={SignUpPage} />
                  <Stack.Screen name="OTP" component={OtpVerificationPage} />
                </>
              }
            </Stack.Navigator>
          </NavigationContainer>
          :
          <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <ActivityIndicator size="large" color="blue" />
          </View>
      }
    </>
  )
}

export default function App() {
  
  const store = createStore(rootReducer, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <StatusBar
        hidden={true} />
      <AppContent />
    </Provider>
    );
}