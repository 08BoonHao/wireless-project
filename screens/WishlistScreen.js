import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight,Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles'; 
let config = require('../Config');

export default class WishlistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        books: [],
        isFetching: false,
    };
    this._query = this._query.bind(this);
  }
  componentDidMount() {
    this._query();
    this.props.navigation.setOptions({
      headerTitle: 'Bookmark',
    }); 
  }
  _query() {
    let url = config.settings.serverPath + '/api/booklist/wishlist';
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
  removeWishlist(book){
    Alert.alert('Confirm to remove from wishlist?', book.name, 
    [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          let url = config.settings.serverPath + '/api/booklist/remove_from_wishlist/' + book.id;
  
          fetch(url, {
            method: 'PUT',
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
        <Text style={styles.emptyMessage}>No books added to the wishlist yet.</Text>) :
        <FlatList
          refreshing={this.state.isFetching}
          onRefresh={this._query}
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
                <Image source={{uri: 'asset:/image/' + item.image}} style={styles.imageCart}/>
                <View style={styles.bookInfo}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                </View>
                <View style={styles.icon}>
                  <Ionicons name={"trash"} size={80} onPress={() => this.removeWishlist(item)}/>
                </View>
              </View>
              </TouchableHighlight>
          )}
          keyExtractor={item => {
            item.id.toString();
          }}
        />
      }
      </View>
    );
  }
}