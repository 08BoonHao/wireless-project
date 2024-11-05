import React, {Component} from "react";
import {Text,View,StyleSheet,TextInput,Alert} from "react-native";
import {InputWithLabel, AppButton} from '../UI';
import styles from '../styles'

export default class AdminLoginScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            password: '',
        };
    }
    componentDidMount() {
        this.props.navigation.setOptions({
          headerTitle: '',
        });       
      }
    _login(){
        if(this.state.name === '' || this.state.password === ''){
            Alert.alert('Empty input')
        }
        else if(this.state.name !== 'admin' && this.state.password !== '123454321'){
            Alert.alert('Invalid name and password')
        }
        else if (this.state.name !== 'admin'){
            Alert.alert('Invalid name')
        }
        else if (this.state.password !== '123454321'){
            Alert.alert('Invalid password')
        }
        else{
            this.props.navigation.navigate('AdminDashboardScreen')
        }
    }

    render(){
        return(
            <View style={styles.containerAdminLogin}>
            <Text style={styles.heading}>Admin Login</Text>
            <InputWithLabel
                textLabelStyle={styles.TextLabel}
                textInputStyle={styles.TextInput}
                label={'Name'}
                placeholder={"Type Name Here"}
                value={this.state.name}
                onChangeText={name => {
                    this.setState({name});
                }}
                orientation={'vertical'}
            />
            <InputWithLabel
                textLabelStyle={styles.TextLabel}
                textInputStyle={styles.TextInput}
                label={'Password'}
                placeholder={"Type Password Here"}
                value={this.state.password}
                onChangeText={password => {
                    this.setState({password});
                }}
                orientation={'vertical'}
                secureTextEntry={true}
            />
            <AppButton
                style={styles.button}
                title={'Login'}
                theme={'primary'}
                onPress={() => this._login()}
            />
          </View>
        );
    }
}