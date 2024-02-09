import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import HomeStackNavigator from '../BottomNavigator/HomeStackNavigator';
import CategoryStackNavigator from '../BottomNavigator/CategoryStackNavigator';
import CartStackNavigator from '../BottomNavigator/CartStackNavigator';
import ProfileStackNavigator from '../BottomNavigator/ProfileStackNavigator';
import Colors from '../../constant/Colors';
import SVGS from '../../constant/Svgs';
import {hp} from '../../helpers/Global/responsiveFunc';

const {
  HomeIcon,
  HomeActive,
  ProfileIcon,
  ProfileActive,
  CartIcon,
  CartActive,
  CategoryIcon,
  CategoryActive,
} = SVGS;

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({count, focused}) => {
  return (
    <View style={styles.iconContainer}>
      {focused ? <CartActive /> : <CartIcon />}

      {count > 0 && (
        <View style={styles.plusIconContainer}>
          <Text style={styles.countText}>{count > 100 ? '99+' : count}</Text>
        </View>
      )}
    </View>
  );
};

export default function BottomTabNavigator() {
  const {cartItems} = useSelector(state => state.cartReducer);

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      detachInactiveScreens={true}
      backBehavior="history"
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        lazy: true,
        tabBarVisible: true,
        tabBarStyle: {
          height: hp(9.85),
        },
        tabBarActiveTintColor: Colors.themeColor,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color}) => {
          if (route.name === 'HomeTab') {
            return focused ? <HomeActive /> : <HomeIcon />;
          } else if (route.name === 'Category') {
            return focused ? <CategoryActive /> : <CategoryIcon />;
          } else if (route.name === 'Cart') {
            return (
              <CustomTabIcon
                count={cartItems?.length ? cartItems?.length : 0}
                focused={focused}
              />
            );
          } else if (route.name === 'Profile') {
            return focused ? <ProfileActive /> : <ProfileIcon />;
          }
        },
      })}>
      <Tab.Screen
        name="HomeTab"
        options={{gestureEnabled: false}}
        component={HomeStackNavigator}
      />
      <Tab.Screen name="Category" component={CategoryStackNavigator} />
      <Tab.Screen name="Cart" component={CartStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconContainer: {
    position: 'absolute',
    top: -15,
    right: -13,
    backgroundColor: Colors.RED, // Adjust color as needed
    borderRadius: 100,
    padding: 4,
    minWidth: 20,
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countContainer: {
    position: 'absolute',
    top: 20,
    right: 0,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 4,
  },
  countText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
