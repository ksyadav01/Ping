import React, { Component } from 'react';
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
import { TextInput } from 'react-native';
import * as Google from 'expo-google-app-auth';
//import * as Google from 'expo-google-sign-in';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import logo from "../assets/Logo.png"
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react/cjs/react.production.min';
import firebase from 'firebase'
const LoginScreen = ({props, navigation}) => {
    
    const [loginData, loginChange] = React.useState('');
    const [passwordData, passwordChange] = React.useState('');
    const [loginHover, setLoginHoverColor] 	= React.useState(false);
    const [pswdHover, setPwdHoverColor] 	= React.useState(false);
    const [name, setName] = React.useState("");
    let [fontsLoaded] = useFonts({
        Oswald_400Regular
    });

    isUserEqual = (googleUser, firebaseUser)=> {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
    }


    onSignIn = (googleUser) =>{
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                //googleUser.getAuthResponse().id_token
                googleUser.idToken,
                googleUser.accessToken
                );
      
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).then(function(result){
                console.log("user signed in")
                if(result.additionalUserInfo.isNewUser){
                    firebase
                    .database()
                    .ref('/users/' + result.user.uid)
                    .set({
                        gmail: result.user.email,
                        profile_picture: result.additionalUserInfo.profile.picture,
                        locale: result.additionalUserInfo.profile.picture,
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name: result.additionalUserInfo.profile.family_name,
                        created_at: Date.now()
                    })
                }
                else{
                    firebase
                    .database()
                    .ref('/users/' + result.user.uid).update({
                        last_logged_in: Date.now()
                    })
                }
            }).catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
    }
    signInWithGoogleAsync = async()=> {
        try {
          const result = await Google.logInAsync({
            behavior: "web",
            androidClientId: "307902833105-brikld3kgipjf1tohfn1h3a8bj2qi63g.apps.googleusercontent.com",
            iosClientId: "307902833105-rvcs6agkh8d49gl9k249sjvfhfhvm2cc.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            this.onSignIn(result)
            //setName(result.name)
            console.log(result)
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    

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
                        Welcome,
                    </Text>
                    <View>
                        {
                            (!loginHover && !pswdHover )&&
                            <Text style={styles.signin}>
                                Sign in to continue!
                            </Text>
                        }
                    </View>
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
                            secureTextEntry={true}
                            onChangeText={text => passwordChange(text)}
                            value={passwordData} 
                            placeholder = {"Password"}
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.signInWithGoogleAsync()}>
                            <LinearGradient
                                // Button Linear Gradient
                                colors={['#F20D54', '#FAE105']}
                                start={{x:0.1, y:0.1}}
                                end={{x:0.9, y:0.8}}
                                locations={[0.1, 0.9]}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <Text style={styles.member}>Not a member?&nbsp; 
                            <Text onPress={() => navigation.navigate('Register')}
                                style={styles.memberSignIn}> 
                                Sign up
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
export default LoginScreen

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