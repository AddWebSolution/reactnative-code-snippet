import {categoryBrandAPI} from '../../../services/apis/CategoryAPI';

export const CATEGORY_BRAND_LOADING = 'CATEGORY_BRAND_LOADING';
export const CATEGORY_BRAND_SUCCESS = 'CATEGORY_BRAND_SUCCESS';
export const CATEGORY_BRAND_FAIL = 'CATEGORY_BRAND_FAIL';

export const categoryBrandLoading = bool => ({
  type: CATEGORY_BRAND_LOADING,
  payload: bool,
});
export const categoryBrandSuccess = data => ({
  type: CATEGORY_BRAND_SUCCESS,
  payload: data,
});
export const categoryBrandFail = error => ({
  type: CATEGORY_BRAND_FAIL,
  payload: error,
});

export const fetchCategoryBrand = categoryName => {
  return async dispatch => {
    dispatch(categoryBrandLoading(true));
    try {
      const response = await categoryBrandAPI(categoryName);
      console.log('response: Brand', response);
      if (response?.meta?.response_code === 200) {
        dispatch(categoryBrandSuccess(response?.data));
        dispatch(categoryBrandLoading(false));
      }
    } catch (error) {
      dispatch(categoryBrandFail(error.message));
      dispatch(categoryBrandLoading(false));
    }
  };
};
