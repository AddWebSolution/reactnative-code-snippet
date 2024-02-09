import {
  CATEGORY_LIST_LOADING,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET,
  CATEGORY_PAGE_CHANGE,
  SUB_CATEGORY_LIST_LOADING,
  SUB_CATEGORY_LIST_SUCCESS,
  SUB_CATEGORY_LIST_FAIL,
  SUB_CATEGORY_LIST_RESET,
  SUB_CATEGORY_PAGE_CHANGE,
} from '../types';

const initialState = {
  isCatgListLoading: false,
  categoryList: [],
  categoryFailed: '',
  categoryPageNum: 1,
  categoryTotalCounts: 0,

  subCatgListLoading: false,
  subCategoryList: {},
  subCategoryFailed: '',
  subCategoryPageNum: 1,
  subCatgTotalCounts: 0,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_LIST_LOADING:
      return {...state, isCatgListLoading: true};

    case CATEGORY_LIST_SUCCESS:
      const newCategories = action.payload.rows.filter(
        newCategory =>
          !state.categoryList.some(category => category.id === newCategory.id),
      );

      return {
        ...state,
        categoryList: [...state.categoryList, ...newCategories],
        categoryTotalCounts: action.payload.count,
        isCatgListLoading: false,
        categoryFailed: '',
      };

    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        categoryFailed: action.payload,
        isCatgListLoading: false,
      };

    case CATEGORY_LIST_RESET:
      return (state = {...state, categoryList: []});

    case CATEGORY_PAGE_CHANGE:
      return (state = {...state, categoryPageNum: action.payload});

    case SUB_CATEGORY_LIST_LOADING:
      return {...state, subCatgListLoading: true};

    case SUB_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        subCategoryList: {
          ...action.payload,
        },
        subCatgTotalCounts: action.payload.count,
        subCatgListLoading: false,
        subCategoryFailed: '',
      };

    case SUB_CATEGORY_LIST_FAIL:
      return {
        ...state,
        subCategoryFailed: action.payload,
        subCatgListLoading: false,
      };

    case SUB_CATEGORY_LIST_RESET:
      return (state = {...state, subCategoryList: {}});

    case SUB_CATEGORY_PAGE_CHANGE:
      return (state = {...state, subCategoryPageNum: action.payload});

    default:
      return state;
  }
};

export default categoryReducer;
