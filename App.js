import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
//Screens

import {firebase} from './firebase/config'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import LoadingScreen from './screens/LoadingScreen';

const Stack = createStackNavigator();
export default function App() {
  // checkIfLoggedIn = () => {
  //   firebase.auth().onAuthStateChanged(function(user){
  //     if (user){
  //       navigation.navigate('Login')
  //     }
  //   }
  // }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Loading">
        <Stack.Screen name = "Register" navigator={Stack} component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Login" navigator={Stack} component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Loading" component={LoadingScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  HomeScreen: HomeScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator)


