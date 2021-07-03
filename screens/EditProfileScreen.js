import React, { useState, useEffect } from 'react';
import { Image, 
  StyleSheet, 
  Platform,
  Keyboard, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  SafeAreaView} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { RFPercentage } from 'react-native-responsive-fontsize';
import storage from '@react-native-firebase/storage'
import firebase from 'firebase';

import ModalDropdown from 'react-native-modal-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import { UsersRef } from '../firebase/config';
import { picStorage } from '../firebase/config';


const EditProfileScreen = ({props, navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSaved, setImageSaved] = useState(null)
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState(null);
  const [uid, setUid] = useState(null);
  let userData = new Map()
  
  useEffect(function effectFunction() {
    async function fetchUsers() {
      const user = firebase.auth().currentUser
      setUid(user.uid)
      var userRef = UsersRef.doc(user.uid);
      try {
        var doc = await userRef.get();
        const data = await doc.data();
        let counter = 0;
        let dataVals = Object.values(data);
        let keys = Object.keys(data)
        keys.forEach((key)=>{
            userData.set(key, dataVals[counter])
            counter = counter +1;
        })
      } catch (error) {
        console.log("retrieving error")
        console.log(error)
      }
    }

// Defining what sequence of the async get() functions - check out mozilla article
    async function sequentialStart() {
      await fetchUsers();
      await setName(userData.get('nickname'))
      await setPic(userData.get('profile_picture'))
      await setEmail(userData.get('gmail'))
      console.log("peepoo")
    }

    sequentialStart();
  }, [imageSaved]);

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

    

    //setSelectedImage({ localUri: pickerResult.uri });
    setSelectedImage(pickerResult.uri);
    setImageSaved(false)
  };
  let saveImage = async () => {
    try{
      var metadata = {
        contentType: 'image/jpeg',
      };
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const storageRef = firebase.storage().ref()
      var file = blob
      console.log(selectedImage)
      storageRef.child(uid).put(file, metadata)
      storageRef.child(uid).getDownloadURL().then((url)=>{
        UsersRef.doc(uid).update({
          "profile_picture": url
        })
        setPic(url)
      })
      setImageSaved(true)
    }
    catch(e){
      console.log(e)
    }
  }
  if(imageSaved === null)
    setImageSaved(true)
  if (imageSaved === false) {
    return (
      <View style={styles.newImageMainContainer}>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Image source={{ uri: selectedImage }} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>saveImage()}>
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
      </View>
    );
  }

  else {
    return (
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.mainContainer}
            >
            <Text style = {styles.profileText}>Edit your profile</Text>
            <View style={styles.innerMainContainer}
              >
              <TouchableOpacity onPress={openImagePickerAsync} style={styles.changeImage}>
                <Image
                source={{ uri: pic }}
                style={styles.image}
                />
                <Text>Upload Profile Picture</Text>
              </TouchableOpacity>

              <Text style={styles.prompt}>Name:</Text>
              <TextInput placeholder={"Name"} value = {name} onChangeText = {setName} style={styles.input}/>
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
      
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default EditProfileScreen;

const styles = StyleSheet.create({
  changeImage: {
    marginTop: 0
  },
  image: {
    width: 205,
    height: 205,
    marginBottom: "10%",
    borderRadius: 205 / 2,
  },
  innerMainContainer:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'blue',
  },
  newImageMainContainer: {
    flex: 1,
    // backgroundColor: 'gray',
  },
  mainContainer:{
    flex: 1,
    // backgroundColor: 'yellow',
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
  prompt: {
    padding: 5
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
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
  // Your old button
  // button: {
  //   alignItems: 'center',
  //   padding: 20,
  //   borderRadius: 5,
  // },
  // buttonText: {
  //   fontSize: 20,
  //   color: '#fff',
  // },
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