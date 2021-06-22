import React from 'react';
import {Text, 
    View, 
    Button, 
    SafeAreaView, 
    StyleSheet, 
    Image, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard} 
    from 'react-native'
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
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({navigation}) {
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
            <View>
                <Text>text</Text>
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
        marginTop: "15%",
        fontFamily: "Oswald_400Regular",
    },
    signin:{
        fontSize: 30,
        color: "#999999",
        paddingLeft: 20,
        fontFamily: "Oswald_400Regular",
        paddingBottom: "15%"
        //paddingTop: Constants.statusBarHeight,
    },
    inputHolder:{
        alignItems: "center",
        paddingTop: "0%"
    },
    button :{
        height: 50,
        width: "70%",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 15,
        marginTop: "15%",
        
    },
    buttonText: {
        fontSize: 28,
        color: "white",
        fontFamily: "Oswald_400Regular",
    },
    member: {
        fontFamily: "Oswald_400Regular",
        marginTop: 20
    },
    memberSignIn:{
        fontFamily: "Oswald_400Regular",
        color: "#F20D54",
        textDecorationLine: "underline"
    }


})