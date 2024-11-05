import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/HomeScreen';
import BookListScreen from './screens/BookListScreen';
import CreateScreen from './screens/CreateScreen';
import EditScreen from './screens/EditScreen';
import SearchScreen from './screens/SearchScreen';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import {NavigationContainer} from '@react-navigation/native';
import ViewScreen from './screens/ViewScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import UserBookListScreen from './screens/UserBookListScreen';
import UserViewScreen from './screens/UserViewScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistory from './screens/OrderHistory';
import styles from './styles';

const Stack = createStackNavigator();

export default class App extends Component {

render (){

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="BookListScreen" component={BookListScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="CreateScreen" component={CreateScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="ViewScreen" component={ViewScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="EditScreen" component={EditScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="WishlistScreen" component={WishlistScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="CartScreen" component={CartScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="AdminLoginScreen" component={AdminLoginScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="UserBookListScreen" component={UserBookListScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="UserViewScreen" component={UserViewScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="OrderScreen" component={OrderScreen} options={styles.headerStyleOption}></Stack.Screen>
        <Stack.Screen name="OrderHistory" component={OrderHistory} options={styles.headerStyleOption}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

}

