import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { AppButton } from '../UI';
import styles from '../styles';

export default class HomeScreen extends Component {
  render() {
    return (
      // <ImageBackground source={require('../img/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.backgroundOverlay}> 
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Our Book Rental App</Text>
        <View style={styles.buttonContainer}>
          {this.renderButton('Book List', 'book', 'UserBookListScreen', require('../img/book1.jpg'))}
          {this.renderButton('Bookmark', 'bookmarks', 'WishlistScreen', require('../img/bookmark.png'))}
          {this.renderButton('Cart', 'cart', 'CartScreen', require('../img/cart.png'))}
          {this.renderButton('Order History', 'time', 'OrderHistory', require('../img/history.jpeg.jpg'))}
          {this.renderButton('Search Book', 'search', 'SearchScreen', require('../img/Search.jpg'))}
          {this.renderButton('Contact Us', 'call', 'ContactUsScreen', require('../img/contact.png'))}
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.adminLoginButton}
            onPress={() => this.props.navigation.navigate('AdminLoginScreen')}
          >
            <Text style={styles.adminLoginButtonText}>Admin Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      // </ImageBackground>
    );
  }

  renderButton(title, icon, screen, imageSource) {
    return (
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContent}>
        <Image source={imageSource} style={styles.image} />
          <AppButton
            title={title}
            theme={'primary'}
            icon={icon}
            onPress={() => this.props.navigation.navigate(screen)}
          />
          
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: 'Home',
    });
  } 
}
