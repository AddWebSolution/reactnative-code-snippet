import NetInfo from '@react-native-community/netinfo';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {Alert, Platform} from 'react-native';
import {getRefreshFirebaseToken} from '../socialAuth';
import DeviceInfo from 'react-native-device-info';
import jwt from 'react-jwt';

var isAlert = false;
const appVersion = DeviceInfo.getReadableVersion(); //23.10.35.3 (version(23.10.35) + build(3))
const platform = Platform.OS; // ios/android

//=============== API Calling function ========================
async function sendRequest(payload) {
  console.log('payload check : ', payload);
  try {
    const token = await getAccessToken();
    console.log('token received from getAccessToken method', token);
    payload.headers = {
      ...payload.headers,
      'Device-Information': JSON.stringify({
        version: appVersion,
        platform: platform,
      }),
    };
    payload.headers = payload.headers
      ? payload.headers.Authorization
        ? payload.headers.Authorization === 'No'
          ? getHeaders(payload.headers)
          : payload.headers
        : {
            ...payload.headers,
            Authorization: token,
          }
      : token
      ? {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      : {
          'content-type': 'application/json',
        };
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      isAlert = false;
      const response = await axiosInstance.request(payload);
      return response?.data;
    } else {
      if (!isAlert) {
        Alert.alert(
          'Alert',
          'Slow or no internet connection. Please check your internet connection',
        );
      } else {
        // return Promise.reject()
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export const axiosInstance = axios.create();

//=============== Axios Interceptors ========================

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async err => {
    const {response, config} = err;
    console.log('Error from API', err);
    try {
      if (response?.status === 401 || response?.status === 403) {
        const freshToken = await APIRefreshToken();
        console.log('axiosInstance>>freshToken', freshToken);
        if (!freshToken) {
          // Handle the case when APIRefreshToken() fails or doesn't return a valid token
          console.error('Invalid or missing refresh token');
          return Promise.reject(response);
        }

        if (response?.request?._headers?.['x-amz-tagging']) {
          let xtag = response?.request?._headers?.['x-amz-tagging'];

          let params = new URLSearchParams(xtag);
          params.delete('token');
          params.append('token', freshToken);

          config.headers['Authorization'] = freshToken;
        } else {
          config.headers['Authorization'] = freshToken;
        }

        return axiosInstance(config);
      } else if (
        response?.status === 403 ||
        response?.status === 455 ||
        response?.status === 502 ||
        response?.status === 400
      ) {
        // Handle other status codes if needed
      }

      return Promise.reject(response);
    } catch (error) {
      console.error('Error in interceptor:', error);
      return Promise.reject(error);
    }
  },
);

//================= Set Access Token =======================
export async function setAccesToken(value) {
  try {
    const token = await EncryptedStorage.getItem('SESSION_TOKEN');
    if (token !== undefined) {
      const sessionToken = JSON.parse(token);
      const newSessionToken = {...sessionToken, accessToken: value};

      await EncryptedStorage.setItem(
        'SESSION_TOKEN',
        JSON.stringify(newSessionToken),
      );
    }
    return value;
  } catch (error) {}
}

//================== Get Access Token =====================
export async function getAccessToken() {
  try {
    const token = await EncryptedStorage.getItem('SESSION_TOKEN');
    console.log('EncryptedStorage token', token);

    if (token) {
      const sessionToken = JSON.parse(token);
      const accessToken = sessionToken?.accessToken;

      if (isTokenExpired(accessToken)) {
        const freshToken = await APIRefreshToken();
        console.log('Refreshed access token:', freshToken);
        await setAccesToken(freshToken);
        return freshToken;
      }

      return accessToken;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

function isTokenExpired(token) {
  try {
    if (token) {
      const isMyTokenExpired = jwt.isExpired(token);
      console.log('isMyTokenExpired', isMyTokenExpired);
      return isMyTokenExpired;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Treat decoding errors as expired
  }
}

//================== Refresh Token API call =====================
export async function APIRefreshToken() {
  const tokenData = await EncryptedStorage.getItem('SESSION_TOKEN');

  const sessionToken = JSON.parse(tokenData);
  const accessToken = sessionToken?.accessToken;

  if (accessToken) {
    const refreshToken = getRefreshFirebaseToken()
      .then(async token => {
        console.log('getRefreshFirebaseToken response :', token);
        await setAccesToken(token);
        return token;
      })
      .catch(err => console.log('getRefreshFirebaseToken err :', err));
    return refreshToken;
  } else {
    return null;
  }
}

//=================== Get Headers =====================
const getHeaders = header => {
  delete header['Authorization'];
  return header;
};

export default sendRequest;
