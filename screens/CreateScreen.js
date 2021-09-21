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
  ScrollView,
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
import TextCustom from '../components/TextCustom';
import TextSansBold from '../components/TextSansBold';
import SelectLocationModal from '../components/SelectLocationModal';

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
  
  
  const [showTagModal, setShowTagModal] = useState(false);
  const [tagOutdoor, setTagOutdoor] = useState(false);
  const [tagIndoor, setTagIndoor] = useState(false);
  const [tagHangout, setTagHangout] = useState(false);
  const [tagStudy, setTagStudy] = useState(false);
  const [tagClub, setTagClub] = useState(false);
  const [tagOther, setTagOther] = useState(false);

  const [type, setType] = useState(null); // Dropdowns
  const [uid, setUid] = useState(null);
  const [nameHover, setNameHoverColor] = useState(false);
  const [descHover, setDescHoverColor] = useState(false);
  const [d, setBioHoverColor] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState(null);

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
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1}}
          >
      <View style={[styles.mainContainer, descHover||nameHover ? styles.extend : styles.extend2 ]}>
      <SafeAreaView style={{flex:1}}>
      <ScrollView>
          
            {/* {!nameHover && !descHover && (
              <TextSansBold style={styles.createText}>Create an event!</TextSansBold>
            )} */}
            <TextSansBold style={styles.createText}>Create an event!</TextSansBold>
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
                    {/* <TextCustom style={styles.uploadPfp}>Upload An Image (optional)</Text> */}
                  </TouchableOpacity>
                </View>
                
                <View style={{flex: 1.5}}>
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
                        <TextCustom style={{fontSize: RFPercentage(2.1), fontWeight: "bold"}}>
                          Event Date:{"  "}
                        </TextCustom>
                        <TextCustom style={{fontSize: RFPercentage(2)}}>
                        {String(date.getMonth() + 1).padStart(2, '0')+"/"+String(date.getDate()).padStart(2, '0')+"/"+
                          date.getFullYear()}
                        </TextCustom>
                      </View>
                      <View style={{flexDirection: "row"}}>
                        <TextCustom style={{fontSize: RFPercentage(2.1), fontWeight: "bold"}}>
                          Event Date:{"  "}
                        </TextCustom>
                        <TextCustom style={{fontSize: RFPercentage(2)}}>
                          {String(time.getHours()%12)+":"+String(time.getMinutes()).padStart(2, '0')
                            + (time.getHours()%12 ? " PM" : " AM")}
                        </TextCustom>
                      </View>
                    </View>
                    <View style={styles.dateTimeContainer}>
                      <TouchableOpacity style={styles.dateTimeButton} onPress={()=>setShowDate(true)}>
                        <TextCustom style={{color:"white", fontSize: RFPercentage(2.3)}}>Date</TextCustom>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.dateTimeButton} onPress={()=>setShowTime(true)}>
                        <TextCustom style={{color:"white", fontSize: RFPercentage(2.3)}}>Time</TextCustom>
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
              
              <View style={styles.tagsBox}>
                <View style={{justifyContent: "center",flexDirection: "row",  flex: 1, marginBottom: RFPercentage(2)}}>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <TextSansBold style={styles.tagsHeader}>Select your tags!{" "}</TextSansBold>
                    <TouchableOpacity onPress={() => setShowTagModal(true)}>
                      <Ionicons name="help-circle-outline" size={24} color="black"> </Ionicons>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.tagsBoxRows}>
                  <View style={styles.tagsIndividual}>
                    {tagOutdoor ? 
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagOutdoor(false)}>
                        <Ionicons name="checkbox-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Outdoor Activities</TextCustom>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagOutdoor(true)}>
                        <Ionicons name="square-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Outdoor Activities</TextCustom>
                      </TouchableOpacity>}
                  </View>

                  <View style={styles.tagsIndividual}>
                    {tagIndoor ? 
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagIndoor(false)}>
                        <Ionicons name="checkbox-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Indoor Activities</TextCustom>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagIndoor(true)}>
                        <Ionicons name="square-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Indoor Activities</TextCustom>
                      </TouchableOpacity>}
                  </View>
                </View>

                <View style={styles.tagsBoxRows}>
                  <View style={styles.tagsIndividual}>
                    {tagHangout ? 
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagHangout(false)}>
                        <Ionicons name="checkbox-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Hanging Out</TextCustom>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagHangout(true)}>
                        <Ionicons name="square-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Hanging Out</TextCustom>
                      </TouchableOpacity>}
                  </View>
                  <View style={styles.tagsIndividual}>
                    {tagStudy ? 
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagStudy(false)}>
                        <Ionicons name="checkbox-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Study Groups</TextCustom>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagStudy(true)}>
                        <Ionicons name="square-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Study Groups</TextCustom>
                      </TouchableOpacity>}
                  </View>
                </View>

                <View style={styles.tagsBoxRows}>
                  <View style={styles.tagsIndividual}>
                    {tagClub ? 
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagClub(false)}>
                        <Ionicons name="checkbox-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Club Activities</TextCustom>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagClub(true)}>
                        <Ionicons name="square-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Club Activities</TextCustom>
                      </TouchableOpacity>}
                  </View>
                  <View style={styles.tagsIndividual}>
                    {tagOther ? 
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagOther(false)}>
                        <Ionicons name="checkbox-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Other</TextCustom>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={styles.tagsIndividual} onPress={()=>setTagOther(true)}>
                        <Ionicons name="square-outline" size={24} color="black" />
                        <TextCustom style={styles.tagsText}> Other</TextCustom>
                      </TouchableOpacity>}
                  </View>
                </View>
              </View>


              <TextInput
                placeholder={"Let everyone know the details of your event!"}
                value={desc}
                onChangeText={setDesc}
                multiline={true}
                style={[
                  styles.input,
                  {
                    borderColor: descHover ? "#F20D54" : "#000000",
                    height: RFPercentage(10),
                    marginTop: RFPercentage(7),
                    width: RFPercentage(45),
                    borderWidth: 1,
                    borderRadius: 10,
                    textAlignVertical: "bottom",
                    fontSize: RFPercentage(1.7)
                  },
                ]}
                onFocus={() => setDescHoverColor(true)}
                onBlur={() => setDescHoverColor(false)}
              />
              <TouchableOpacity onPress={()=>setShowLocationModal(true)}>
                <View style={styles.mapButtonHolder}>
                  <View style={styles.mapButton}>
                    <TextCustom style={{color:"white", fontSize: RFPercentage(2.3)}}>Set Location</TextCustom>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <LinearGradient
                  // Button Linear Gradient
                  colors={["#F20D54", "#FAE105"]}
                  start={{ x: 0.1, y: 0.1 }}
                  end={{ x: 0.9, y: 0.8 }}
                  locations={[0.1, 0.9]}
                  style={styles.button}
                >
                  <TextCustom style={styles.buttonText} onPress={() => saveData()}>
                    Create Profile
                  </TextCustom>
                </LinearGradient>
              </TouchableOpacity>
              <SelectLocationModal show={showLocationModal} setShow={setShowLocationModal} setLocation={setLocation}/>
              {/* <View style={styles.anonymousHolder}>
                <TextCustom style={styles.anonText}>Anonymous user</TextCustom>

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setShowModal(true)}>
                  <Ionicons
                    name="help-circle-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Switch
                  //style={{ marginTop: 30 }}
                  onValueChange={() => setIsAnon(!isAnon)}
                  value={isAnon}
                  trackColor={{ true: "#fc0328", false: "lightgray" }}
                  thumbColor={[
                    Platform.OS == "ios" ? "#FFFFFF" : "fc0328"
                  ]}
                  
                />
              </View> */}
                 {/* Tag Modal  for information about tags*/}
              <Modal transparent={true} visible={showTagModal}>
                <View style={styles.tagModalBackground}>
                  <View style={styles.tagModal}>
                    <View style={styles.tagModalCenter}>
                      <TextSansBold style={{ fontSize: RFPercentage(2.3)}}>
                        What are tags?
                      </TextSansBold>
                      <TouchableOpacity style={styles.iconButton} onPress={() => setShowTagModal(false)}>
                        <Ionicons name="close-circle-outline" size={40} color="black" />
                      </TouchableOpacity>
                    </View>
                    <TextCustom style={{ marginTop: "7%", color: "#A1A1A1", }}>
                      Tags are a way for people to know more about the event type, and allows them to filter by catagory. It also 
                      helps us show this event to as many potential event joiners as possible, so make sure to select the right ones!
                    </TextCustom>
                  </View>
                </View>
              </Modal> 
            </View>
        
      </ScrollView>
      </SafeAreaView>
      </View>
      
      </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
  createText: {
    fontWeight: "bold",
    fontSize: RFPercentage(4),
    alignItems: "flex-start",
    paddingTop: "10%",
    paddingLeft: "5%",
    fontFamily: "PTSans_400Regular",
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
    width: RFPercentage(30),
    marginTop: RFPercentage(1),
  },
  extend:{
    paddingBottom: RFPercentage(20)
  },
  extend2:{
    paddingBottom: 20
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
    borderBottomWidth: 1,
  },
  newImageMainContainer: {
    flex: 1,
    // backgroundColor: 'gray',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    fontFamily: "PTSans_400Regular",
    justifyContent: "flex-end",
    //paddingBottom: 0//RFPercentage(25)
  },
  mapButton:{
    height: RFPercentage(6),
    width: RFPercentage(20),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 15,
    backgroundColor: "#fc0328",
    
  },
  mapButtonHolder:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-end",
    width: RFPercentage(50),
    marginTop: RFPercentage(1),
  },
  nameInput: {
    height: 50,
    width: RFPercentage(30),
    marginBottom: RFPercentage(1),
    marginTop: 0,
    padding: 10,
    borderBottomWidth: 1,
  },
  plusSign: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  prompt: {
    padding: 5,
  },
  tagsBox:{
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 20,
    width: RFPercentage(50),
    height: RFPercentage(20),
    marginTop: RFPercentage(2),
    paddingLeft: RFPercentage(2),
    paddingRight: RFPercentage(0),
    paddingBottom: RFPercentage(.5),
    borderColor: "#fc0328",
    flexDirection: "column"
  },
  tagsBoxRows:{
    flexDirection:"row",
    marginBottom: RFPercentage(1.2)
  },
  tagsHeader:{
    fontSize: RFPercentage(2.8)
  },
  tagsIndividual:{
    flexDirection:"row",
    flex:1,
    alignItems: "center",
  },
  tagModal: {
    backgroundColor: "#ffffff",
    margin: RFPercentage(1),
    marginTop: RFPercentage(30),
    padding: 40,
    borderRadius: 10,
  },
  tagModalBackground: {
    backgroundColor: "#000000aa",
    flex: 1,
  },
  tagModalCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tagsText:{
    fontSize: RFPercentage(2.2)
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
