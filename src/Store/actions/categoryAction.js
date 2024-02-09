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
import {
  categoryListAPI,
  categoryTreeAPI,
  subCategoryListAPI,
} from '../../../services/apis/CategoryAPI';

export const categoryLoadingStart = bool => ({
  type: CATEGORY_LIST_LOADING,
  payload: bool,
});

export const categorySuccess = data => ({
  type: CATEGORY_LIST_SUCCESS,
  payload: data,
});

export const categoryFail = error => ({
  type: CATEGORY_LIST_FAIL,
  payload: error,
});

export const categoryListReset = () => ({
  type: CATEGORY_LIST_RESET,
});

export const categoryPageChange = page => ({
  type: CATEGORY_PAGE_CHANGE,
  payload: page,
});

export const subCategoryLoadingStart = bool => ({
  type: SUB_CATEGORY_LIST_LOADING,
  payload: bool,
});

export const subCategorySuccess = data => ({
  type: SUB_CATEGORY_LIST_SUCCESS,
  payload: data,
});

export const subCategoryFail = error => ({
  type: SUB_CATEGORY_LIST_FAIL,
  payload: error,
});

export const subCategoryListReset = () => ({
  type: SUB_CATEGORY_LIST_RESET,
});

export const subCategoryPageChange = page => ({
  type: SUB_CATEGORY_PAGE_CHANGE,
  payload: page,
});

export const getCategoryList = (pageNum, index) => {
  let limit = 10;

  return async dispatch => {
    await categoryListAPI(pageNum, limit)
      .then(async response => {
        if (response?.success && response?.data?.categories?.rows) {
          dispatch(categorySuccess(response?.data?.categories));
          if (pageNum === 1) {
            dispatch(subCategoryLoadingStart(true));
            const subCatgResp = await subCategoryListAPI(
              response?.data?.categories?.rows?.[index]?.id,
            );
            if (subCatgResp?.success === true) {
              dispatch(subCategorySuccess(subCatgResp?.data));
            } else {
              dispatch(subCategoryFail());
            }
          }
        }
      })
      .catch(err => {
        dispatch(categoryFail(err));
      });
  };
};

export const getCategoryListTree = (pageNum, index) => {
  return async dispatch => {
    await categoryTreeAPI()
      .then(async response => {
        if (response?.meta?.response_code === 200) {
          if (response?.success && response?.data?.categories?.rows) {
            dispatch(categorySuccess(response?.data?.categories));
            if (pageNum === 1) {
              dispatch(subCategoryLoadingStart(true));
              const subCatgResp = await subCategoryListAPI(
                response?.data?.categories?.rows?.[index]?.id,
              );
              if (subCatgResp?.success === true) {
                dispatch(subCategorySuccess(subCatgResp?.data));
              } else {
                dispatch(subCategoryFail());
              }
            }
          }
        }
      })
      .catch(err => {
        console.error('Error', err);
        dispatch(categoryFail(err));
      });
  };
};

export const getSubCategoryList = id => {
  return async dispatch => {
    await subCategoryListAPI(id)
      .then(async response => {
        if (response?.success) {
          dispatch(subCategorySuccess(response?.data));
        }
      })
      .catch(err => {
        dispatch(subCategoryFail(err));
      });
  };
};
