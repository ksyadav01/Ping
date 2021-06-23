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
    Roboto_400Regular,
    Oswald_400Regular,
    OpenSans_400Regular,
    Oswald_200ExtraLight
  } from "@expo-google-fonts/dev";
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase'
import { useEffect } from 'react/cjs/react.production.min';
const ShowDrawer = ({props, navigation}) => {
    
    firebase.auth().signOut()
        
    return null

}
export default ShowDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }


})