// @ts-nocheck
import React from 'react';
import { Image, StyleSheet, Platform,Keyboard, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, 
  TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RFPercentage } from 'react-native-responsive-fontsize';
import EStyleSheet from 'react-native-extended-stylesheet';

import ModalDropdown from 'react-native-modal-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import HeaderComponent from '../components/HeaderComponent';
import GradientButton from '../components/GradientButton';



export default function CreateProfileScreen() {
  let [selectedImage, setSelectedImage] = React.useState<any | null>(null);
  const [name, setName] = React.useState<any | null>(null);
  const [birthDate, setBirthDate] = React.useState<any | null>(null);
  const [gender, setGender] = React.useState<any | null>(null);
 

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Image source={{ uri: selectedImage.localUri }} style={styles.logo} />
        </TouchableOpacity>
      </View>
    );
  }

  // const hideKeyboard = () =>{

  // }

  return (
    <View style={styles.container1}>
      <HeaderComponent/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
          <Text style = {styles.profileText}>Create your profile</Text>
          <View style={styles.container2}>
            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
              <Image
              source={{ uri: 'https://i.imgur.com/TkIrScD.png' }}
              style={styles.logo}
              />
              <Text>Upload Profile Picture</Text>
            </TouchableOpacity>

            <Text style={styles.prompt}>Name:</Text>
            <TextInput placeholder="Name" value = {name} onChangeText = {setName} style={styles.input}/>
            <Text style={styles.prompt}>Date of Birth:</Text>
            <TextInputMask
            style = {styles.input}
            type={'datetime'}
            options={{
            format: 'MM/DD/YYYY'
            }}
            placeholder = {"MM/DD/YYYY"}
            value={birthDate}
            onChangeText={setBirthDate}/>

            <Text style={styles.prompt}>Gender:</Text>

            <ModalDropdown isFullWidth = {true} 
            dropdownTextStyle = {styles.dropDownText} 
            onSelect= {setGender} 
            dropdownStyle={styles.dropDown}  
            style = {styles.input} 
            defaultValue = {"Select your gender"} 
            options={['Male', 'Female','Other']}/>
          </View>
          <View style={styles.footer}>
            <View style={{width:100, height:50, borderRadius:50}}>
              <GradientButton text="->" onPress={()=>{console.log("next")}}/>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gray',
  },
  container1:{
    flex: 1,
    // backgroundColor: 'yellow',
  },
  container2:{
    flex: 1,
    // backgroundColor: 'blue',
  },
  footer:{
    display: 'flex',
    width: '100%',
    // backgroundColor: '#fff',
    flexDirection: 'row-reverse',
    paddingBottom: 10,
  },
  profileText: {
    fontWeight: 'bold',
    fontSize: 25,
    alignItems: 'flex-start',
    paddingTop: 60,
    padding: 20
  },
  logo: {
    width: 205,
    height: 205,
    marginBottom: 20,
    borderRadius: 205 / 2,
  },
 prompt: {
padding: 5
 },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  
   
  },
  test: { 
    justifyContent: "space-around"
},
dropDown : {
  padding: 10,
  alignItems: "center",
  
 
},
dropDownText: {
  color: "black",
  fontSize: RFPercentage(1.5),
  fontFamily: "lato-regular"
}
});
