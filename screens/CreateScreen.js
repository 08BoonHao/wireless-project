import React, {Component} from 'react';
import {ScrollView, Alert} from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../UI';
import styles from '../styles'

let config = require('../Config');
let common = require('../CommonData');

export default class CreateScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '01',
      author: '',
      image: '',
      wishlist: 'no',
      cart: 'no',
      orders: 'no',
    };
    this._insert = this._insert.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setOptions({headerTitle: 'Add New Book'});
  }

  _insert() {
    if (this.state.name === '' || this.state.image === '' || this.state.author === ''){
      Alert.alert("Please fill in all the fields.")
    }
    else if (!this.state.image.endsWith(".jpg")){
      Alert.alert("Please make sure that the image field ends with '.jpg' word")
    }
    else{
      
    let url = config.settings.serverPath + '/api/booklist';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
          Alert.alert('Added successfully');
        } else {
          Alert.alert('Error in SAVING');
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
    return (
      <ScrollView style={styles.container2}>
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Name'}
          placeholder={'Type Book Name here'}
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
            this.setState({category: itemValue});
          }}
          orientation={'vertical'}
          textStyle={{fontSize: 24}}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'Type Image here'}
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
          placeholder={'Type Author here'}
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
          onPress={this._insert}
        />
      </ScrollView>
    );
  }
}