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
const SettingScreen = ({props, navigation}) => {
    
    let [fontsLoaded] = useFonts({
        Oswald_400Regular
    });

    if (fontsLoaded){
        return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
            
            <StatusBar style="dark" />
            <View style={styles.container}>
                <Text>Home Screen</Text>
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
export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }


})