import React, {Component, useState, useEffect} from 'react';
import {Text,
    View,
    Button,
    SafeAreaView, 
    StyleSheet, 
    Image, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity} from 'react-native'
import {
    useFonts,
    PTSans_400Regular
  } from "@expo-google-fonts/dev";
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker';
import { UsersRef } from '../firebase/config';0

const DrawerContent = ({props, navigation}) => {
    const [name, setName] = useState('Anonymous User');
    const [pic, setPic] = useState('https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png');
    const [email, setEmail] = useState('');
    const [eventsJoined, setEventsJoined] = useState("0");
    const [eventsCreated, setEventsCreated] = useState("0");
    //const { state, ...rest } = props;
    //const newState = { ...state };
    let userData = new Map()
    
    let [fontsLoaded] = useFonts({
        PTSans_400Regular
    });
    //const user =  firebase.auth().currentUser
    useEffect(function effectFunction() {
        async function fetchUsers() {
          const user = firebase.auth().currentUser
          var userRef = UsersRef.doc(user.uid);
          try {
            var doc = await userRef.get();
            const data = await doc.data();
            let counter = 0;
            let dataVals = Object.values(data);
            let keys = Object.keys(data)
            keys.forEach((key)=>{
                userData.set(key, dataVals[counter])
                counter = counter +1;
            })
          } catch (error) {
            console.log("retrieving error")
          }
        }
    
    // Defining what sequence of the async get() functions - check out mozilla article
        async function sequentialStart() {
          await fetchUsers();
           setName(userData.get('nickname'))
           setPic(userData.get('profile_picture'))
           setEmail(userData.get('gmail'))
           setEventsJoined(userData.get('number_events_joined'))
           setEventsCreated(userData.get('number_events_hosted'))
        //   newState.routes = newState.routes.filter(
        //     (item) => item.name !== 'Login',
        //   );
        //   newState.routes = newState.routes.filter(
        //     (item) => item.name !== 'Loading',
        //   );
        }
    
        sequentialStart();
      });



    const paperTheme = useTheme();
    //const { signOut, toggleTheme } = React.useContext(AuthContext);
    if (fontsLoaded){
        return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
            
            <StatusBar style="dark" />
            <View style={{flex:1}}>

            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: pic
                                }}
                                size={60}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{name}</Title>
                                {/* <Caption style={styles.caption}>@j_doe</Caption> */}
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>{eventsCreated}</Paragraph>
                                <Caption style={styles.caption}>Events Created</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>{eventsJoined}</Paragraph>
                                <Caption style={styles.caption}>Events Joined</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons 
                                name="person-circle-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {navigation.navigate('Profile')}}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => {props.navigation.navigate('Create')}}
                        /> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {navigation.navigate('Settings')}}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {navigation.navigate('Map')}}
                        /> */}
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    
                    label="Terms of Service"
                    onPress={() => {navigation.navigate('SignOut')}}
                />
            </Drawer.Section>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Ionicons 
                        name="exit-outline" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {navigation.navigate('SignOut')}}
                />
            </Drawer.Section>
        </View>


        </SafeAreaView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        

        )
    }
    else {
        return <View></View>
    }
    

}
export default DrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    CreateEvent:{
        fontSize: 45,
        fontFamily: "PTSans_400Regular",
        marginTop: "5%"
    },
    drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 20,
      },
      title: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 15,
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },


})