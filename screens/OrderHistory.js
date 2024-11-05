import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InputWithLabel, AppButton} from '../UI';
import styles from '../styles';

let config = require('../Config');

export default class RentalHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: '',
        phone: '',
        books: [],
        isFetching: false,
    };
    this._query = this._query.bind(this);
  }
  componentDidMount() {
    this._getList();
    this._query();
    this.props.navigation.setOptions({
      headerTitle: 'Order History',
    });       
  }
  _query() {
    let url = config.settings.serverPath + '/api/booklist/orders';
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
  async _getList(){
    try{
        const keys = ['name', 'email', 'phone'];
        AsyncStorage.multiGet(keys, (err, stores) => {
            const newStates = {};
      
            stores.map((result, i, store) => {
              const key = store[i][0];
              const value = store[i][1];
      
              console.log(`Key: ${key}, Value: ${value}`);

              newStates[key] = value;
            });

            this.setState(newStates);
        });
    }
    catch(error){
        console.log('## ERROR READING ITEM ##: ', error);
    }
  }
  _clearHistory(){
    Alert.alert('Confirm to clear order history?', '', 
    [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          let url = config.settings.serverPath + '/api/booklist/clear_history';
  
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
                console.log("Orders clear successfully")
                this._query();                      
              } else {
                console.log('Response did not contain a message.');
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
      },
    ]);    
  }  
  render() {
    return (
      <View style={styles.container1}>
        {this.state.books.length === 0 ? (
        <Text style={styles.emptyMessage}>No rental history.</Text>) :
        <FlatList
          refreshing={this.state.isFetching}
          onRefresh={this._query}
          data={this.state.books}
          style={styles.container2}
          extraData={this.state}
          showsVerticalScrollIndicator={true}
          ListHeaderComponent={
            <>
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Name'}
          value={this.state.name}
          editable={false}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Email'}
          value={this.state.email}
          editable={false}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Phone No'}
          value={this.state.phone}
          editable={false}
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
              title={'Clear Order History'}
              theme={'primary'}
              onPress={()=> this._clearHistory()}
            />
            </>
          }
        />
      }
      </View>
    );
  }
}