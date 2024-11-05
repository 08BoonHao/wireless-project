import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppButton} from '../UI';
import styles from '../styles';

let config = require('../Config');

export default class CartScreen extends Component {
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
      headerTitle: 'Cart',
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
  removeCart(book){
    Alert.alert('Confirm to remove from cart?', book.name, 
    [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          let url = config.settings.serverPath + '/api/booklist/remove_from_cart/' + book.id;
  
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
  _placeOrder(){
    Alert.alert('Confirm to proceed?','',
    [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          this.props.navigation.navigate('OrderScreen', {
            refresh: this._query,
          });
        },
      },
    ]
    );  
  }
  render() {
    return (
      <View style={styles.container1}>
        {this.state.books.length === 0 ? (
        <Text style={styles.emptyMessage}>No book added to the cart yet.</Text>) :
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
                  <Ionicons name={"trash"} size={80} onPress={() => this.removeCart(item)}/>
                </View>
              </View>
              </TouchableHighlight>
          )}
          keyExtractor={item => {
            item.id.toString();
          }}
        />
      }
     {this.state.books.length > 0 && (
        <View style={styles.bottomBarCart}>
          <Text style={styles.cartCountText}>
            Books to be rented: {this.state.books.length}
          </Text>
          <View style={styles.buttonContainerCart}>
            <AppButton
              title={'Place Order'}
              style={styles.buttonCart}
              onPress={() => this._placeOrder()}
            />
          </View>
        </View>
      )}
      </View>
    );
  }
}