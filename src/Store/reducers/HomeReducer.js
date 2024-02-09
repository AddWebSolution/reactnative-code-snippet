import {
  HOME_DATA_LOADING,
  HOME_DATA_SUCCESS,
  UPADTE_NEW_ARRIVAL_LIKE,
  UPADTE_RECENT_VIEW_LIKE,
  REMOVE_RECENT_VIEW_LIKE,
  UPADTE_SUGGESTED_LIKE,
  REMOVE_SUGGESTED_LIKE,
  REMOVE_NEW_ARRIVAL_LIKE,
  HOME_DATA_FAIL,
  UPADTE_FEATURED_CART,
  HOME_DATA_RESET,
  UPADTE_TOP_PICK_CART,
} from '../types';

const initialState = {
  isLoading: false,
  HomeCollection: {},
  homeDataFail: '',
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_DATA_LOADING:
      return {...state, isLoading: action.payload};

    case HOME_DATA_SUCCESS:
      return {
        ...state,
        HomeCollection: action.payload,
        isLoading: false,
        homeDataFail: '',
      };

    case UPADTE_NEW_ARRIVAL_LIKE:
      // const data = actions.payload;
      const updatedArrivalProductList =
        state?.HomeCollection?.newArrivalProductListJson?.newArrivalProductList.map(
          item => {
            if (item?.id === action.payload) {
              return {
                ...item,
                isLike: true,
              };
            } else {
              return item;
            }
          },
        );

      return {
        ...state,
        HomeCollection: {
          ...state.HomeCollection,
          newArrivalProductListJson: {
            ...state.HomeCollection.newArrivalProductListJson,
            newArrivalProductList: updatedArrivalProductList,
          },
        },
      };

    case REMOVE_NEW_ARRIVAL_LIKE:
      const removeArrivalProductList =
        state?.HomeCollection?.newArrivalProductListJson?.newArrivalProductList.map(
          item => {
            if (item?.id === action.payload) {
              return {
                ...item,
                isLike: false,
              };
            } else {
              return item;
            }
          },
        );

      return {
        ...state,
        HomeCollection: {
          ...state.HomeCollection,
          newArrivalProductListJson: {
            ...state.HomeCollection.newArrivalProductListJson,
            newArrivalProductList: removeArrivalProductList,
          },
        },
      };

    case UPADTE_SUGGESTED_LIKE:
      // const data = actions.payload;
      const updatedSuggestedProductList =
        state?.HomeCollection?.suggestedProductsJson?.suggestedProducts.map(
          item => {
            if (item?.id === action.payload) {
              return {
                ...item,
                isLike: true,
              };
            } else {
              return item;
            }
          },
        );

      return {
        ...state,
        HomeCollection: {
          ...state.HomeCollection,
          suggestedProductsJson: {
            ...state.HomeCollection.suggestedProductsJson,
            suggestedProducts: updatedSuggestedProductList,
          },
        },
      };

    case REMOVE_SUGGESTED_LIKE:
      const removeSuggestedProductList =
        state?.HomeCollection?.suggestedProductsJson?.suggestedProducts.map(
          item => {
            if (item?.id === action.payload) {
              return {
                ...item,
                isLike: false,
              };
            } else {
              return item;
            }
          },
        );

      return {
        ...state,
        HomeCollection: {
          ...state.HomeCollection,
          suggestedProductsJson: {
            ...state.HomeCollection.suggestedProductsJson,
            suggestedProducts: removeSuggestedProductList,
          },
        },
      };

    case UPADTE_RECENT_VIEW_LIKE:
      // const data = actions.payload;
      const updatedRecentProductList =
        state?.HomeCollection?.listOfRecentViewProductJson?.listOfRecentViewProduct?.UserRecentProductVisits.map(
          item => {
            if (item?.product_id === action.payload) {
              return {
                ...item,
                isLike: true,
              };
            } else {
              return item;
            }
          },
        );

      return {
        ...state,
        HomeCollection: {
          ...state.HomeCollection,
          listOfRecentViewProductJson: {
            ...state.HomeCollection.listOfRecentViewProductJson,
            listOfRecentViewProduct: {
              ...state.HomeCollection.listOfRecentViewProductJson
                ?.listOfRecentViewProduct,
              UserRecentProductVisits: updatedRecentProductList,
            },
          },
        },
      };

    case REMOVE_RECENT_VIEW_LIKE:
      const removeRecentProductList =
        state?.HomeCollection?.listOfRecentViewProductJson?.listOfRecentViewProduct?.UserRecentProductVisits.map(
          item => {
            if (item?.id === action.payload) {
              return {
                ...item,
                isLike: false,
              };
            } else {
              return item;
            }
          },
        );

      return {
        ...state,
        HomeCollection: {
          ...state.HomeCollection,
          listOfRecentViewProductJson: {
            ...state.HomeCollection.listOfRecentViewProductJson,
            listOfRecentViewProduct: {
              ...state.HomeCollection.listOfRecentViewProductJson
                ?.listOfRecentViewProduct,
              UserRecentProductVisits: removeRecentProductList,
            },
          },
        },
      };

    case UPADTE_FEATURED_CART:
    case UPADTE_TOP_PICK_CART:
      var arrFinal = state.HomeCollection?.topPicksJson?.topPicks.map(
        (item, index) => {
          if (item?.id === action.payload.TopPicks) {
            let topPicksProducts = item?.TopPicksProducts.map(
              (subItem, subIndex) => {
                if (subItem?.product_id === action.payload.ProductId) {
                  return {
                    ...subItem,
                    ManagementProduct: {
                      ...subItem.ManagementProduct,
                      isCart: true,
                    },
                  };
                } else {
                  return {...subItem};
                }
              },
            );
            return {...item, TopPicksProducts: topPicksProducts};
          } else {
            return {...item};
          }
        },
      );
      console.log('Here is our final array : ', JSON.stringify(arrFinal));
      return {
        ...state,
        HomeCollection: {
          ...state.HomeCollection,
          topPicksJson: {
            ...state.HomeCollection.topPicksJson,
            topPicks: arrFinal,
          },
        },
      };

    case HOME_DATA_FAIL:
      return {...state, homeDataFail: action.payload, isLoading: false};

    case HOME_DATA_RESET:
      return (state = {...state, HomeCollection: {}});

    default:
      return state;
  }
};

export default HomeReducer;
