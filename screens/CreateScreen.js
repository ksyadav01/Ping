import React, { useState, useEffect } from "react";
import {
  Image,
  Switch,
  StyleSheet,
  Platform,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  Button,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  ImageBackground,
  Alert 
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { RFPercentage } from "react-native-responsive-fontsize";
import storage from "@react-native-firebase/storage";
import firebase from "firebase";
import RNDateTimePicker from '@react-native-community/datetimepicker';

import ModalDropdown from "react-native-modal-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { UsersRef } from "../firebase/config";
import { picStorage } from "../firebase/config";
import { useFonts, PTSans_400Regular } from "@expo-google-fonts/pt-sans";

const CreateScreen = ({ props, navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageSaved, setImageSaved] = useState(null);
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");

  const [date, setDate] = useState(new Date()); // Uses Date/time modules inbuilt in phones
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [alertResult, setAlertResult] = useState(false);


  const [type, setType] = useState(null); // Dropdowns
  const [uid, setUid] = useState(null);
  const [nameHover, setNameHoverColor] = useState(false);
  const [descHover, setDescHoverColor] = useState(false);
  const [d, setBioHoverColor] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let userData = new Map();
  let [fontsLoaded] = useFonts({
    PTSans_400Regular,
  });

  useEffect(
    function effectFunction() {
      async function fetchUsers() {
        const user = firebase.auth().currentUser;
        setUid(user.uid);
        var userRef = UsersRef.doc(user.uid);
        try {
          var doc = await userRef.get();
          const data = await doc.data();
          let counter = 0;
          let dataVals = Object.values(data);
          let keys = Object.keys(data);
          keys.forEach((key) => {
            userData.set(key, dataVals[counter]);
            counter = counter + 1;
          });
        } catch (error) {
          console.log("retrieving error");
          console.log(error);
        }
      }

      // Defining what sequence of the async get() functions - check out mozilla article
      async function sequentialStart() {
        await fetchUsers();
        //await setName(userData.get("nickname"));
        await setEmail(userData.get("gmail"));
        console.log("peepoo");
      }

      sequentialStart();
    },
    [imageSaved]
  );

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    //setSelectedImage({ localUri: pickerResult.uri });
    setPic(pickerResult.uri);
  };
  let saveData = async () => {
    try {
      var metadata = {
        contentType: "image/jpeg",
      };
      const response = await fetch(pic);
      const blob = await response.blob();
      const storageRef = firebase.storage().ref();
      var file = blob;
      console.log(selectedImage);
      storageRef.child(uid).put(file, metadata);
      storageRef
        .child(uid)
        .getDownloadURL()
        .then((url) => {
          UsersRef.doc(uid).update({
            profile_picture: url,
            bio: bio,
            nickname: name,
            date_of_birth: birthDate,
            gender: gender,
            is_anonymous: isAnon,
          });
        });

      //navigation.goBack()
      navigation.navigate("Loading");
    } catch (e) {
      console.log(e);
      console.log(":the error");
    }
  };
  let handleSubmit = async () => {};
  if (imageSaved === null) setImageSaved(true);

  const invalidDateTime =  () =>
    Alert.alert(
      "Error Selecting Date",
      "Please select a date and time on or after today. Unforunately, you can't make events in the past!",
      [
        {
          text: "Ok",
          onPress: () => setAlertResult(false),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );

  if (fontsLoaded) {
    return (
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.mainContainer}
          >
            {!nameHover && !descHover && (
              <Text style={styles.profileText}>Create an event!</Text>
            )}
            <View style={styles.innerMainContainer}>
              <View style={styles.topContainer}>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={openImagePickerAsync}
                    style={styles.changeImage}>
                    <View>
                      <Image source={{ uri: pic }} style={styles.image} />
                      <View style={styles.greyPfpCover}>
                        <View style={styles.greyColor}></View>
                        <Ionicons
                          name="add-outline"
                          style={styles.plusSign}
                          size={60}
                          color="black"
                        />
                      </View>
                    </View>
                    {/* <Text style={styles.uploadPfp}>Upload An Image (optional)</Text> */}
                  </TouchableOpacity>
                </View>
                
                <View style={{flex: 1.5,borderWidth: 1}}>
                  <View style={styles.topRightContainer}>
                    <TextInput
                      placeholder={"Event Name"}
                      value={name}
                      onChangeText={setName}
                      style={[
                        styles.nameInput,
                        { borderColor: nameHover ? "#F20D54" : "#000000"},
                      ]}
                      onFocus={() => setNameHoverColor(true)}
                      onBlur={() => setNameHoverColor(false)}
                    />
                    <View style={{width: RFPercentage(30), fontSize: RFPercentage(10)}}>
                      <View style={{flexDirection: "row"}}>
                        <Text style={{fontSize: RFPercentage(2.1), fontWeight: "bold"}}>
                          Event Date:{"  "}
                        </Text>
                        <Text style={{fontSize: RFPercentage(2)}}>
                        {String(date.getMonth() + 1).padStart(2, '0')+"/"+String(date.getDate()).padStart(2, '0')+"/"+
                          date.getFullYear()}
                        </Text>
                      </View>
                      <View style={{flexDirection: "row"}}>
                        <Text style={{fontSize: RFPercentage(2.1), fontWeight: "bold"}}>
                          Event Date:{"  "}
                        </Text>
                        <Text style={{fontSize: RFPercentage(2)}}>
                          {String(time.getHours()%12)+":"+String(time.getMinutes()).padStart(2, '0')
                            + (time.getHours()%12 ? " PM" : " AM")}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.dateTimeContainer}>
                      <TouchableOpacity style={styles.dateTimeButton} onPress={()=>setShowDate(true)}>
                        <Text>Date</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.dateTimeButton} onPress={()=>setShowTime(true)}>
                        <Text>Time</Text>
                      </TouchableOpacity>
                      {showDate && (
                        <RNDateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={"date"}
                          //is24Hour={true}
                          display="default"
                          onChange={(e,dates)=>{
                            if (dates) {
                              if(dates < new Date()){ //If selected date is before current date
                                invalidDateTime()
                              }
                              else{
                                setDate(dates);
                              }
                            }
                            setShowDate(false);
                            
                          }}
                        />
                      )}
                      {showTime && (
                        <RNDateTimePicker
                          testID="dateTimePicker"
                          value={time}
                          mode={"time"}
                          //is24Hour={true}
                          display="default"
                          onChange={(e,times)=>{
                            if (times) {
                              console.log(times)
                              let currentDate = new Date();
                              if(times < currentDate && (date.getFullYear()<=currentDate.getFullYear()
                                && date.getMonth()<=currentDate.getMonth()  //If selected time is before current time and date
                                  && date.getDay()<=currentDate.getDay())){
                                invalidDateTime()
                              }
                              else{
                                setTime(times);
                              }
                            }
                            setShowTime(false);
                          }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
              <TextInput
                placeholder={"Tell everyone a little bit about yourself!"}
                value={desc}
                onChangeText={setDesc}
                multiline={true}
                style={[
                  styles.input,
                  {
                    borderColor: descHover ? "#F20D54" : "#000000",
                    height: RFPercentage(10),
                    marginTop: RFPercentage(7),
                    width: RFPercentage(40),
                    borderWidth: 1,
                    borderRadius: 10,
                    textAlignVertical: "bottom",
                  },
                ]}
                onFocus={() => setDescHoverColor(true)}
                onBlur={() => setDescHoverColor(false)}
              />
              <View style={styles.anonymousHolder}>
                <Text style={styles.anonText}>Anonymous user</Text>

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setShowModal(true)}
                >
                  <Ionicons
                    name="help-circle-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                {/* <Switch
                  //style={{ marginTop: 30 }}
                  onValueChange={() => setIsAnon(!isAnon)}
                  value={isAnon}
                  trackColor={{ true: "#fc0328", false: "grey" }}
                  thumbColor={[
                    Platform.OS == "ios"
                      ? "#FFFFFF"
                      : isAnon
                      ? "#fc0328"
                      : "#ffffff",
                  ]}
                /> */}
              </View>

              {/* <Modal transparent={true} visible={showModal}>
                <View style={styles.anonModalBackground}>
                  <View style={styles.anonModal}>
                    <View style={styles.anonModalCenter}>
                      <Text
                        style={{
                          fontSize: RFPercentage(2.3),
                          fontFamily: "PTSans_400Regular",
                          fontWeight: "bold",
                        }}
                      >
                        Stay anonymous?
                      </Text>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setShowModal(false)}
                      >
                        <Ionicons
                          name="close-circle-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        marginTop: "7%",
                        color: "#A1A1A1",
                        fontFamily: "PTSans_400Regular",
                      }}
                    >
                      Choosing to remain anonymous removes your name from
                      showing up on the list of attendees for events, however
                      you also won't be able to see who's going to each event.
                      This choice isn't binding, so feel free to change your
                      mind later on!
                    </Text>
                  </View>
                </View>
              </Modal> */}

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#F20D54", "#FAE105"]}
                  start={{ x: 0.1, y: 0.1 }}
                  end={{ x: 0.9, y: 0.8 }}
                  locations={[0.1, 0.9]}
                  style={styles.button}
                >
                  <Text style={styles.buttonText} onPress={() => saveData()}>
                    Create Profile
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  } else {
    return <View></View>;
  }
};
export default CreateScreen;

const styles = StyleSheet.create({
  anonymousHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  anonModal: {
    backgroundColor: "#ffffff",
    margin: 50,
    marginTop: "50%",
    padding: 40,
    borderRadius: 10,
  },
  anonModalBackground: {
    backgroundColor: "#000000aa",
    flex: 1,
  },
  anonModalCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  anonText: {
    //display: "inline-block"
  },
  anonQuestion: {
    //display: "inline-block"
  },
  button: {
    height: 50,
    width: "70%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 15,
    marginTop: "5%",
  },
  buttonText: {
    fontSize: RFPercentage(3.4),
    color: "white",
    fontFamily: "PTSans_400Regular",
  },
  changeImage: {
    alignItems: "center",
    // flex: 1
  },
  dateTimeButton:{
    height: RFPercentage(5),
    width: RFPercentage(12),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 15,
    backgroundColor: "#fc0328",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    width: RFPercentage(30),
    marginTop: "5%",
  },
  greyPfpCover: {
    width: RFPercentage(18),
    height: RFPercentage(18),
    borderRadius: RFPercentage(9),
    borderWidth: 5,
    borderColor: "#fc0328",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  greyColor: {
    width: RFPercentage(18),
    height: RFPercentage(18),
    borderRadius: RFPercentage(9),
    backgroundColor: "#BFBFBF",
    opacity: 0.5,
  },
  iconButton: {
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 0,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: RFPercentage(18),
    height: RFPercentage(18),
    borderRadius: RFPercentage(9),
    borderWidth: 5,
    borderColor: "#fc0328",
    position: "absolute",
  },
  innerMainContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: RFPercentage(5),
    marginBottom: 0
    // backgroundColor: 'blue',
  },
  input: {
    height: 50,
    width: RFPercentage(30),
    marginBottom: "5%",
    marginTop: "0%",
    padding: 10,
    borderWidth: 1,
  },
  newImageMainContainer: {
    flex: 1,
    // backgroundColor: 'gray',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    fontFamily: "PTSans_400Regular",
  },
  nameInput: {
    height: 50,
    width: RFPercentage(30),
    marginBottom: RFPercentage(1),
    marginTop: 0,
    padding: 10,
    borderWidth: 1,
  },
  plusSign: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  prompt: {
    padding: 5,
  },
  topContainer:{
    flexDirection: "row",
    justifyContent: "center"
  },
  topRightContainer:{
    flexDirection: "column",
    alignItems: "center",
    // flex: 2,
    //justifyContent: "space-between"
  },
  uploadPfp: {
    padding: 0,
    margin: 0,
    borderWidth: 1,
    textAlign: "center",
    fontSize: RFPercentage(1.5),
    borderColor: "blue",
  },
  footer: {
    display: "flex",
    width: "100%",
    // backgroundColor: '#fff',
    flexDirection: "row-reverse",
    paddingBottom: 10,
  },
  profileText: {
    fontWeight: "bold",
    fontSize: RFPercentage(3.4),
    alignItems: "flex-start",
    paddingTop: "10%",
    paddingLeft: "5%",
    fontFamily: "PTSans_400Regular",
  },
  instructions: {
    color: "#888",
    fontSize: RFPercentage(0.4),
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    height: 50,
    width: "70%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 15,
    marginTop: "5%",
  },
  buttonText: {
    fontSize: RFPercentage(3.4),
    color: "white",
    fontFamily: "PTSans_400Regular",
  },
  test: {
    justifyContent: "space-around",
  },
  dropDown: {
    padding: 10,
    alignItems: "center",
  },
  dropDownText: {
    color: "black",
    fontSize: RFPercentage(1.5),
    fontFamily: "PTSans_400Regular",
  },
});
