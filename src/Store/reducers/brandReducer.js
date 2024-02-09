import {
  CATEGORY_BRAND_FAIL,
  CATEGORY_BRAND_LOADING,
  CATEGORY_BRAND_SUCCESS,
} from '../actions/brandAction';

const initialState = {
  categoryBrandLoading: false,
  categoryBrand: [],
  categoryBrandError: '',
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_BRAND_LOADING:
      return {
        ...state,
        categoryBrandLoading: action.payload,
        categoryBrandError: '',
      };
    case CATEGORY_BRAND_SUCCESS:
      return {
        ...state,
        categoryBrandLoading: false,
        categoryBrand: action.payload?.records,
        categoriesTotalCounts: action.payload?.count,
      };
    case CATEGORY_BRAND_FAIL:
      return {
        ...state,
        categoryBrandLoading: false,
        categoryBrandError: action.payload,
      };
    default:
      return state;
  }
};

export default brandReducer;
