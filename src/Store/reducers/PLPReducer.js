import {
  PLP_FAIL,
  PLP_LOADING,
  PLP_PAGE_CHANGE,
  PLP_RESET,
  PLP_SUCCESS,
} from '../types';

const initialState = {
  isPLPLoading: false,
  PLPList: [],
  PLPListFail: '',
  PLPListPage: 1,
  PLPTotalCount: 0,
  isMoreAvailable: true,
  pickedProducts: [],
};

const PLPReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLP_LOADING:
      return {...state, isPLPLoading: action.payload};

    case PLP_SUCCESS:
      return {
        ...state,
        PLPList: [...state?.PLPList, ...action?.payload?.records],
        PLPTotalCount: action.payload.total_records,
        pickedProducts: action.payload?.pickedProducts,
        isPLPLoading: false,
        isMoreAvailable: action.payload.count === 20,
        PLPListFail: '',
      };

    case PLP_FAIL:
      return {
        ...state,
        PLPListFail: action.payload,
        isPLPLoading: false,
        isMoreAvailable: false,
      };

    case PLP_PAGE_CHANGE:
      return (state = {...state, PLPListPage: action.payload});

    case PLP_RESET:
      return {...state, PLPList: [], isMoreAvailable: true, pickedProducts: []};

    default:
      return state;
  }
};

export default PLPReducer;
