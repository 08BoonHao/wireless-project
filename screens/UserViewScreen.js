import React, {Component} from 'react';
import {Alert, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {InputWithLabel,AppButton} from '../UI';
import styles from '../styles';

let config = require('../Config');
let common = require('../CommonData');
export default class UserViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookID: this.props.route.params.id,
      books: null,
    };
    this._queryByID = this._queryByID.bind(this);
  }
  _queryByID() {
    let url = config.settings.serverPath + '/api/booklist/' + this.state.bookID;
    console.log(url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(books => {
        this.setState({books: books});
      })
      .catch(error => {
        console.error(error);
      });
  }
  _insertWishlist() {
    let url = config.settings.serverPath + '/api/booklist/add_to_wishlist/' + this.state.bookID;
  
    fetch(url, {
      method: 'POST',
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
        } else {
          console.log('Response did not contain a message.');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  _insertCart() {
    let url = config.settings.serverPath + '/api/booklist/add_to_cart/' + this.state.bookID;
  
    fetch(url, {
      method: 'POST',
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
        } else {
          console.log('Response did not contain a message.');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }  
  componentDidMount() {
    this._queryByID();
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.books.name});
  }
  render() {
    let books = this.state.books;
    const formattedImage = books ? books.image: '';
    return (
      <View style={styles.containerAdminLogin}>
        <ScrollView>
          <Image source={{uri: 'asset:/image/' + formattedImage}} style={styles.imageView}/>
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.MultilineTextInput}
            label={'Name'}
            value={books ? books.name : ''}
            orientation={'vertical'}
            editable={false}
            multiline={true} // Set multiline to true
            numberOfLines={1} // Set the initial number of lines
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Category'}
            value={books ? common.getValue(common.states, books.category) : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Author'}
            value={books ? books.author : ''}
            orientation={'vertical'}
            editable={false}
          />
          
          <AppButton 
            style={styles.buttonView}
            title={'Add to cart'}
            theme={'danger'}
            onPress={() => this._insertCart()}
          />
 
          <AppButton 
            style={styles.buttonView}
            title={'Add to wishlist'}
            theme={'primary'}
            onPress={() => this._insertWishlist()}
          />
        </ScrollView>
      </View>
    );
  }
}