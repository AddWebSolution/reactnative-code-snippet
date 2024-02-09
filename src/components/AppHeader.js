import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Images from '../constant/Images';
import AppSearch from '../Components/AppSearch';
import Colors from '../constant/Colors';
import SVGS from '../constant/Svgs';
import {translate} from '../../utility';
import {getFonts} from '../utils';
import {SIZE, hp, wp} from '../../constant/responsiveFunc';

const {HeartIconBlack, CartBlackIcon, SearchIcon, Logo, DarkShareIcon} = SVGS;

// Style component for the back button container
const BackButton = ({onPress, children}) => (
  <TouchableOpacity style={styles.backContainer} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

// Style component for the right side icon container
const RightSideIcon = ({onPress, children}) => (
  <View style={styles.rightIconContainer}>
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  </View>
);

// Main header component
export default function AppHeader(props) {
  const navigation = useNavigation();
  const {selectedLanguageItem} = useSelector(state => state.languageReducer);

  return (
    <View style={[styles.container, props.mainContainerStyle]}>
      {props.showBackButton && (
        <BackButton onPress={props.onPressBack || (() => navigation.goBack())}>
          <Image
            style={[
              styles.backIcon,
              {
                transform: [
                  {
                    rotate:
                      selectedLanguageItem?.language_id === 0
                        ? '0deg'
                        : '180deg',
                  },
                ],
              },
            ]}
            source={props.image || Images.backIcon}
          />
        </BackButton>
      )}

      <View style={[styles.mainTitleStyle, props.titleComponentStyle]}>
        {props.placeholderText ? (
          <AppSearch
            placeholderText={props.placeholderText}
            onCrossPress={props.onCrossPress}
          />
        ) : props.Logo ? (
          <Logo />
        ) : (
          <Text numberOfLines={1} style={[styles.title, props.titleStyle]}>
            {props.title}
          </Text>
        )}
      </View>

      <View style={styles.rightIconsContainer}>
        {props.showSearchIcon && (
          <RightSideIcon onPress={props.onSearchPress}>
            <SearchIcon width={SIZE(20)} height={SIZE(20)} />
          </RightSideIcon>
        )}

        {props.showShareIcon && (
          <RightSideIcon onPress={props.onShareButtonPress}>
            <DarkShareIcon width={SIZE(20)} height={SIZE(20)} />
          </RightSideIcon>
        )}

        {props.showLikeIcon && (
          <RightSideIcon onPress={props.onWishlistPress}>
            <HeartIconBlack width={SIZE(20)} height={SIZE(20)} />
          </RightSideIcon>
        )}

        {props.showCartIcon && (
          <RightSideIcon onPress={props.onCartPress}>
            <CartBlackIcon width={SIZE(20)} height={SIZE(20)} />
          </RightSideIcon>
        )}
      </View>

      {props.showRightComponent && (
        <TouchableOpacity
          onPress={props.onCancelPress || (() => navigation.goBack())}>
          <Text style={[styles.title, styles.titleCancle]}>
            {translate('common.cancel')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    height: hp('8%'),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderBottomColor: Colors.GRAY,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  backContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('10%'),
  },
  titleCancle: {
    color: Colors.themeColor,
    paddingRight: 10,
  },
  backIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: getFonts.BOLD,
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 21,
    color: Colors.BLACK,
    paddingHorizontal: '2%',
  },
  mainTitleStyle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconsContainer: {
    flexDirection: 'row',
  },
  rightIconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
  },
});
