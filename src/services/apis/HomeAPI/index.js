import {HOME_API} from '../apiUrls';
import sendRequest from '../../axios/AxiosApiRequest';
import {showErrorToast} from '../../../Components/universal/Toast';
import {Store} from '../../../screens/Store';
import {translate} from '../../../utility';

const isLanguage =
  Store.getState().languageReducer.selectedLanguageItem?.language_id;

export const HomeDataAPICall = userData => {
  return new Promise((resolve, _reject) => {
    sendRequest({
      url: HOME_API,
      method: 'GET',
      headers: {
        Authorization: 'No',
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
        console.log('Error from HOME_API : ', error);
        _reject(error);
        if (error?.status === 401) {
          showErrorToast(translate('common.autherror'), '');
        }
      });
  });
};
