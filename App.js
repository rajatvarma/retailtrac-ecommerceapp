import React, { createContext, useContext, useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import CategoryPage from './pages/CategoryPage';
import HomePage from './pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './pages/Cart';
import SignUpPage from './pages/SignUp'
import LoginPage from './pages/Login';
import { Provider, useDispatch, useSelector, useStore } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import ComponentsPage from './pages/Components';
import getUser, { setUser } from './actions/userAction';
import { getUserData } from './userStorage';
import CheckoutPage from './pages/Checkout';
import AccountPage from './pages/Account';
import OrdersPage from './pages/CustomerOrders';
import SettingsPage from './pages/Settings';
import EditAccountPage from './pages/EditAccount';
import OrderSummaryPage from './pages/OldOrderSummary';
import PaymentGatewayPage from './pages/PaymentWebView';


const Stack = createStackNavigator();

const AppContent = () => {

  const {user} = useSelector((state) => state)

  const dispatch = useDispatch()

  // const user = {
  //   addressLine1: "Plot 1169, Road 56",
  //   addressLine2: "Jubilee Hills",
  //   city: "Hyderabad",
  //   company_user: "superuser",
  //   customer_id: "CI100115",
  //   customer_name: "Rajat",
  //   email: "rvar@codonsoft.com",
  //   latitude: " ",
  //   location: "PrakruthiVanam",
  //   longitude: " ",
  //   pincode: "500033",
  //   telephone1: "9871994814",
  //   telephone2: "",
  // }

  useEffect(() => {
    dispatch(setUser(user))
  })


  return(
    <>
    {false ? <View><Text>Loading.....</Text></View> :
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
                </> :
                <>
                  <Stack.Screen name="SignUp" component={SignUpPage} />
                  <Stack.Screen name="Login" component={LoginPage} />
                </>
              }
            </Stack.Navigator>
          </NavigationContainer>
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
    // <ComponentsPage />
  );
}