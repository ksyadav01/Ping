import React from 'react'
import {Text, 
    View, 
    Button, 
    SafeAreaView, 
    StyleSheet, 
    Image, 
    KeyboardAvoidingView, 
    Keyboard,
    TouchableWithoutFeedback} from 'react-native'
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
    let [fontsLoaded] = useFonts({
        Oswald_400Regular
      });
    if (fontsLoaded){
        return (
        <SafeAreaView style={styles.wrapper}>
            
            <StatusBar style="dark" />
            <KeyboardAvoidingView>
                    <Text style={styles.welcome}>
                        Create Account,
                    </Text>
                    <Text style={styles.signin}>
                        Sign up to get started!
                    </Text>
                    <View style={styles.inputHolder}>
                        <Image source={logo} style={{ width: 200, height: 200 }} /> 
                        <TextInput
                            style={styles.inputTextField}
                            onChangeText={text => loginChange(text)}
                            value={loginData} 
                        />
                        <TextInput
                            style={styles.inputTextField}
                            onChangeText={text => passwordChange(text)}
                            value={passwordData} 
                        />
                    </View>
                    
                    <Button
                        title = "Sign Up"
                        onPress = {() => navigation.navigate("Register")}
                    />
                    <Button
                        title = "Register"
                        onPress = {() => navigation.navigate("Login")}
                    />
            </KeyboardAvoidingView>
        </SafeAreaView>
        )
    }
    else {
        return <View></View>
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: Constants.statusBarHeight,

        //justifyContent: 'center'
    },
    welcome:{
        fontSize: 50,
        paddingLeft: 20,
        paddingTop: 50,
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
    inputTextField :{
        height: 40,
        width: "40%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,

    }
})

