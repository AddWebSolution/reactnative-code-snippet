import {categoryTreeAPI} from '../../../services/apis/CategoryAPI';
import {fetchCategoryBrand} from './brandAction';

export const CATEGORY_TREE_LOADING = 'CATEGORY_TREE_LOADING';
export const CATEGORY_TREE_SUCCESS = 'CATEGORY_TREE_SUCCESS';
export const CATEGORY_TREE_FAIL = 'CATEGORY_TREE_FAIL';

export const categoryTreeLoading = bool => ({
  type: CATEGORY_TREE_LOADING,
  payload: bool,
});
export const categoryTreeSuccess = data => ({
  type: CATEGORY_TREE_SUCCESS,
  payload: data,
});
export const categoryTreeFail = error => ({
  type: CATEGORY_TREE_FAIL,
  payload: error,
});

export const fetchCategoryTree = selectedindex => {
  return async dispatch => {
    dispatch(categoryTreeLoading(true));
    try {
      const response = await categoryTreeAPI();
      if (response?.meta?.response_code === 200) {
        dispatch(categoryTreeSuccess(response?.data));
        dispatch(
          fetchCategoryBrand(response?.data?.records[selectedindex]?.name?.en),
        );
        dispatch(categoryTreeLoading(false));
      }
    } catch (error) {
      dispatch(categoryTreeFail(error.message));
      dispatch(categoryTreeLoading(false));
    }
  };
};
