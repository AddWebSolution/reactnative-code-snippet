import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../AuthScreen/SignUp';
import OtpVerification from '../AuthScreen/OtpVerification';
import OtpVerifySuccess from '../AuthScreen/OtpVerifySuccess';
import Login from '../AuthScreen/SignIn';
import ForgotPassword from '../AuthScreen/ForgotPassword';
import NewPassword from '../AuthScreen/ForgotPassword/NewPassword';

const Auth = createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator
      initialRouteName={'SignUpScreen'}
      screenOptions={{headerShown: false}}>
      <Auth.Screen name="SignUpScreen" component={Signup} />
      <Auth.Screen name="OtpVerification" component={OtpVerification} />
      <Auth.Screen name="OtpVerifySuccess" component={OtpVerifySuccess} />
      <Auth.Screen name="LoginScreen" component={Login} />
      <Auth.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
      <Auth.Screen name="NewPasswordScreen" component={NewPassword} />
    </Auth.Navigator>
  );
};

export default AuthStack;
