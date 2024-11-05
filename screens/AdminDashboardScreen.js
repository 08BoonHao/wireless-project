import React, {Component} from "react";
import {View} from "react-native";
import {AppButton} from '../UI';


export default class AdminDashBoardScreen extends Component{
    render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <AppButton title={'Book List'} theme={'primary'} icon={'book'} onPress={() => this.props.navigation.navigate('BookListScreen')} />
                <AppButton title={'Logout'} icon={'log-out'} theme={'primary'} onPress={() => this.props.navigation.navigate('Home')}/>
            </View>
        )
    }
}