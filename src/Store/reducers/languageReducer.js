import AsyncStorage from '@react-native-async-storage/async-storage';

import {SET_LANGUAGE_SELECTED, UPDATE_ALL_LANGUAGES} from '../types';
import {setI18nConfig} from '../../../utility/index';

const initialState = {
  selectedLanguageItem: {
    language_id: 0,
    language_name: 'en',
    isSelected: false,
  },
  en: require('../../../translations/en.json'),
  ar: require('../../../translations/ar.json'),
};

// eslint-disable-next-line no-undef
export default LanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALL_LANGUAGES:
      return {
        ...state,
        en: action.payload[0],
        ar: action.payload[1],
      };

    case SET_LANGUAGE_SELECTED:
      return {
        ...state,
        selectedLanguageItem: action.payload.data,
      };
    default:
      return state;
  }
};

let languages = ['en', 'ar'];

let languageRequests = languages.map(name =>
  fetch(`https://api.hanooot.com/language_setting/get_language/${name}`),
);

export const getAllLanguages = () => dispatch =>
  Promise.all(languageRequests)
    .then(responses => {
      console.log('languageRequests', languageRequests);
      return responses;
    })
    .then(responses => Promise.all(responses.map(r => r.json())))
    // eslint-disable-next-line no-shadow
    .then(languages => {
      if (languages && languages.length > 0) {
        languages = languages.map(function (el) {
          var o = Object.assign(el);
          // o.selected = false;
          return o;
        });
      }
      dispatch(updateAllLanguages(languages));
    })
    .catch(error => {});

//Set Selected Language
export const setAppLanguage = language => dispatch => {
  AsyncStorage.setItem('@language', JSON.stringify(language));
  dispatch(setSelectedLanguage(language));
  setI18nConfig(language.language_name);
};

const updateAllLanguages = data => ({
  type: UPDATE_ALL_LANGUAGES,
  payload: data,
});

const setSelectedLanguage = data => ({
  type: SET_LANGUAGE_SELECTED,
  payload: {
    data: data,
  },
});
