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
  Alert,
  ActivityIndicator,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import TextCustom from "../components/TextCustom";
import TextSansBold from "../components/TextSansBold";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
export default class SelectLocationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      location: null,
      errorMsh: null,
      lat: null,
      long: null,
      marker: null
    };
  }

  async UNSAFE_componentWillMount() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      //setErrorMsg('Permission to access location was denied');
      return;
    }

    let newLocation = await Location.getCurrentPositionAsync({});
    //setLocation(newLocation);

    //setLat(newLocation["coords"]["latitude"])
    //setLong(newLocation["coords"]["longitude"])
    this.setState({
      location: newLocation,
      lat: newLocation["coords"]["latitude"],
      long: newLocation["coords"]["longitude"],
      loading: false,
    });
    console.log(this.state.lat)
  }

  render() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }
    if (this.state.lat != null && this.state.long != null) {
      return (
        <Modal transparent={true} visible={this.props.show}>
          <View style={styles.tagModalBackground}>
            <View style={styles.tagModal}>
              <View style={styles.tagModalCenter}>
                <TextSansBold style={{ fontSize: RFPercentage(2.3) }}>
                  Select the event location!
                </TextSansBold>
                <TouchableOpacity style={styles.iconButton} onPress={() => this.props.setShow(false)} >
                  <Ionicons name="close-circle-outline" size={40} color="black" />
                </TouchableOpacity>
              </View>

                <View style={styles.container}>
                  <MapView style={styles.map} provider="google" userInterfaceStyle="dark" initialRegion={{
                      latitude: this.state.lat,
                      longitude: this.state.long,
                      latitudeDelta: 0.0222,
                      longitudeDelta: 0.0221,
                    }}
                    onPress={(e) => this.setState({ lat: e.nativeEvent.coordinate.latitude, long: e.nativeEvent.coordinate.longitude })}>
                     
                    <MapView.Marker coordinate={{ latitude: this.state.lat, longitude: this.state.long }}
                      pinColor="black" draggable={true}
                      onDragStart={(e) => {
                        console.log(e.nativeEvent.coordinate);
                      }}
                      onDragEnd={(e) => {
                        this.setState({lat: e.nativeEvent.coordinate.latitude, long: e.nativeEvent.coordinate.longitude});
                      }}>
                      <Callout>
                        <Text>Current Location</Text>
                      </Callout></MapView.Marker>
                    {/* <Marker
                      
                    </Marker> */}
                  </MapView>

              </View>
            
            </View>
          </View>
        </Modal>
      );
    }
  }
}

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 0,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  tagModal: {
    backgroundColor: "#ffffff",
    margin: RFPercentage(1),
    marginTop: RFPercentage(15),
    padding: 40,
    borderRadius: 10,
    justifyContent: "space-between"
  },
  tagModalBackground: {
    backgroundColor: "#000000aa",
    flex: 1,
  },
  tagModalCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 7,
      borderRadius: RFPercentage(.75),
      borderColor: "#F20D54",
      height: RFPercentage(51),
      zIndex: 1
    },
    map: {
      width: RFPercentage(40),//Dimensions.get('window').width,
      height: RFPercentage(50)//Dimensions.get('window').height,
    },
});
