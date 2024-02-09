import {
  ORDER_LIST_LOADING,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,
  ORDER_LIST_PAGE_CHANGE,
  ORDER_DETAIL_DATA_LOADING,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  BUY_NOW_LIST_LOADING,
  BUY_NOW_LIST_SUCCESS,
  BUY_NOW_LIST_FAIL,
} from '../types';

const initialState = {
  isOrderDataLoading: false,
  orderList: [],
  orderFailed: '',
  orderPageChange: 1,
  orderTotal: 0,

  ///////////////////////Detail//////////////////////

  isOrderDetailLoading: false,
  orderDetail: {},
  orderDetailFailed: '',

  isProductLoading: false,
  Product: [],
  ProductData: {},
  productFail: '',
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LIST_LOADING:
      return {...state, isOrderDataLoading: true};

    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderList: [...state.orderList, ...action.payload],
        orderTotal: 30,
        isOrderDataLoading: false,
        orderFailed: '',
      };

    case ORDER_LIST_FAIL:
      return {...state, orderFailed: action.payload, isOrderDataLoading: false};

    case ORDER_LIST_PAGE_CHANGE:
      return (state = {...state, orderPageChange: action.payload});

    case ORDER_LIST_RESET:
      return (state = {...state, orderList: []});

    ///////////////////Detail///////////////

    case ORDER_DETAIL_DATA_LOADING:
      return {...state, isOrderDetailLoading: true};

    case ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: action.payload,
        isOrderDetailLoading: false,
        orderDetailFailed: '',
      };

    case ORDER_DETAIL_FAIL:
      return {
        ...state,
        orderDetailFailed: action.payload,
        isOrderDetailLoading: false,
      };

    case BUY_NOW_LIST_LOADING:
      return {...state, isProductLoading: true};

    case BUY_NOW_LIST_SUCCESS:
      return {
        ...state,
        Product: action.payload.CartProducts,
        ProductData: action.payload,
        isProductLoading: false,
        productFail: '',
      };

    case BUY_NOW_LIST_FAIL:
      return {...state, productFail: action.payload, isProductLoading: false};

    default:
      return state;
  }
};

export default orderReducer;
