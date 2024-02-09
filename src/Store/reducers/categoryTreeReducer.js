import {
  CATEGORY_TREE_FAIL,
  CATEGORY_TREE_LOADING,
  CATEGORY_TREE_SUCCESS,
} from '../actions/categoryTreeAction';

const initialState = {
  loading: false,
  categories: [],
  categoriesTotalCounts: 0,
  error: '',
};

const categoryTreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_TREE_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: '',
      };
    case CATEGORY_TREE_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload?.records,
        categoriesTotalCounts: action.payload?.count,
      };
    case CATEGORY_TREE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryTreeReducer;
