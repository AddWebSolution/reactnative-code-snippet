import {Linking, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import Checkout from '../../screens/Checkout';
import Splash from '../Splash';
import PLPScreen from '../ProductListScreen';
import ProductDetail from '../ProductDetail';
import WebViewScreen from '../WebViewScreen';
import {shouldVersionUpdate} from '../../services/apis';
import {useSelector} from 'react-redux';
import {ANDROID_APP_VERSION, IOS_APP_VERSION} from '@env';
import ErrorScreen from '../Checkout/ErrorScreen';

const androidAppLink =
  'https://play.google.com/store/apps/details?id=com.example.app';
const iosAppLink = 'https://itunes.apple.com/app/example/id111111';
const versionData = {
  platform: Platform.OS,
  version: Platform.OS === 'android' ? ANDROID_APP_VERSION : IOS_APP_VERSION,
};

const Stack = createStackNavigator();

export default function RootStackScreen() {
  const {selectedLanguageItem} = useSelector(state => state.languageReducer);

  useEffect(() => {
    checkUpdateNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUpdateNeeded = async () => {
    try {
      const response = await shouldVersionUpdate(versionData);
      console.log('shouldVersionUpdate new data:', response);
      if (response?.data?.status === true) {
        const title = getLocalizedText(response?.data?.update_message?.title);
        const description = getLocalizedText(
          response?.data?.update_message?.description,
        );
      } else {
        // something is wrong with api and data, app needs to be update
      }
    } catch (error) {
      console.error('Error in checkUpdateNeeded:', error);
    }
  };

  const getLocalizedText = textObject => {
    return selectedLanguageItem?.language_id === 0
      ? textObject?.en
      : textObject?.ar;
  };

  // Code for update version modal click
  const handleUpdateVesion = () => {
    const appStoreLink =
      Platform.OS === 'android' ? androidAppLink : iosAppLink;
    Linking.openURL(appStoreLink).catch(err =>
      console.error('Error opening app store link:', err),
    );
  };

  return (
    <React.Fragment>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="BottomTabNavigator"
          options={{gestureEnabled: false}}
          component={BottomTabNavigator}
        />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      </Stack.Navigator>
    </React.Fragment>
  );
}
