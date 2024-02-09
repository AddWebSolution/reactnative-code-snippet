import {AUTH_SUCCESS, AUTH_LOGOUT, UPDATE_NAME_EMAIL} from '../types';

export const setUserData = data => ({
  type: AUTH_SUCCESS,
  payload: data,
});

export const updateNameEmail = data => ({
  type: UPDATE_NAME_EMAIL,
  payload: data,
});

export const clearUserData = () => ({
  type: AUTH_LOGOUT,
});
