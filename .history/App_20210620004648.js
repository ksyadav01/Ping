import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens

import {firebase} from './firebase/config'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Register">
        <Stack.Screen name = "Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Login" component={LoginScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


