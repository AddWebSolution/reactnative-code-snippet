import {productSearchAPI} from '../../../services/apis/CategoryAPI';
import {deepLinkAPICall} from '../../../services/apis/ProductAPI';
import convertProductData from '../../ProductListScreen/helper/ConvertToProduct';
import {
  PLP_FAIL,
  PLP_LOADING,
  PLP_PAGE_CHANGE,
  PLP_RESET,
  PLP_SUCCESS,
} from '../types';

export const PLPLoadingStart = bool => ({
  type: PLP_LOADING,
  payload: bool,
});

export const PLPProductSuccess = data => ({
  type: PLP_SUCCESS,
  payload: data,
});

export const PLPListFail = error => ({
  type: PLP_FAIL,
  payload: error,
});

export const PLPReset = () => ({
  type: PLP_RESET,
});

export const PLPPageChange = page => ({
  type: PLP_PAGE_CHANGE,
  payload: page,
});

export const getDeepLinkProducts = (key, pageNumber) => {
  let limit = 20;
  return async dispatch => {
    dispatch(PLPLoadingStart(true));
    await deepLinkAPICall(key, pageNumber, limit)
      .then(response => {
        const {totalCount} = response?.data;
        const convertedData =
          response?.data?.ManagementGeneratelinkProducts?.map(
            convertProductData,
          );
        const transformedData = {
          data: {
            records: convertedData,
            count: totalCount,
          },
        };
        if (transformedData?.data) {
          dispatch(PLPProductSuccess(transformedData?.data));
          dispatch(PLPLoadingStart(false));
        }
      })
      .catch(err => {
        dispatch(PLPListFail(err));
        dispatch(PLPLoadingStart(false));
      });
  };
};

export const productSearch = (criteria, pageNumber) => {
  return async dispatch => {
    dispatch(PLPLoadingStart(true));
    // :TODO:
    // criteria.mode = "aggregated";
    await productSearchAPI(criteria, pageNumber)
      .then(response => {
        if (response?.data) {
          dispatch(PLPProductSuccess(response?.data));
          dispatch(PLPLoadingStart(false));
        }
      })
      .catch(err => {
        console.error('Error in product search:', err);
        dispatch(PLPListFail(err));
        dispatch(PLPLoadingStart(false));
      });
  };
};
