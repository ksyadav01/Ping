import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { DarkTheme } from '@react-navigation/native';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [pin, setPin] = useState({
    latitude: null,
    longitude: null
  })

  useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

       setLat(location["coords"]["latitude"])
       setLong(location["coords"]["longitude"])
    })();
   
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {

    text = JSON.stringify(location);
    
    
  }

  
  if(lat && long){
    return (
      <View style={styles.container}>
        {/* <Text>{lat}</Text>
        <Text>{long}</Text> */}
        <MapView style={styles.map} 
        // customMapStyle = {mapDarkStyle}
        initialRegion={{
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider = "google"
      userInterfaceStyle = 'dark'
      > 

       <Marker 
       coordinate = {{latitude: lat,longitude: long}}
       pinColor = "black"
       draggable = {true}
       onDragStart = {(e) => {
         console.log(e.nativeEvent.coordinate)
       }}
       onDragEnd = {(e) => {
         setLat(e.nativeEvent.coordinate.latitude)
         setLong(e.nativeEvent.coordinate.longitude)
       }}
      >
      <Callout>
        <Text>Current Location</Text>
      </Callout>
      </Marker>
      </MapView>

      </View>
    );
  }
  else{
    return(<View></View>)
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },


})