import React from 'react';
import {Text, View, Button, SafeAreaView, StyleSheet, Image, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native'
import {
    useFonts,
    Roboto_400Regular,
    Oswald_400Regular,
    OpenSans_400Regular,
    Oswald_200ExtraLight
  } from "@expo-google-fonts/dev";
import { TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import logo from "../assets/Logo.png"
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase';
export default function Register({navigation}) {
    const [loginData, loginChange] = React.useState('');
    const [passwordData, passwordChange] = React.useState('');
    const [loginHover, setLoginHoverColor] 	= React.useState(false);
    const [pswdHover, setPwdHoverColor] 	= React.useState(false);
    let [fontsLoaded] = useFonts({
        Oswald_400Regular
      });
<<<<<<< HEAD
    
=======
    //let handleFocus = () => setHoverColor(true)

    //let handleBlur = () => setHoverColor(false)

    let params = {
        name: 'James',
        email: 'karan.yadav@stonybrook.edu'
    }
    let emailSendData = {
        service_id: 'service_xbc6r9l',
        template_id: 'template_vg4uznw',
        user_id: 'user_TpxqHiaC51mHQQ2EPFKzQ',
        template_params: {
            'name': 'James',
            'email': 'karan.yadav@stonybrook.edu'
        }
    }
    function sendEmail() {
        //e.preventDefault();
        alert("test")
        emailjs.send('service_xbc6r9l', 'template_vg4uznw', params, 'user_TpxqHiaC51mHQQ2EPFKzQ')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }
      
>>>>>>> 1c72ce6 (sorta works)
    
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
                    <View>
                        {
                            (!loginHover && !pswdHover )&&
                            <Text style={styles.signin}>
                                Sign up to get started!
                            </Text>
                        }
                    </View>
                    <View style={styles.inputHolder}>
                        <TextInput
                            onFocus={() => setLoginHoverColor(true)} onBlur={() => setLoginHoverColor(false)}
                            label="Title"
                            style={{
                                height: 40,
                                width: "75%",
                                borderBottomWidth: 1,
                                marginBottom: 36,
                                marginTop: 150,
                                borderColor: loginHover ? "#F20D54" : "#000000"}}
                            placeholder = {"Email"}
                            onChangeText={text => loginChange(text)}
                            value={loginData} 
                        />
                        {/* <TextInput
                            onFocus={() => setPwdHoverColor(true)} onBlur={() => setPwdHoverColor(false)}
                            style={{
                                height: 40,
                                width: "75%",
                                borderBottomWidth: 1,
                                marginBottom: 36,
                                marginTop: 40,
                                borderColor: pswdHover ? "#F20D54" : "#000000"}}
                            secureTextEntry={true}
                            onChangeText={text => passwordChange(text)}
                            value={passwordData} 
                            placeholder = {"Password"}
                        /> */}
                        <TouchableOpacity style={styles.button}>

                            <LinearGradient
                                // Button Linear Gradient
                                colors={['#F20D54', '#FAE105']}
                                start={{x:0.1, y:0.1}}
                                end={{x:0.9, y:0.8}}
                                locations={[0.1, 0.9]}
                                style={styles.button}
                                //onPress={sendEmail}
                                >
                                <Text style={styles.buttonText}>Create Account</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* <Button
                            title = "Sign Up"
                            onPress = {() => navigation.navigate("Register")}
                        />
                        <Button
                            title = "Register"
                            onPress = {() => navigation.navigate("Login")}
                        /> */}
                        <Text style={styles.member}>Im already a member.&nbsp; 
                            <Text onPress={() => navigation.navigate('Login')}
                                style={styles.memberSignIn}> 
                                Sign in
                            </Text>
                            
                        </Text>
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
        marginTop: 20,
        fontFamily: "Oswald_400Regular",
    },
    memberSignIn:{
        fontFamily: "Oswald_400Regular",
        color: "#F20D54",
        textDecorationLine: "underline"
    }


})

