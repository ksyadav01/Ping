import React from 'react'
import {Text, View, Button, SafeAreaView, StyleSheet} from 'react-native'

export default function Login({navigation}) {
    return (
       <SafeAreaView style={styles.wrapper}>
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

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        justifyContent: 'center'
    }
})

