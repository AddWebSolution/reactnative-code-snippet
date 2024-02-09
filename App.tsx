import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Provider, useDispatch} from 'react-redux';
import {Persistor, Store} from './src/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {Linking} from 'react-native';
import {TimerProvider} from './src/context/GlobalStateContext';
import {homeDataLoadingStart} from './src/Store/actions/HomeAction';
import RootStackScreen from './src/navigator/RootStackNavigator/RootStackScreen';
import handleDeepLink from './src/helpers/Global/DeepLinkUtil';

const AppContent = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation(); // Get the navigation object here

  useEffect(() => {
    const handleDeepLinkAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        await handleDeepLink(initialUrl, dispatch, navigation);
      } else {
        await handleDeepLink(undefined, dispatch, navigation);
      }
      SplashScreen.hide();
    };

    handleDeepLinkAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // The dispatch dependency is not needed because it does not change

  Linking.addEventListener('url', ({url}) => {
    if (url) {
      dispatch(homeDataLoadingStart(true));
      handleDeepLink(url, dispatch, navigation);
    }
  });
  return <></>;
};

const App = (): JSX.Element => {
  return (
    <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <NavigationContainer>
          <TimerProvider>
            <RootStackScreen />
          </TimerProvider>
          <AppContent />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
