import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserData} from '../../screens/Store/actions/userAction';
import {updateDisplayName} from '../../services/socialAuth';

export const saveUserDetails = async (userDetails, dispatch) => {
  dispatch(setUserData(userDetails));
  await AsyncStorage.setItem('@USERDATA', JSON.stringify(userDetails));
  return;
};

export const updateNameWithSaveDetails = async (
  userCredentials,
  name,
  dispatch,
) => {
  if (userCredentials?.user) {
    await updateDisplayName(userCredentials, name);
    let user = JSON.parse(JSON.stringify(userCredentials.user));
    user = {...user, displayName: name};
    saveUserDetails(user, dispatch);
  }
  return;
};
