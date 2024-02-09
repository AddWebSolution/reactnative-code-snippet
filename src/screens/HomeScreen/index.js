import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../Components/AppHeader';
import AppBackground from '../Components/AppBackground';
import MiniSlider from '../Components/Cards/MiniSlider';
import Colors from '../../constant/Colors';
import {hp, wp} from '../../constant/responsiveFunc';
import FeaturedCategory from '../Components/Cards/FeaturedCategory';
import NewArrivals from '../Components/Cards/NewArrivals';
import RecentlyViewProduct from '../Components/Cards/RecentlyViewProduct';
import SuggestedProducts from '../Components/Cards/SuggestedProducts';
import TopPicks from '../Components/Cards/TopPicks';
import BannerCollage from '../Components/Cards/BannerCollage';
import BrandList from '../Components/Cards/BrandList';
import CategoryList from '../Components/Cards/CategoryList';
import {
  getHomeCollection,
  homeDataLoadingStart,
  homeDataReset,
} from '../Store/actions/HomeAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../constant/Loader';
import {useNavigation} from '@react-navigation/native';
import {translate} from '../../utility';
import AppModal from '../../Components/universal/Modal';
import ModalContentWithoutLogin from '../../Components/universal/Modal/ModalContentWithoutLogin';
import {getFonts} from '../utils';
import HomeLargeBanner from '../Components/Cards/HomeLargeBanner';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const {isLoading, HomeCollection} = useSelector(state => state.HomeReducer);
  const userData = useSelector(state => state.userReducer.userData);
  useEffect(() => {
    pullToRefreshFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(homeDataReset());
    dispatch(homeDataLoadingStart(true));
    dispatch(getHomeCollection(userData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const renderNoDataFound = () => {
    return (
      <View style={styles.sorryMessageCont}>
        <Text style={styles.sorryMessage}>
          {translate('common.nodatafound')}
        </Text>
      </View>
    );
  };

  const renderHomeData = ({item, index}) => {
    const key = Object.keys(item)[0];

    switch (key) {
      case 'miniSlider':
        return <MiniSlider key={`${key}_${index}`} Data={item.miniSlider} />;
      case 'featuredCategoryByProductJson':
        return (
          <FeaturedCategory
            key={`${key}_${index}`}
            Data={
              item.featuredCategoryByProductJson.featuredCategoryByProductArr
            }
            onFeatureCartPress={() => setModalVisible(true)}
          />
        );
      case 'brandsListJson':
        return (
          <BrandList
            key={`${key}_${index}`}
            Data={item.brandsListJson.brandsList}
          />
        );
      case 'newArrivalProductListJson':
        return (
          <NewArrivals
            key={`${key}_${index}`}
            Data={item.newArrivalProductListJson}
            onWishlistPress={() => setModalVisible(true)}
          />
        );
      case 'bannerCollageJson':
        return (
          <BannerCollage
            key={`${key}_${index}`}
            Data={item.bannerCollageJson}
          />
        );
      case 'largeBanner':
        return (
          <HomeLargeBanner key={`${key}_${index}`} Data={item.largeBanner} />
        );
      case 'topPicksJson':
        return (
          <TopPicks
            key={`${key}_${index}`}
            Data={item.topPicksJson}
            onTopPicksCartPress={() => setModalVisible(true)}
          />
        );
      case 'listOfRecentViewProductJson':
        return (
          <RecentlyViewProduct
            key={`${key}_${index}`}
            Data={item.listOfRecentViewProduct}
            onWishlistPress={() => setModalVisible(true)}
          />
        );
      case 'suggestedProductsJson':
        return (
          <SuggestedProducts
            key={`${key}_${index}`}
            Data={item.suggestedProducts}
            onWishlistPress={() => setModalVisible(true)}
          />
        );
      case 'categoryList':
        return (
          <CategoryList key={`${key}_${index}`} Data={item.categoryList} />
        );
      default:
        return null;
    }
  };

  const pullToRefreshFunction = () => {
    dispatch(homeDataReset());
    dispatch(homeDataLoadingStart(true));
    dispatch(getHomeCollection(userData));
  };

  return (
    <AppBackground>
      <AppHeader placeholderText={translate('common.search')} />
      {isLoading ? (
        <Loader />
      ) : HomeCollection.length > 0 ? (
        <FlatList
          data={HomeCollection}
          renderItem={renderHomeData}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={false}
          scrollEnabled={true}
          refreshing={isLoading}
          onRefresh={pullToRefreshFunction}
        />
      ) : (
        renderNoDataFound()
      )}

      <AppModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <ModalContentWithoutLogin
          onCancelPress={() => {
            setModalVisible(false);
          }}
          onOkPress={() => {
            navigation.navigate('Login');
            setModalVisible(false);
          }}
        />
      </AppModal>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  circleImgView: {
    backgroundColor: Colors.YELLOWRGBA,
    height: hp(13),
    width: wp(28),
    borderRadius: 100,
    left: 10,
  },
  offerAvail: {
    fontWeight: 600,
    fontFamily: getFonts.SEMI_BOLD,
    letterSpacing: 0.5,

    color: Colors.themeColor,
    paddingVertical: 10,
    fontSize: 12,
  },
  sorryMessageCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sorryMessage: {
    fontSize: 15,
    fontFamily: getFonts.SEMI_BOLD,
  },
  loaderImage: {
    alignSelf: 'center',
  },
  indicatorContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#1a75bb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
