// DeepLinkUtils.js
import {Linking} from 'react-native';
import {homeDataLoadingStart} from '../screens/Store/actions/HomeAction';
import {getCriteriaFromId} from '../../services/apis/ProductAPI';
import SortingFields from '../constant/SortingFields';

export const handleDeepLinkPress = async (link, dispatch, navigation) => {
  dispatch(homeDataLoadingStart(true));
  try {
    if (link) {
      await handleDeepLink(link, dispatch, navigation);
    } else {
      console.error('no url');
    }
  } catch (error) {
    console.error('Error while handling deep link:', error);
  } finally {
    dispatch(homeDataLoadingStart(false));
  }
};
const handleDeepLink = async (link, dispatch, navigation) => {
  const initialUrl = link || (await Linking.getInitialURL());
  const regex = /\?(?:share-)?([^&]+)/;
  const match = initialUrl?.match(regex);
  const extractedLinkId = match?.length > 1 && match[1] ? match[1] : '';
  if (initialUrl) {
    try {
      dispatch(homeDataLoadingStart(true));
      const res = await getCriteriaFromId(extractedLinkId);
      console.log('res', res);
      if (res?.meta?.response_code === 200) {
        if (
          res?.data?.criteria?.filters?.length === 1 &&
          res?.data?.criteria?.filters[0]['slug.en']
        ) {
          navigation.navigate('ProductDetail', {
            slug: res?.data?.criteria?.filters[0]['slug.en'],
            name: 'deeplink',
          });
          dispatch(homeDataLoadingStart(false));
        } else {
          const criteria = res?.data?.criteria;
          const sorting = SortingFields?.find(item => {
            const itemValue = item.value;
            return (
              JSON.stringify(itemValue) ===
              JSON.stringify(res?.data?.criteria?.sortBy)
            );
          });
          navigation.navigate('PLP', {
            criteria: criteria,
            name: 'deeplink',
            sorting,
          });
          dispatch(homeDataLoadingStart(false));
        }
      }
    } catch (err) {
      console.error('Error in handleDeepLink: ', err);
      dispatch(homeDataLoadingStart(false));
    }
  }
};

export default handleDeepLink;
