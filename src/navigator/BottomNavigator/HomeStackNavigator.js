import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import CartScreen from '../CartScreen';
import MyOrderList from '../ProfileScreen/MyOrders';
import OrderDetails from '../ProfileScreen/MyOrders/OrderDetails';
import PLPScreen from '../ProductListScreen';
import ProductDetail from '../ProductDetail';
import Notification from '../ProfileScreen/Notifications';
import Wishlist from '../ProfileScreen/Wishlist';
import Payment from '../ProfileScreen/Payment';
import MyAddress from '../ProfileScreen/MyAddress';
import Location from '../../Components/AddressComponent/Location';
import NewAddress from '../../Components/AddressComponent/NewAddress';
import DeepLinkProducts from '../ProductDetail/DeepLinkProducts';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="OrderList" component={MyOrderList} />
      <Stack.Screen name="OrderDetail" component={OrderDetails} />
      <Stack.Screen name="PLP" component={PLPScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="DeepLinkProducts" component={DeepLinkProducts} />
      <Stack.Screen name="NotificationScreen" component={Notification} />
      <Stack.Screen name="WishlistScreen" component={Wishlist} />
      <Stack.Screen name="PaymentMethods" component={Payment} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="NewAddress" component={NewAddress} />
    </Stack.Navigator>
  );
}
