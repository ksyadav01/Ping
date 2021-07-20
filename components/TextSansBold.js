import React from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import * as Font from 'expo-font'
import { useFonts, PTSans_400Bold } from "@expo-google-fonts/pt-sans";

export default class TextSansBold extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async UNSAFE_componentWillMount() {
        await Font.loadAsync({
            'PTSansBold': require('./../assets/PT_Sans/PTSans-Bold.ttf')
        })
        this.setState({ loading: false })
    }

    render() {
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
            return (
                <View>
                    <Text style={[styles.defaultStyless, this.props.style]}>
                        {this.props.children}
                    </Text>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    defaultStyless: {
        fontFamily: 'PTSansBold'
    },
})