import React, { Component } from 'react';
import {
    Platform,
    View,
    Text,
    TouchableNativeFeedback,
    StyleSheet,
} from 'react-native';

export default class AppButton extends Component {
    constructor(props) {
        super(props);

        if(props.theme) {
            switch(props.theme) {
                case 'success':
                    this.backgroundColor = '#449d44';
                    break;
                case 'info':
                    this.backgroundColor = '#31b0d5';
                    break;
                case 'warning':
                    this.backgroundColor = '#ec971f';
                    break;
                case 'danger':
                    this.backgroundColor = '#c9302c';
                    break;
                case 'primary':
                default:
                    this.backgroundColor = '#286090';
            }
        }
        else {
            this.backgroundColor = '#286090';
        }
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                <View style={[buttonStyles.button, {backgroundColor: this.backgroundColor}]}>
                    <Text style={buttonStyles.buttonText}>{this.props.title}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const buttonStyles = StyleSheet.create({
    button: {
        margin: 5,
        alignItems: 'center',
    },
    buttonText: {
        padding: 20,
        fontSize: 20,
        color: 'white'
    },
});