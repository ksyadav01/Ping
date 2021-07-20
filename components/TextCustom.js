import React from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import * as Font from 'expo-font'
import { useFonts, PTSans_400Regular } from "@expo-google-fonts/pt-sans";

export default class TextCustom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async UNSAFE_componentWillMount() {
        await Font.loadAsync({
            'PTSans': require('./../assets/PT_Sans/PTSans-Regular.ttf')
        })
        this.setState({ loading: false })
    }

    render() {
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
            return (
                <View>
                    <Text style={[styles.defaultStyle, this.props.style]}>
                        {this.props.children}
                    </Text>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontFamily: 'PTSans'
    },
})