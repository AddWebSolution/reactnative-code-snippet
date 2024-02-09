import {
  ADD_NEW_ADDRESS,
  FETCH_ADDRESS_DETAIL,
  UPDATE_ADDRESS_DETAIL,
  DELETE_ADDRESS_DETAIL,
} from '../apiUrls';
import sendRequest from '../../axios/AxiosApiRequest';
import {showErrorToast} from '../../../Components/universal/Toast';
import {Store} from '../../../screens/Store';

const isLanguage =
  Store.getState().languageReducer.selectedLanguageItem?.language_id;

export const AddNewAddressAPICall = data => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: ADD_NEW_ADDRESS,
      method: 'POST',
      data: data,
    })
      .then(async response => {
        if (response?.meta?.response_code === 200) {
          resolve(response);
        } else {
          showErrorToast(
            isLanguage === 0 ? response?.message : response?.message_arabic,
          );
        }
      })
      .catch(error => {
        _reject(error);
      });
  });
};

export const FetchAddressAPICall = () => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: FETCH_ADDRESS_DETAIL,
      method: 'GET',
    })
      .then(async response => {
        resolve(response);
        if (response?.meta?.response_code === 200) {
          resolve(response);
        } else {
          showErrorToast('Auth Error', response?.meta?.message);
        }
      })
      .catch(error => {
        _reject(error);
      });
  });
};

export const updateAddressAPICall = data => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: UPDATE_ADDRESS_DETAIL,
      method: 'PATCH',
      data: data,
    })
      .then(async response => {
        if (response?.meta?.response_code === 200) {
          resolve(response);
        } else {
          showErrorToast('Auth Error', response?.meta?.message);
        }
      })
      .catch(error => {
        _reject(error);
      });
  });
};

export const deleteAddressAPICall = deleteId => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: `${DELETE_ADDRESS_DETAIL}/${deleteId}`,
      method: 'DELETE',
    })
      .then(async response => {
        if (response?.meta?.response_code === 200) {
          resolve(response);
        } else {
          showErrorToast('Auth Error', response?.message);
        }
      })
      .catch(error => {
        _reject(error);
      });
  });
};

export const FetchSelectedAddressAPICall = id => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: `${FETCH_ADDRESS_DETAIL}/${id}`,
      method: 'GET',
    })
      .then(async response => {
        if (response?.success === true) {
          resolve(response);
        }
      })
      .catch(error => {
        console.log('Error from Selected Address detail api', error);
        _reject(error);
      });
  });
};
