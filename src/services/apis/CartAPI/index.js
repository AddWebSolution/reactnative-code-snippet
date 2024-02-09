import {CART_API, COUPON_API} from '../apiUrls';
import sendRequest from '../../axios/AxiosApiRequest';
import {showErrorToast} from '../../../Components/universal/Toast';
import {Store} from '../../../screens/Store';
import {translate} from '../../../utility';

const isLanguage =
  Store.getState().languageReducer.selectedLanguageItem?.language_id;

export const AddtoCartAPICall = (data, quantity) => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: `${CART_API}/item`,
      method: 'POST',
      data: data,
    })
      .then(response => {
        if (response?.meta?.response_code === 200) {
          resolve(response);
        } else {
          showErrorToast(
            translate('common.autherror'),
            isLanguage === 0 ? response?.message : response?.message_arabic,
          );
        }
      })
      .catch(error => {
        console.log('Error from Add to cart API : ', error);
        _reject(error);
        if (error?.status == 401) {
          showErrorToast(translate('common.autherror'), '');
        }
      });
  });
};

export const getCartItemAPICall = page => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: CART_API,
      method: 'GET',
    })
      .then(response => {
        if (response?.meta?.response_code === 200) {
          resolve(response);
        } else {
          showErrorToast(
            translate('common.autherror'),
            isLanguage === 0 ? response?.message : response?.message_arabic,
          );
        }
      })
      .catch(error => {
        console.log('Error from get cart items API : ', error);
        _reject(error);
      });
  });
};

export const removeCartItemAPICall = slug => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: `${CART_API}/item/${slug}`,
      method: 'DELETE',
    })
      .then(response => {
        if (response?.meta?.response_code === 200) {
          resolve(response);
        } else {
          showErrorToast(
            translate('common.autherror'),
            isLanguage === 0
              ? response?.meta?.message
              : response?.meta?.message_arabic,
          );
        }
      })
      .catch(error => {
        console.log('Error from remove cart items API : ', error);
        _reject(error);
      });
  });
};

export const getCouponAPICall = () => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: COUPON_API,
      method: 'GET',
    })
      .then(response => {
        if (response?.success === true) {
          resolve(response);
        } else {
          showErrorToast(
            translate('common.autherror'),
            isLanguage === 0 ? response?.message : response?.message_arabic,
          );
        }
      })
      .catch(error => {
        console.log('Error from COUPON_API : ', error);
        _reject(error);
      });
  });
};
