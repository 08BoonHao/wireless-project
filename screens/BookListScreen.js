import React, {Component} from 'react';
import {View, Text, Alert, Image, TouchableHighlight} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FloatingAction} from 'react-native-floating-action';
import styles from '../styles';

let config = require('../Config');
let common = require('../CommonData');

const actions = [
  {
    text: 'Add',
    icon: require('../img/add_icon.png'),
    name: 'add',
    position: 1,
  },
];

export default class BookListScreen extends Component {
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
      headerTitle: 'Book List',
    });
  }
  _query() {
    let url = config.settings.serverPath + '/api/booklist';
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
  render() {
    return (
      <View style={styles.container1}>
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
                this.props.navigation.navigate('ViewScreen', {
                  id: item.id,
                  headerTitle: item.name,
                  refresh: this._query,
                });
              }}>
              <View style={styles.bookBox}>
                <Image source={{uri: 'asset:/image/' + item.image}} style={styles.image1}/>
                <View style={styles.bookInfo}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>
                  Category: {common.getValue(common.states, item.category)}
                </Text>
                <Text style={styles.itemSubtitle}>Author: {item.author}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => {
            item.id.toString();
          }}
          
      />

      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        color={'#a80000'}
        onPressItem={() => {
          this.props.navigation.navigate('CreateScreen', {
            refresh: this._query,
          });
        }}
      />

      </View>
    );
  }
}