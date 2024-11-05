import React, {Component} from 'react';
import {StyleSheet, View, ScrollView,Alert} from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../UI';
import styles from '../styles';
let config = require('../Config');
let common = require('../CommonData');

export default class EditScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      booksId: this.props.route.params.id,
      name: '',
      category: '',
      author: '',
      image: '',
      wishlist: '',
      cart: '',
      orders: '',
    };
    this._query = this._query.bind(this);
    this._update = this._update.bind(this);
  }
  componentDidMount() {
    this._query();
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.name});
  }
  _query() {
    let url = config.settings.serverPath + '/api/booklist/' + this.state.booksId;
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
        this.setState({
          name: books.name,
          category: books.category,
          image: books.image,
          wishlist: books.wishlist,
          cart: books.cart,
          orders: books.orders,
          author: books.author,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  _update() {
    if (this.state.name === '' || this.state.image === '' || this.state.author === ''){
      Alert.alert("Please fill in all the fields.")
    }
    else if (!this.state.image.endsWith(".jpg")){
      Alert.alert("Please make sure that the image field ends with '.jpg' word")
    }
    else{    
    let url = config.settings.serverPath + '/api/booklist/' + this.state.booksId;

    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.booksId,
        name: this.state.name,
        category: this.state.category,
        image: this.state.image,
        wishlist: this.state.wishlist,
        cart: this.state.cart,
        orders: this.state.orders,
        author: this.state.author,
      }),
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json();
      })
      .then(respondJson => {
        if (respondJson.affected > 0) {
          Alert.alert('Record UPDATED for', this.state.name);
        } else {
          Alert.alert('Error in UPDATING');
        }
        this.props.route.params.refresh();
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  render() {
    let books = this.state.books;
    return (
      <View style={styles.container2}>
        <ScrollView>
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Name'}
            value={this.state.name}
            onChangeText={name => {
              this.setState({name});
            }}
            orientation={'vertical'}
          />
          <PickerWithLabel
            textLabelStyle={styles.TextLabel}
            pickerItemStyle={styles.pickerItemStyle}
            label={'Category'}
            items={common.states}
            mode={'dialog'}
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({state: itemValue});
            }}
            orientation={'vertical'}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Image'}
            value={this.state.image}
            onChangeText={image => {
              this.setState({image});
            }}
            orientation={'vertical'}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Author'}
            value={this.state.author}
            onChangeText={author => {
              this.setState({author});
            }}
            orientation={'vertical'}
          />
          <AppButton
            style={styles.button}
            title={'Save'}
            theme={'primary'}
            onPress={this._update}
          />
        </ScrollView>
      </View>
    );
  }
}