import React from 'react';
import {Text, View, Button, SafeAreaView, StyleSheet, Image, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native'
import {
    useFonts,
    Roboto_400Regular,
    Oswald_400Regular,
    OpenSans_400Regular,
    Oswald_200ExtraLight
  } from "@expo-google-fonts/dev";
import { TextInput } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import logo from "../assets/Logo.png"

export default function Register({navigation}) {
    const [loginData, loginChange] = React.useState('');
    const [passwordData, passwordChange] = React.useState('');
    const [textHover, setHoverColor] 	= React.useState(false);
    let [fontsLoaded] = useFonts({
        Oswald_400Regular
      });
    //let handleFocus = () => setHoverColor(true)

    //let handleBlur = () => setHoverColor(false)
    if (fontsLoaded){
        return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
            
            <StatusBar style="dark" />
            <KeyboardAvoidingView style={styles.test}>
                    <Text style={styles.welcome}>
                        Create Account,
                    </Text>
                    <Text style={styles.signin}>
                        Sign up to get started!
                    </Text>
                    <View style={styles.inputHolder}>
                        
                        <TextInput
                            //onFocus={() => setHoverColor(true)} onBlur={() => setHoverColor(false)}
                            style={styles.inputTextField1, {borderColor: textHover ? "#000000" : "#F20D54"}}
                            placeholder = {"Email"}
                            onChangeText={text => loginChange(text)}
                            value={loginData} 
                        />
                        <TextInput
                            style={styles.inputTextField2}
                            onChangeText={text => passwordChange(text)}
                            value={passwordData} 
                            placeholder = {"Password"}
                        />
                    
                        <Button
                            title = "Sign Up"
                            onPress = {() => navigation.navigate("Register")}
                        />
                        <Button
                            title = "Register"
                            onPress = {() => navigation.navigate("Login")}
                        />
                    </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        

        )
    }
    else {
        return <View></View>
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: Constants.statusBarHeight,

        //justifyContent: 'center'
    },
    test: {
        
        justifyContent: "space-around"
    },
    welcome:{
        fontSize: 50,
        paddingLeft: 20,
        marginTop: 50,
        fontFamily: "Oswald_400Regular",
    },
    signin:{
        fontSize: 30,
        color: "#999999",
        paddingLeft: 20,
        fontFamily: "Oswald_400Regular",
        //paddingTop: Constants.statusBarHeight,
    },
    inputHolder:{
        alignItems: "center"
    },
    inputTextField1 :{
        height: 40,
        width: "75%",
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
        marginTop: 40

    },
    inputTextField2 :{
        height: 40,
        width: "75%",
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    }

})

