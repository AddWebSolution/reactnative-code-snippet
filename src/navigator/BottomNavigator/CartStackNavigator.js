import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartScreen from '../CartScreen';
import Wishlist from '../ProfileScreen/Wishlist';
import MyOrderList from '../ProfileScreen/MyOrders';
import OrderDetails from '../ProfileScreen/OrderDetails';
import MyAddress from '../ProfileScreen/MyAddress';
import NewAddress from '../../Screen/Address/NewAddress';
import Location from '../../Screen/Address/Location';

const Stack = createStackNavigator();

export default function CartStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="WishlistScreen" component={Wishlist} />
      <Stack.Screen name="OrderList" component={MyOrderList} />
      <Stack.Screen name="OrderDetail" component={OrderDetails} />
      <Stack.Screen name="MyAddress" component={MyAddress} />
      <Stack.Screen name="NewAddress" component={NewAddress} />
      <Stack.Screen name="Location" component={Location} />
    </Stack.Navigator>
  );
}
