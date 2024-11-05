import React, {Component} from "react";
import {Text,View, Image, Alert} from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import {InputWithLabel, AppButton} from '../UI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles'

let config = require('../Config');

export default class OrderScreen extends Component <Props>{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            books: [],
            isFetching: false,
        }
        this._query = this._query.bind(this);      
    }
    componentDidMount() {
        this._query();
        this.props.navigation.setOptions({
          headerTitle: 'Order',
        });         
    }
    _query() {
      let url = config.settings.serverPath + '/api/booklist/cart';
      this.setState({isFetching: true});
      fetch(url)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            Alert.alert('Error:', response.status.toString());
            throw Error('Error ' + response.status);
          }
          this.setState({isFetching: false});
          return response.json();
        })
        .then(books => {
          console.log(books);
          this.setState({books: books});
        })
        .catch(error => {
          console.log(error);
        });
    }
    async _setItem(){
        const {name, email, phone} = this.state;
        try{
            await AsyncStorage.multiSet([
                ['name', name], ['email', email], ['phone', phone]])
        }
        catch (error){
            console.log('## ERROR SAVING ITEM ##: ', error);
        }
    }
    _finish(){
        const {name, email, phone} = this.state;

        // Regular expression for email validation - "something@something.something."
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name === '' || email === '' || phone === ''){
            Alert.alert("Error! Please fill in all the fields.")
        }
        else if (!emailRegex.test(email)){
            Alert.alert("Error! Incorrect email format.")
        }
        else{
            Alert.alert('Confirm to proceed?','',
            [
              {
                text: 'No',
                onPress: () => {},
              },
              {
                text: 'Yes',
                onPress: () => {
                  this._setItem()
                  let url = config.settings.serverPath + '/api/booklist/place_order';
  
                  fetch(url, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.state.books),
                  })
                    .then(response => response.json())
                    .then(data => {
                      console.log('Response:', data); // Log the entire response object
                      if (data && data.message) {
                        Alert.alert(data.message);
                        this.props.navigation.navigate('Home');
                        this.setState({ name: '', email: '', phone: '' });                        
                      } else {
                        console.log('Response did not contain a message.');
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                },
              },
            ]
            );      

        }    
    }      
    render() {
        return (
          <FlatList 
            refreshing={this.state.isFetching}
            onRefresh={this._query}
            style={styles.container2}
            data={this.state.books}
            extraData={this.state}
            showsVerticalScrollIndicator={true}
            ListHeaderComponent={
                <>
            <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              label={'Name'}
              placeholder={'Type Name here'}
              value={this.state.name}
              onChangeText={name => {
                this.setState({name});
              }}
              orientation={'vertical'}
            />
            <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              placeholder={'Type Email here'}
              label={'Email'}
              value={this.state.email}
              onChangeText={email => {
                this.setState({email});
              }}
              keyboardType={'email-address'}
              orientation={'vertical'}
            />
            <InputWithLabel
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              placeholder={'Type Phone No. here'}
              label={'Phone No'}
              value={this.state.phone}
              onChangeText={phone => {
                this.setState({phone});
              }}
              keyboardType={'numeric'}
              orientation={'vertical'}
            />
        <Text style={styles.booklist}>Book Rented</Text>
                </>
            }

          renderItem={({item}) => (
              <View style={styles.bookBox}>
                <Image source={{uri: 'asset:/image/' + item.image}} style={styles.imageCart}/>
                <View style={styles.bookInfo}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                </View>
              </View>
          )}
          keyExtractor={item => {
            item.id.toString();
          }}

          ListFooterComponent={
            <>
            <AppButton
              style={styles.button}
              title={'Finish'}
              theme={'primary'}
              onPress={()=> this._finish()}
            />
            </>
          }
          />
        );
      }
}