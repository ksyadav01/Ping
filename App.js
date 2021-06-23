import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
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
let currentUser = ""
function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName = "Home" 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-sharp'
              : 'home-outline';
          }
          else if (route.name === 'Map') {
            iconName = focused 
              ? 'ios-search-sharp' 
              : 'ios-search-outline';
          }
          else if (route.name === 'Create') {
            iconName = focused 
              ? 'add-sharp' 
              : 'add-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused 
              ? 'person-circle-sharp' 
              : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })} tabBarOptions={{
        activeTintColor: "#fc0328",
        showLabel: false
      }}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function ProfileTabs() {
  return (
    <Tab.Navigator initialRouteName = "Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-sharp'
              : 'home-outline';
          }
          else if (route.name === 'Map') {
            iconName = focused 
              ? 'ios-search-sharp' 
              : 'ios-search-outline';
          }
          else if (route.name === 'Create') {
            iconName = focused 
              ? 'add-sharp' 
              : 'add-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused 
              ? 'person-circle-sharp' 
              : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function CreateTabs() {
  return (
    <Tab.Navigator initialRouteName = "Create"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-sharp'
              : 'home-outline';
          }
          else if (route.name === 'Map') {
            iconName = focused 
              ? 'ios-search-sharp' 
              : 'ios-search-outline';
          }
          else if (route.name === 'Create') {
            iconName = focused 
              ? 'ios-add-sharp' 
              : 'ios-add-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused 
              ? 'person-circle-sharp' 
              : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function MapTabs() {
  return (
    <Tab.Navigator initialRouteName = "Map"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home-sharp'
              : 'home-outline';
          }
          else if (route.name === 'Map') {
            iconName = focused 
              ? 'ios-search-sharp' 
              : 'ios-search-outline';
          }
          else if (route.name === 'Create') {
            iconName = focused 
              ? 'add-sharp' 
              : 'add-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused 
              ? 'person-circle-sharp' 
              : 'person-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function UpdateCurrentUser(value){
  currentUser = value
  console.log("does it work i hope so")
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
        <Stack.Screen name = "Login" navigator={Stack} updateCurrentUser={UpdateCurrentUser} component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "Home" component={HomeTabs} options={{headerShown: false}}/>
        <Stack.Screen name = "Profile" component={ProfileTabs} options={{headerShown: false}}/>
        <Stack.Screen name = "Loading" component={LoadingScreen} options={{headerShown: false,gestureEnabled: false}}/>
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


