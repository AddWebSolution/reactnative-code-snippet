import {
  CHECK_PHONE_NUMBER,
  USER_REGISTER,
  UPDATE_PROFILE,
  HELPNSUPPORT,
  UPDATE_PASSWORD,
  DELETE_ACCOUNT,
  UPDATE_PHONE,
  VERSION_CHECK_API,
} from './apiUrls';
import sendRequest from '../../services/axios/AxiosApiRequest';
import {
  showErrorToast,
  showSuccessToast,
} from '../../Components/universal/Toast';
import {Store} from '../../screens/Store';
import {translate} from '../../utility';
import {googleLogout} from '../socialAuth';
const isLanguage =
  Store.getState().languageReducer.selectedLanguageItem?.language_id;

export const checkPhoneNumberOrEmailExists = numberOrEmail => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: CHECK_PHONE_NUMBER,
      method: 'POST',
      data: {
        params: numberOrEmail,
      },
    })
      .then(async response => {
        if (response?.meta?.response_code === 200) {
          resolve(response);
        } else {
          resolve(response);
        }
      })
      .catch(error => {
        console.error('Error from CHECK_PHONE_NUMBER api', error);
        _reject(error);
      });
  });
};

export const userRegister = (firebase_user_id, password) => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: USER_REGISTER,
      method: 'POST',
      data: {
        firebase_user_id: firebase_user_id,
      },
    })
      .then(response => {
        if (response?.meta?.response_code === 200) {
          resolve(response);
        } else {
          googleLogout();
          showErrorToast(
            translate('common.autherror'),
            isLanguage === 0 ? response?.message : response?.message_arabic,
          );
        }
      })
      .catch(error => {
        console.log('Error from USER_REGISTER api', error);
        _reject(error);
      });
  });
};

export const userRegisterApi = async (firebase_user_id, password) => {
  try {
    const response = await sendRequest({
      url: USER_REGISTER,
      method: 'POST',
      data: {
        firebase_user_id: firebase_user_id,
      },
    });

    if (response?.meta?.response_code !== 200) {
      googleLogout();
    }
  } catch (error) {
    console.log('Error from USER_REGISTER api', error);
    // Handle the error if needed
  }
};

export const updateProfile = data => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: UPDATE_PROFILE,
      method: 'PATCH',
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
          _reject(response);
        }
      })
      .catch(error => {
        console.log('Error from UPDATE_PROFILE api', error);
        _reject(error);
      });
  });
};

export const updatePhone = phone => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: UPDATE_PHONE,
      method: 'POST',
      data: {
        phone_number: phone,
      },
    })
      .then(response => {
        if (response?.success === true) {
          resolve(response);
        } else {
          showErrorToast(
            translate('common.autherror'),
            isLanguage === 0 ? response?.message : response?.message_arabic,
          );
          _reject(response);
        }
      })
      .catch(error => {
        console.log('Error from UPDATE_PHONE api', error);
        _reject(error);
      });
  });
};

export const updatePassword = pwd => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: UPDATE_PASSWORD,
      method: 'POST',
      data: {
        password: pwd,
      },
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
        console.log('Error from UPDATE_PASSWORD api', error);
        _reject(error);
      });
  });
};

export const helpNSupport = (name, email, description) => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: HELPNSUPPORT,
      method: 'POST',
      data: {
        name: name ? name : 'Test User',
        email: email,
        description: description,
      },
    })
      .then(response => {
        if (response?.success === true) {
          showSuccessToast('Help & Support', 'Query Submitted Successfully');
          resolve(response);
        } else {
          showErrorToast(
            translate('common.autherror'),
            isLanguage === 0 ? response?.message : response?.message_arabic,
          );
        }
      })
      .catch(error => {
        console.log('Error from HELPNSUPPORT api', error);
        _reject(error);
      });
  });
};

export const deleteUserFromDb = numberOrEmail => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: DELETE_ACCOUNT,
      method: 'DELETE',
      data: {
        phone_number: numberOrEmail,
      },
    })
      .then(async response => {
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
        console.log('Error from DELETE_ACCOUNT api', error);
        _reject(error);
      });
  });
};

export const shouldVersionUpdate = async versionData => {
  try {
    const response = await sendRequest({
      url: VERSION_CHECK_API,
      method: 'POST',
      data: {
        ...versionData,
      },
    });
    return response;
  } catch (error) {
    console.error('Error from VERSION_CHECK_API api', error);
    throw error;
  }
};
