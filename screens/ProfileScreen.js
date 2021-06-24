import React, {Component} from 'react';
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

import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase'
import app from "../firebase/config"
import { useEffect } from 'react/cjs/react.production.min';
const ProfileScreen = ({props, navigation}) => {
    
    let [fontsLoaded] = useFonts({
        PTSans_400Regular
    });
    let name = ""
    let pic = ""
    let email = ""
    let uid = ""
    const user = firebase.auth().currentUser
    if(user !== null) {
        name = user.displayName;
        pic = user.photoURL;
        email = user.email;
        console.log(pic)
    }


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

                    <Button title="Sign out" onPress={()=>firebase.auth().signOut()}></Button>
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