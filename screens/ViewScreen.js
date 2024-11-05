import React, {Component} from 'react';
import {Alert, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {InputWithLabel} from '../UI';
import {FloatingAction} from 'react-native-floating-action';
import styles from '../styles';
const actions = [
  {
    text: 'Edit',
    color: '#c80000',
    icon: require('../img/edit_icon.png'),
    name: 'edit',
    position: 2,
  },
  {
    text: 'Delete',
    color: '#c80000',
    icon: require('../img/delete_icon.jpg'),
    name: 'delete',
    position: 1,
  },
];
let config = require('../Config');
let common = require('../CommonData');
export default class ViewScreen extends Component {
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
  _delete() {
    Alert.alert('Confirm to delete ?', this.state.books.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          let url = config.settings.serverPath + '/api/booklist/' + this.state.bookID;
          console.log(url);
          fetch(url, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: this.state.bookID}),
          })
          .then(response => {
            if (!response.ok) {
              Alert.alert('Error:', response.status.toString());
              throw Error('Error ' + response.status);
            }
            return response.json();
          })
          .then(responseJson => {
            if (responseJson.affected == 0) {
              Alert.alert('Error in DELETING');
            }
            else{
              Alert.alert('Deleted successfully')
            }
          })
          .catch(error => {
            console.error(error);
          });
        this.props.route.params.refresh();
        this.props.navigation.goBack();
        },
      },
    ]);
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
          <Image source={{uri: 'asset:/image/' + formattedImage}} style={styles.imageAdminView}/>
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
        </ScrollView>
        <FloatingAction
          actions={actions}
          color={'#a80000'}
          onPressItem={name => {
            switch (name) {
              case 'edit':
                this.props.navigation.navigate('EditScreen', {
                  id: books ? books.id : 0,
                  headerTitle: books ? books.name : '',
                  refresh: this._queryByID,
                  homeRefresh: this.props.route.params.refresh,
                });
                break;
              case 'delete':
                this._delete();
                break;
            }
          }}
        />
      </View>
    );
  }
}