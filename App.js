import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList, } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import {Text,
  View,
  Button,
  SafeAreaView, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity} from 'react-native'
//Screens

import {firebase} from './firebase/config'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoadingScreen from './screens/LoadingScreen';
import SettingScreen from './screens/SettingScreen'
import CreateScreen from './screens/CreateScreen'
import MapScreen from './screens/MapScreen'
import SignOutScreen from './screens/SignOutScreen'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
let currentUser = ""
/*
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
*/
const navOptionHandler = () => ({
  headerShown: false
})

const Drawer = createDrawerNavigator();
//ProfileScreen
const StackProfile = createStackNavigator()

function ProfileScreenStack({navigation, route}) {
  return(
    <StackProfile.Navigator
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fc0328",
          height: 75
        },}}
      
      
    >
      
      <StackProfile.Screen name="Profile" component={ProfileScreen}
        options={({ navigation })=> ({ title: 'Ping', color: "white",
        headerTitleStyle:{
          color: "white"
        },
        headerRight : ()=>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name={"menu-outline"} color="white" size={35}/>
          </TouchableOpacity>
        })} />
      {/* <HomeStack.Screen name="Png" component={ShowDrawer} /> */}
    </StackProfile.Navigator>
  );
}

//CreateScreen
const StackCreate = createStackNavigator()

function CreateScreenStack({navigation, route}) {
  return (
    <StackCreate.Navigator
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fc0328",
          height: 75
        },}}
      
      
    >
      
      <StackCreate.Screen name="Create" component={CreateScreen}
        options={({ navigation })=> ({ title: 'Ping',
          headerRight : ()=>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name={"add-sharp"} color="white" size={20}/>
            </TouchableOpacity>
          })} />
      {/* <HomeStack.Screen name="Png" component={ShowDrawer} /> */}
    </StackCreate.Navigator>
  );
}

//MapScreen
const StackMap = createStackNavigator()

function MapScreenStack({navigation, route}) {
  return (
    <StackMap.Navigator
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fc0328",
          height: 75
        },}}
      
      
    >
      
      <StackMap.Screen name="Map" component={MapScreen}
        options={({ navigation })=> ({ title: 'Ping',
          headerRight : ()=>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name={"add-sharp"} color="white" size={20}/>
            </TouchableOpacity>
          })} />
      {/* <HomeStack.Screen name="Png" component={ShowDrawer} /> */}
    </StackMap.Navigator>
  );
}


//HomeScreen
const HomeStack = createStackNavigator()

function HomeScreenStack(navigation) {
  return (
    <HomeStack.Navigator
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fc0328",
          height: 75,
        },}}
      
      
    >
      
      <HomeStack.Screen name="Home" component={HomeScreen}
        options={({ navigation })=> ({ title: 'Ping', color: "white",
          headerTitleStyle:{
            color: "white"
          },
          headerRight : ()=>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name={"menu-outline"} color="white" size={35}/>
            </TouchableOpacity>
          })} />
      {/* <HomeStack.Screen name="Png" component={ShowDrawer} /> */}
    </HomeStack.Navigator>
  );
}

// function OpenDrawer(){
//   return()
//   const navigations = useNavigation();
//     navigations.openDrawer();
// }
const CustomButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -40,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#fc0328",
      }}
    >
      {children}

      
    </View>
  </TouchableOpacity>
);

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home"
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
            //return <Image source={iconName} style={{width: 20, height: 20}} resizeMode="contain"/>;
          },
        })}
        tabBarOptions={{
          style:{
            elevation: 0,
            position: "absolute",
            left: 10,
            right: 10,
            bottom:25,
            height: 75,
            borderRadius: 15,
            backgroundColor: "#F7F6F6"
          },
          activeTintColor: "#fc0328",
          showLabel: false
        }}
      >
        <Tab.Screen name="Map" component={MapScreenStack} />
        <Tab.Screen name="Home" component={HomeScreenStack} />
        <Tab.Screen name="Middle"
          component={CreateScreenStack}
          options={{
            tabBarIcon: ({color, size}) =>(
              <Ionicons name={"add-sharp"} size={size}  color={"white"} style={{marginTop: 40}}/>
            ),
            tabBarButton: (props) => (<CustomButton {...props} />)
          }}
        />
        <Tab.Screen name="Create" component={CreateScreenStack} />
        <Tab.Screen name="Profile" component={ProfileScreenStack} />
      </Tab.Navigator>
  )
} 

{/*function temp({navigation}){
    return(
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: 150, alignItems: 'center', justifyContent: 'center'}}>
          {/* <Image source={IMAGE.ICON_PROFILE}
          style={{height: 120, width: 120, borderRadius:60}}
    /> }
      </View>
      <ScrollView style={{marginLeft: 5}}>
          <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.navigate('MenuTab')}
          >
          <Text>Menu Tab</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.navigate('Notifications')}
          >
          <Text>Notifications</Text>
          </TouchableOpacity>
      </ScrollView>

          <TouchableOpacity
          style={{marginTop: 20, marginLeft: 5}}
          onPress={() => navigation.navigate('Login')}
          >
          <Text>Logout</Text>
          </TouchableOpacity>
      </SafeAreaView>)};
        */}



function FirstItem({ navigation }) {
  return (
    <View style={{ margin: 60 }}>
      <Text style={{ fontSize: 24 }}>This is First Item screen</Text>
      <Button
        title="Open Drawer"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Button
        title="Go to Second Item"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}
export default function App() {
const CustomDrawerContent = (props) => {
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    (item) => item.name !== 'Login',
  );
  newState.routes = newState.routes.filter(
    (item) => item.name !== 'Loading',
  );
  
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  );
};
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName = "Loading" drawerPosition = "right" 
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name = "Home" component={TabNavigator} options={{headerShown: false}}/>
        <Drawer.Screen name = "Settings" component={SettingScreen} options={{headerShown: false}}/>
        <Drawer.Screen name = "SignOut" component={SignOutScreen} options={{headerShown: false}}/>
        <Drawer.Screen name = "Login"  component={LoginScreen} options={{
          headerShown: false,
        drawerLabel: ()=>null}}
          />
        <Stack.Screen name = "Loading" component={LoadingScreen} options={{headerShown: false,gestureEnabled: false}}/>
        {/*<Drawer.Screen name = "Register" component={DrawerNavigator} options={{headerShown: false}}/>
        <Drawer.Screen name = "Login"  component={LoginScreen} options={{headerShown: false}}/>
        <Drawer.Screen name = "HomeApp" component={DrawerNavigator} options={{headerShown: false}}/>
        <Drawer.Screen name = "Loading" component={LoadingScreen} options={{headerShown: false,gestureEnabled: false}}/> */}
        {/* <Stack.Screen name = "Profile" component={ProfileTabs} options={{headerShown: false}}/>
        <Stack.Screen name = "Loading" component={LoadingScreen} options={{headerShown: false,gestureEnabled: false}}/>
        <Stack.Screen name = "Create" component={CreateTabs} options={{headerShown: false}}/>
        <Stack.Screen name = "Map" component={MapTabs} options={{headerShown: false}}/> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



