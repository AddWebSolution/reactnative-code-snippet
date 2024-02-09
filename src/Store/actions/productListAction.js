import {
  PRODUCT_LIST_LOADING,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_PAGE_CHANGE,
  PRODUCT_DETAIL_DATA_SUCCESS,
  PRODUCT_DETAIL_DATA_LOADING,
  PRODUCT_FILTER_BY_CATEGORY_SUCCESS,
  PRODUCT_DETAIL_DATA_RESET,
  PRODUCT_DETAIL_DATA_FAILED,
  PRODUCT_DETAIL_INFO_STORE,
  PRODUCT_BUTTON_TAPPED,
  UPDATE_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM,
  UPDATE_CART_BUTTON,
} from '../types';
import {ProductListAPICall} from '../../../services/apis/ProductAPI';
import {
  SEARCH_API,
  CREATE_SHARE_LINK_API,
  CREATE_PLP_SHARE_LINK_API,
} from '../../../utility/apiUrls';
import sendRequest from '../../../services/axios/AxiosApiRequest';

export const productListLoadingStart = bool => ({
  type: PRODUCT_LIST_LOADING,
  payload: bool,
});

export const productListSuccess = data => ({
  type: PRODUCT_LIST_SUCCESS,
  payload: data,
});

export const productListFail = error => ({
  type: PRODUCT_LIST_FAIL,
  payload: error,
});

export const productListReset = () => ({
  type: PRODUCT_LIST_RESET,
});

export const productListPageChange = page => ({
  type: PRODUCT_LIST_PAGE_CHANGE,
  payload: page,
});

//=====================Product Detail API Call=================

export const productDetailReset = () => ({
  type: PRODUCT_DETAIL_DATA_RESET,
});

export const productDetailLoading = () => ({
  type: PRODUCT_DETAIL_DATA_LOADING,
  // payload: bool
});

export const productDetailDataSuccess = data => ({
  type: PRODUCT_DETAIL_DATA_SUCCESS,
  payload: data,
});

export const productDetailFailed = error => ({
  type: PRODUCT_DETAIL_DATA_FAILED,
  payload: error,
});

//=====================Product Detail filter by category API Call=================

export const productFilterByCategorySuccess = data => ({
  type: PRODUCT_FILTER_BY_CATEGORY_SUCCESS,
  payload: data,
});

//=====================Product QTY AND ID STORE=================

export const productInfoStore = data => ({
  type: PRODUCT_DETAIL_INFO_STORE,
  payload: data,
});

//=====================Product BUTTON TAPPED INFO=================

export const setTappedButtonName = bool => ({
  type: PRODUCT_BUTTON_TAPPED,
  payload: bool,
});

export const updateWishlistProduct = id => ({
  type: UPDATE_WISHLIST_ITEM,
  payload: id,
});

export const removeWishlistProduct = id => ({
  type: REMOVE_WISHLIST_ITEM,
  payload: id,
});

export const updateCartButton = id => ({
  type: UPDATE_CART_BUTTON,
  payload: id,
});

export const getProductList = (
  page,
  categoryId,
  isNavigationSection,
  searchText,
) => {
  let limit = 10;
  return async dispatch => {
    await ProductListAPICall(
      page,
      categoryId,
      limit,
      isNavigationSection,
      searchText,
    )
      .then(response => {
        console.log('response from product list api call : ', response);
        if (response?.data) {
          dispatch(productListSuccess(response?.data));
        }
      })
      .catch(err => {
        dispatch(productListFail(err));
      });
  };
};

//=============Product Detail API Call====================

export const globalSearchAPICall = searchTxt => dispatch =>
  new Promise(async (resolve, reject) => {
    sendRequest({
      url: SEARCH_API,
      method: 'GET',
      params: {
        search: searchTxt,
      },
    })
      .then(response => {
        console.log('sdflhsldfjh : ', response);
        if (response?.success === true) {
          resolve(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });

export const createShareLinkApiCall = productSlug => dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await sendRequest({
        url: CREATE_SHARE_LINK_API,
        method: 'POST',
        data: {
          link: productSlug,
        },
      });
      resolve(response);
    } catch (error) {
      console.error('Error from CREATE_SHARE_LINK_API:', error);
      reject(error);
    }
  });
};

export const createPLPShareLinkApiCall =
  (criteriaData, pageNumber) => dispatch => {
    const limit = criteriaData?.limit || 20;
    const offset = limit * (pageNumber - 1);
    const filters = criteriaData.filters
      ? [
          ...criteriaData.filters,
          {
            status: 'PUBLISH',
          },
        ]
      : [
          {
            status: 'PUBLISH',
          },
        ];
    const data = {
      criteria: {
        ...criteriaData,
        filters: filters,
        offset: offset,
        limit: limit,
      },
    };
    return new Promise(async (resolve, reject) => {
      try {
        const response = await sendRequest({
          url: CREATE_PLP_SHARE_LINK_API,
          method: 'POST',
          data: data,
        });
        resolve(response);
      } catch (error) {
        console.error('Error from CREATE_PLP_SHARE_LINK_API:', error);
        reject(error);
      }
    });
  };
