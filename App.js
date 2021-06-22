import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
//Screens

import {firebase} from './firebase/config'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoadingScreen from './screens/LoadingScreen';
import CreateScreen from './screens/CreateScreen'
import MapScreen from './screens/MapScreen'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName = "Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function ProfileTabs() {
  return (
    <Tab.Navigator initialRouteName = "Profile">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Map" component={ProfileScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function CreateTabs() {
  return (
    <Tab.Navigator initialRouteName = "Create">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function MapTabs() {
  return (
    <Tab.Navigator initialRouteName = "Map">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
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
        <Stack.Screen name = "Home" component={HomeTabs} options={{headerShown: false}}/>
        <Stack.Screen name = "Profile" component={ProfileTabs} options={{headerShown: false}}/>
        <Stack.Screen name = "Loading" component={LoadingScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Create" component={CreateTabs} options={{headerShown: false}}/>
        <Stack.Screen name = "Map" component={MapTabs} options={{headerShown: false}}/>
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


