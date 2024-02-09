import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  WISHLIST_LOADING,
  WISHLIST_SUCCESS,
  WISHLIST_FAIL,
  WISHLIST_RESET,
  WISHLIST_PAGE_CHANGE,
} from '../types';

const initialState = {
  isWishlistLoading: false,
  wishlistItems: [],
  wishlistFailed: '',
  wishlistPage: 1,
  wishlistTotal: 0,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
      };

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        WISHLIST_ITEMS: [],
      };

    case WISHLIST_LOADING:
      return {...state, isWishlistLoading: action?.payload};

    case WISHLIST_SUCCESS:
      return {
        ...state,
        wishlistItems: action.payload.WishLists,
        isWishlistLoading: false,
        wishlistFailed: '',
      };

    case WISHLIST_FAIL:
      return {
        ...state,
        wishlistFailed: action.payload,
        isWishlistLoading: false,
      };

    case WISHLIST_PAGE_CHANGE:
      return (state = {...state, wishlistPage: action.payload});

    case WISHLIST_RESET:
      return (state = {...state, wishlistItems: []});
    default:
      return state;
  }
};

export default wishlistReducer;
