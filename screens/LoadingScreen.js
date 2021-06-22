import React, {useEffect} from 'react';
import {Text, View, Button, SafeAreaView, StyleSheet, Image, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native'
import {
    useFonts,
    Roboto_400Regular,
    Oswald_400Regular,
    OpenSans_400Regular,
    Oswald_200ExtraLight
  } from "@expo-google-fonts/dev";
import { ActivityIndicator } from 'react-native';

import firebase from 'firebase'
const LoadingScreen = ({props, navigation}) => {
    
    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  });
                navigation.navigate('Home')
            }
            else {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  });
                navigation.navigate('Login')
            }
        })
    }
    checkIfLoggedIn();

    useEffect(()=>{
        navigation.navigate('Login')
    })
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text>test</Text>
        </View>
    )
    

}
export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }


})