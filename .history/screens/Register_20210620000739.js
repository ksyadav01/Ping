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
import { LinearGradient } from 'expo-linear-gradient';

export default function Register({navigation}) {
    const [loginData, loginChange] = React.useState('');
    const [passwordData, passwordChange] = React.useState('');
    const [loginHover, setLoginHoverColor] 	= React.useState(false);
    const [pswdHover, setPwdHoverColor] 	= React.useState(false);
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
                            onFocus={() => setLoginHoverColor(true)} onBlur={() => setLoginHoverColor(false)}
                            style={{
                                height: 40,
                                width: "75%",
                                borderBottomWidth: 1,
                                marginBottom: 36,
                                marginTop: 40,
                                borderColor: loginHover ? "#F20D54" : "#000000"}}
                            placeholder = {"Email"}
                            onChangeText={text => loginChange(text)}
                            value={loginData} 
                        />
                        <TextInput
                            onFocus={() => setPwdHoverColor(true)} onBlur={() => setPwdHoverColor(false)}
                            style={{
                                height: 40,
                                width: "75%",
                                borderBottomWidth: 1,
                                marginBottom: 36,
                                marginTop: 40,
                                borderColor: pswdHover ? "#F20D54" : "#000000"}}
                            onChangeText={text => passwordChange(text)}
                            value={passwordData} 
                            placeholder = {"Password"}
                        />
                        <LinearGradient
                            // Button Linear Gradient
                            colors={['#F20D54', '#FAE105']}
                            start={{x:0.2, y:0.1}}
                            end={{x:0.7, y:0.8}}
                            locations={[0.1, 0.7]}
                            style={styles.button}>
                            <Text style={styles.text}>Sign in with Facebook</Text>
                        </LinearGradient>
                        {/* <Button
                            title = "Sign Up"
                            onPress = {() => navigation.navigate("Register")}
                        />
                        <Button
                            title = "Register"
                            onPress = {() => navigation.navigate("Login")}
                        /> */}
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
        marginTop: "10%",
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
        alignItems: "center",
        marginTop: "15%"
    },
    inputTextField1 :{
        height: 40,
        width: "75%",
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
    },
    button :{
        height: 50,
        width: "70%",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 15
    }


})

