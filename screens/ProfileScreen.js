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
} from "@expo-google-fonts/pt-sans";
import { ActivityIndicator } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase'
import app from "../firebase/config"
import { UsersRef } from '../firebase/config';

const ProfileScreen = ({props, navigation}) => {
    //const [userData, setUserData] = useState(''); // Contains all the data of user in array format
    //Storage order:
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');
    const [email, setEmail] = useState('');
    const isFocused = useIsFocused();
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
          await setName(userData.get('nickname'))
          await setPic(userData.get('profile_picture'))
          await setEmail(userData.get('gmail'))
        }
    
        sequentialStart();
      }, [isFocused]);


    if(fontsLoaded) {
        return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
            
                <StatusBar  />
                <View style={styles.container}>
                    <Image style={styles.pic} source={{uri: pic}}></Image>
                    <Text style={styles.name}>{name}</Text>
                    <Text>{email}</Text>

                    <Button title="Edit Profile" onPress={()=>navigation.navigate("CreateProfileScreen")}></Button>
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
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    }, pic: {
        width: 200,
        height: 200,
        borderWidth: 5,
        borderColor: "#fc0328",
        borderRadius: 200,
        marginTop: "40%"
    }, name: {
        fontSize: 40,
        fontFamily: "PTSans_400Regular",
        marginTop: 10
    }


})

