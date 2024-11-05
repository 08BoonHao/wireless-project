import React, {Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, TouchableHighlight, Alert } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {AppButton} from '../UI';
import styles from '../styles';

let config = require('../Config');

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        books: [],
        text: '',
    };
  }
  _search(text) {
    let url = config.settings.serverPath + '/api/booklist/search/' + text;
    fetch(url)
      .then(response => {
          console.log(response);
          if (!response.ok){
            Alert.alert('Error: ', response.status.toString());
            throw Error('Error ' + response.status);
          }
          return response.json();
      })
      .then(books =>{
        console.log(books);
        this.setState({books: books});
      })
      .catch(error =>{
        console.log(error);
      })
  }
  _insertWishlist(book) {
    let url = config.settings.serverPath + '/api/booklist/add_to_wishlist/' + book.id;
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data); // Log the entire response object
        if (data && data.message) {
          Alert.alert(data.message);
        } else {
          console.log('Response did not contain a message.');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  _insertCart(book) {
    let url = config.settings.serverPath + '/api/booklist/add_to_cart/' + book.id;
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data); // Log the entire response object
        if (data && data.message) {
          Alert.alert(data.message);
        } else {
          console.log('Response did not contain a message.');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }  
  render() {
    const resultsComponent = this.state.books.length === 0 ? (
      <Text style={styles.emptyMessage}>No results found.</Text>) :
      <FlatList
        data={this.state.books}
        extraData={this.state}
        showsVerticalScrollIndicator={true}
        renderItem={({item}) => (
          <TouchableHighlight
          underlayColor="pink"
          onPress={() => {
            this.props.navigation.navigate('UserViewScreen', {
              id: item.id,
              headerTitle: item.name,
              refresh: this._query,
            });
          }}>
            <View style={styles.bookBox}>
              <Image source={{uri: 'asset:/image/' + item.image}} style={styles.image1}/>
              <View style={styles.bookInfo}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <View style={styles.button2}>
                <AppButton 
                    style={styles.button1}
                    title={'Add to cart'}
                    theme={'danger'}
                    onPress={() => this._insertCart(item)}
                />
 
                <AppButton 
                    style={styles.button1}
                    title={'Add to wishlist'}
                    theme={'primary'}
                    onPress={() => this._insertWishlist(item)}
                />
              </View>
              </View>
            </View>
            </TouchableHighlight>
        )}
        keyExtractor={item => {
          item.id.toString();
        }}
      />
    return (
      <View style={styles.containerSearch}>
        <View style={styles.containerSearchBar}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search books..."
          value={this.state.text}
          onChangeText={text => {
            this.setState({text});
          }}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => this._search(this.state.text)}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => this._search(this.setState({text: ''}))}
        >
          <Text style={styles.searchButtonText}>Clear</Text>
        </TouchableOpacity>
        </View>
        {resultsComponent}
      </View>
    );
  }
}