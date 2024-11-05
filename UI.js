import React, {Component} from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';


/**
 * InputWithLabel
 */
class InputWithLabel extends Component {
  constructor(props) {
    super(props);

    this.orientation = this.props.orientation
      ? this.props.orientation == 'horizontal'
        ? 'row'
        : 'column'
      : 'column';
  }

  render() {
    return (
      <View style={[inputStyles.container, {flexDirection: this.orientation}]}>
        <Text style={this.props.textLabelStyle}>{this.props.label}</Text>
        <TextInput 
          style={[this.props.textInputStyle]} 
          multiline={this.props.multiline} // Add multiline prop
          numberOfLines={this.props.numberOfLines} // Add numberOfLines prop
          {...this.props} />
      </View>
    );
  }
}

/**
 * AppButton
 */
class AppButton extends Component {
  constructor(props) {
    super(props);

    if (props.theme) {
      switch (props.theme) {
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
    } else {
      this.backgroundColor = '#286090';
    }

    // Initialize the icon name from the props or default to null
    this.iconName = props.icon || null;
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        background={
          Platform.OS === 'android'
            ? TouchableNativeFeedback.SelectableBackgroundBorderless(210)
            : ''
        }>
        <View
          style={[
            buttonStyles.button,
            {backgroundColor: this.backgroundColor},
          ]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
          {/* Render the icon only if an icon name is provided */}
          {this.iconName && (
            <Ionicons
              name={this.iconName}
              size={30} // Adjust the icon size as needed
              color="white" // Set the icon color
              margin={10} // Add space between icon and text
            />
          )}
          <Text style={buttonStyles.buttonText}>{this.props.title}</Text>
          </View> 
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const buttonStyles = StyleSheet.create({
  button: {
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    padding: 10,
    fontSize: 16,
    color: 'white',
  },
});

/**
 * PickerWithLabel
 */

class PickerWithLabel extends Component {
  constructor(props) {
    super(props);

    this.orientation = this.props.orientation
      ? this.props.orientation == 'horizontal'
        ? 'row'
        : 'column'
      : 'column';
  }

  render() {
    return (
      <View style={[inputStyles.container, {flexDirection: this.orientation}]}>
        <Text style={this.props.textLabelStyle}>{this.props.label}</Text>
        <Picker {...this.props}>
          {this.props.items.map((item, index) => {
            return (
              <Picker.Item
                label={item.value}
                value={item.key}
                key={item.key}
                style={this.props.pickerItemStyle}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}

const inputStyles = StyleSheet.create({
  container: {
    height: 100,
  },
});

/**
 * Export modules
 */
module.exports = {
  InputWithLabel: InputWithLabel,
  AppButton: AppButton,
  PickerWithLabel: PickerWithLabel,
};