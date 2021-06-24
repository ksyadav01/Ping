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
  } from "@expo-google-fonts/dev";
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react/cjs/react.production.min';
const CreateScreen = ({props, navigation}) => {
    //const [image, setImage] = useState(null);

    let [fontsLoaded] = useFonts({
        PTSans_400Regular
    });

    if (fontsLoaded){
        return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
            
            <StatusBar style="dark" />
            <View style={styles.container}>
                <Text style={styles.CreateEvent}>Create An Event</Text>



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
export default CreateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    CreateEvent:{
        fontSize: 45,
        fontFamily: "PTSans_400Regular",
        marginTop: "5%"
    }


})