import React from 'react'
import {Text, View, Button} from 'react-native'

export default function LandingScreen({navigation}) {
    return (
       <View style={styles.wrapper}>
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

const styles = {
    wrapper = {
        flex:1,
        justifyContent: 'center'
    }
}