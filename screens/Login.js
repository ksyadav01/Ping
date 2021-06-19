import React from 'react'
import {Text, View, Button, SafeAreaView} from 'react-native'

export default function Login({navigation}) {
    return (
       <SafeAreaView>
            <Button
            title = "Sign Up"
            onPress = {() => navigation.navigate("Register")}
            />
            <Button
            title = "Register"
            onPress = {() => navigation.navigate("Login")}
            />
       </SafeAreaView>
    )
}

