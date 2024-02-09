import {
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_PAGE_CHANGE,
  PRODUCT_DETAIL_DATA_LOADING,
  PRODUCT_DETAIL_DATA_SUCCESS,
  PRODUCT_FILTER_BY_CATEGORY_SUCCESS,
  PRODUCT_DETAIL_DATA_RESET,
  PRODUCT_DETAIL_DATA_FAILED,
  PRODUCT_DETAIL_INFO_STORE,
  PRODUCT_BUTTON_TAPPED,
  UPDATE_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM,
  UPDATE_CART_BUTTON,
} from '../types';

const initialState = {
  isListLoading: false,
  productList: [],
  productListFail: '',
  productListPage: 1,
  productTotalCount: 0,

  //================Product Detall APIs==============

  isDetailPageLoad: false,
  productDetail: {},
  productDetailFailed: '',

  productFilterByCategory: [],

  productQtyIdInfo: '',

  isBuyNowButton: false,
};

const productListReducer = (state = initialState, action) => {
  // console.log('action.payload : ', action.payload)
  switch (action.type) {
    case PRODUCT_LIST_LOADING:
      return {...state, isListLoading: true};

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: [...state.productList, ...action.payload.rows],
        productTotalCount: action.payload.count,
        isListLoading: false,
        productListFail: '',
      };

    case PRODUCT_LIST_FAIL:
      return {...state, productListFail: action.payload, isListLoading: false};

    case PRODUCT_LIST_PAGE_CHANGE:
      return (state = {...state, productListPage: action.payload});

    case PRODUCT_LIST_RESET:
      return (state = {...state, productList: []});

    //==================Product Detail APIs==================
    case PRODUCT_DETAIL_DATA_LOADING:
      return {...state, isDetailPageLoad: true};

    case PRODUCT_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        productDetail: action.payload,
        isDetailPageLoad: false,
      };
    case PRODUCT_DETAIL_DATA_RESET:
      return (state = {...state, productDetail: {}});

    case PRODUCT_DETAIL_DATA_FAILED:
      return {
        ...state,
        productDetailFailed: action.payload,
        isDetailPageLoad: false,
      };

    case PRODUCT_FILTER_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        productFilterByCategory: action.payload,
        // isDetailPageLoad: false,
      };

    case PRODUCT_DETAIL_INFO_STORE:
      return (state = {...state, productQtyIdInfo: action.payload});

    case PRODUCT_BUTTON_TAPPED:
      return (state = {...state, isBuyNowButton: action.payload});

    case UPDATE_WISHLIST_ITEM:
      console.log('state.productList?.rows', state.productList, action.payload);
      var arrUpdated = state.productList?.map((item, index) => {
        if (item.id !== action.payload) {
          return item;
        }
        return {
          ...item,
          isLike: true,
        };
      });

      console.log('arrUpdated:', arrUpdated);

      return {
        ...state,
        productList: arrUpdated,
      };

    case REMOVE_WISHLIST_ITEM:
      console.log('state.productList?.rows', state.productList, action.payload);
      var arrUpdated = state.productList?.map((item, index) => {
        if (item.id !== action.payload) {
          return item;
        }
        return {
          ...item,
          isLike: false,
        };
      });

      console.log('arrUpdated:', arrUpdated);

      return {
        ...state,
        productList: arrUpdated,
      };
    case UPDATE_CART_BUTTON:
      console.log(
        'state.HomeCollection?.featuredCategoryByProductJson?.featuredCategoryByProduct?.ManagementCategory?.ManagementProducts',
        state.productDetail?.id === action.payload,
      );
      if (state.productDetail?.id === action.payload) {
        console.log('state.productDetail', state.productDetail);
        return {
          ...state,
          productDetail: {
            ...state.productDetail,
            isCart: true,
          },
        };
      }
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default productListReducer;
