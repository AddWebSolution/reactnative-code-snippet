import {Image, View, StyleSheet, Platform} from 'react-native';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {languageArray} from '../../utility/index';
import {
  setAppLanguage,
  getAllLanguages,
} from '../../Store/actions/LanguageAction';
import {regionLanguage} from '../../utility/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../../constant/Images';
import React from 'react';

const Splash = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let bottomTabNavigatorTimeout;
  useEffect(() => {
    loadAllData();
    return () => {
      if (bottomTabNavigatorTimeout) {
        clearTimeout(bottomTabNavigatorTimeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAllData = async () => {
    dispatch(getAllLanguages());
    const tempLanguage = await AsyncStorage.getItem('@language');
    if (tempLanguage) {
      let storedLanguage = JSON.parse(tempLanguage);
      dispatch(setAppLanguage(storedLanguage));
    } else {
      let regionalLanguage = languageArray.find(
        language => language.language_name === regionLanguage,
      );
      dispatch(setAppLanguage(regionalLanguage));
    }
    if (Platform.OS === 'ios') {
      bottomTabNavigatorTimeout = setTimeout(() => {
        if (navigation.isFocused()) {
          navigation.replace('BottomTabNavigator');
        }
      }, 2000);
    } else {
      navigation.replace('BottomTabNavigator');
    }
  };

  return (
    <View style={styles.indicatorContainer}>
      <Image
        source={Platform.OS === 'ios' ? Images.loadergif : Images.splashgif}
        style={styles.loaderImage}
      />
    </View>
  );
};
export default Splash;

const styles = StyleSheet.create({
  loaderImage: {
    alignSelf: 'center',
  },
  indicatorContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#0080FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
