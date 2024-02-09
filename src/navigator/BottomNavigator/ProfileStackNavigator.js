import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../ProfileScreen';
import CartScreen from '../CartScreen';
import Wishlist from '../ProfileScreen/Wishlist';
import EditProfile from '../ProfileScreen/EditProfile';
import MyAddress from '../ProfileScreen/MyAddress';
import NewAddress from '../../Components/AddressComponent/NewAddress';
import MyOrderList from '../ProfileScreen/MyOrders';
import OrderDetails from '../ProfileScreen/MyOrders/OrderDetails';
import Location from '../../Components/AddressComponent/Location';
import Payment from '../ProfileScreen/Payment';
import Notification from '../ProfileScreen/Notifications';

const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="WishlistScreen" component={Wishlist} />
      <Stack.Screen name="EditProfileScreen" component={EditProfile} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
      <Stack.Screen name="NewAddress" component={NewAddress} />
      <Stack.Screen name="OrderList" component={MyOrderList} />
      <Stack.Screen name="OrderDetail" component={OrderDetails} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="PaymentMethods" component={Payment} />
      <Stack.Screen name="NotificationScreen" component={Notification} />
    </Stack.Navigator>
  );
}
