import {
  HOME_DATA_LOADING,
  HOME_DATA_SUCCESS,
  HOME_DATA_FAIL,
  UPADTE_RECENT_VIEW_LIKE,
  REMOVE_RECENT_VIEW_LIKE,
  UPADTE_SUGGESTED_LIKE,
  REMOVE_SUGGESTED_LIKE,
  UPADTE_NEW_ARRIVAL_LIKE,
  REMOVE_NEW_ARRIVAL_LIKE,
  UPADTE_FEATURED_CART,
  HOME_DATA_RESET,
  UPADTE_TOP_PICK_CART,
} from '../types';

export const homeDataLoadingStart = bool => ({
  type: HOME_DATA_LOADING,
  payload: bool,
});

export const homeDataSuccess = item => {
  return {
    type: HOME_DATA_SUCCESS,
    payload: item,
  };
};

export const homeDataFail = error => ({
  type: HOME_DATA_FAIL,
  payload: error,
});

export const homeDataReset = () => ({
  type: HOME_DATA_RESET,
});

export const updateFeaturedCart = id => ({
  type: UPADTE_FEATURED_CART,
  payload: id,
});

export const updateTopPicksCart = id => ({
  type: UPADTE_TOP_PICK_CART,
  payload: id,
});

export const updateNewArrivalLike = id => ({
  type: UPADTE_NEW_ARRIVAL_LIKE,
  payload: id,
});

export const removeNewArrivalLike = id => ({
  type: REMOVE_NEW_ARRIVAL_LIKE,
  payload: id,
});

export const updateSuggestedLike = id => ({
  type: UPADTE_SUGGESTED_LIKE,
  payload: id,
});

export const removeSuggestedLike = id => ({
  type: REMOVE_SUGGESTED_LIKE,
  payload: id,
});

export const updateRecentViewLike = id => ({
  type: UPADTE_RECENT_VIEW_LIKE,
  payload: id,
});

export const removeRecentViewLike = id => ({
  type: REMOVE_RECENT_VIEW_LIKE,
  payload: id,
});
