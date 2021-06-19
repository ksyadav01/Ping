import React from 'react'
import {Text, View, Button} from 'react-native'

export default function LandingScreen({navigation}) {
    return (
       <View>
            <Button
            title = "Sign Up"
            onPress = {() => navigation.navigate("Register")}
            />
            <Button
            title = "Register"
            onPress = {() => navigation.navigate("Login")}
            />
       </View>
    )
}

