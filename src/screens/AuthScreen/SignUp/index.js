import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppBackground from '../../Components/AppBackground';
import Colors from '../../../constant/Colors';
import AppHeader from '../../Components/AppHeader';
import {hp, wp} from '../../../constant/responsiveFunc';
import AppInput from '../../../constant/AppInput';
import AppButton from '../../Components/AppButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthBottomContainer from '../AuthBottomContainer';
import {
  maxLength10,
  validatePhoneNo,
  validateUserName,
  validateFullName,
  getFonts,
  getCountryCode,
} from '../../utils';
import {isValidNumber} from 'react-native-phone-number-input';
import AuthHeader from '../AuthHeader';
import {useNavigation} from '@react-navigation/native';
import {
  handleAuthError,
  signInWithPhoneNumber,
  SocialUserLinkApi,
  WhatsAppOtpSentApi,
} from '../../../services/socialAuth';
import {translate} from '../../../utility';
import {showErrorToast} from '../../../Components/universal/Toast';
import {useSelector} from 'react-redux';
import PopupDrawer from '../../../Components/universal/Modal/PopupDrawer';
import ReceiveMessageModel from '../../../Components/universal/Modal/ReceiveMessageModel';
import {useTimer} from '../../../context/GlobalStateContext';
import {splitMobileNumber} from '../../../utility/splitMobileNumber';

const Signup = ({route}) => {
  const {timer, startTimer} = useTimer();
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [formattedNum, setFormattedNum] = useState('');
  const [error, setError] = useState({});
  const [loadingButton, setLoadingButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [smsType, setSmsType] = useState('');
  const [isEdit, setIsedit] = useState(true);
  const navigation = useNavigation();

  const isFromSocial = route?.params?.isFromSocial;
  const isFromApple = route?.params?.isFromApple;
  const phoneNumber = route?.params?.phoneNumber;
  const socialUserData = route?.params?.socialUserData;
  const {selectedLanguageItem} = useSelector(state => state.languageReducer);
  const handleRadioSelect = value => {
    setSmsType(value);
  };

  useEffect(() => {
    if (socialUserData) {
      if (socialUserData?.displayName) {
        if (isFromApple) {
          setIsedit(false);
        } else {
          setIsedit(true);
        }
        setName(socialUserData?.displayName);
      }
      if (socialUserData?.phoneNumber) {
        setPhoneNo(
          splitMobileNumber(socialUserData?.phoneNumber)?.lastTenDigits,
        );
        setFormattedNum(socialUserData?.phoneNumber);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socialUserData]);

  useEffect(() => {
    if (phoneNumber) {
      setPhoneNo(splitMobileNumber(phoneNumber)?.lastTenDigits);
      setFormattedNum(phoneNumber);
    }
  }, [phoneNumber]);

  const signupTapped = () => {
    const errorList = {};

    //=============Fullname Validation================
    if (validateFullName(name)) {
      errorList.nameErr = validateFullName(name);
    }

    //=============Phone Number Validation================
    if (maxLength10(phoneNo)) {
      errorList.phoneErr = maxLength10(phoneNo);
    } else if (!isValidNumber(formattedNum)) {
      errorList.phoneErr = validatePhoneNo(phoneNo);
    }

    setError(errorList);

    //================API Call Fuction================
    if (Object.keys(errorList).length === 0) {
      setError({});
      setModalVisible(true);
    }
  };

  const sendOtpWithWhatsApp = async () => {
    const data = {
      mobile: formattedNum,
      language: selectedLanguageItem?.language_name ?? 'en',
    };
    const response = await WhatsAppOtpSentApi(data);

    if (response?.meta?.response_code === 200) {
      startTimer();
      navigation.navigate('OtpVerification', {
        phoneNumber: formattedNum,
        isFromSignUp: true,
        name: name,
        smsType: smsType,
        isFromSocial: isFromSocial,
      });
    } else if (response?.meta?.response_code === 400) {
      showErrorToast(
        translate('common.autherror'),
        selectedLanguageItem?.language_id === 0
          ? response?.meta?.message
          : response?.meta?.message_arabic,
      );
      console.error('Error in API response:', response?.meta?.message);
    }
  };

  const sendOtpWithSMS = async () => {
    const authResults = await signInWithPhoneNumber(formattedNum);
    if (authResults) {
      startTimer();
    }
    navigation.navigate('OtpVerification', {
      authResult: authResults,
      phoneNumber: formattedNum,
      isFromSignUp: true,
      name: name,
      isFromSocial: isFromSocial,
    });
  };

  const signUpWithNumber = async () => {
    setLoadingButton(true);
    const data = {
      email: socialUserData?.email,
      phone_number: formattedNum,
      name: name,
    };
    if (smsType === 'WhatsApp') {
      try {
        if (isFromSocial) {
          const verifySocialUser = await SocialUserLinkApi(data);
          if (verifySocialUser?.meta?.response_code === 200) {
            await sendOtpWithWhatsApp();
            setLoadingButton(false);
            setModalVisible(false);
          } else {
            showErrorToast(
              translate('common.autherror'),
              selectedLanguageItem?.language_id === 0
                ? verifySocialUser?.meta?.message
                : verifySocialUser?.meta?.message_arabic,
            );
            setLoadingButton(false);
            setModalVisible(false);
          }
        } else {
          await sendOtpWithWhatsApp();
          setLoadingButton(false);
          setModalVisible(false);
        }
      } catch (err) {
        showErrorToast(
          translate('common.autherror'),
          selectedLanguageItem?.language_id === 0
            ? err?.data?.meta?.message
            : err?.data?.meta?.message_arabic,
        );
        setModalVisible(false);
        setLoadingButton(false);
      }
    } else {
      try {
        if (isFromSocial) {
          const verifySocialUser = await SocialUserLinkApi(data);
          if (verifySocialUser?.meta?.response_code === 200) {
            await sendOtpWithSMS();
            setLoadingButton(false);
            setModalVisible(false);
          } else {
            showErrorToast(
              translate('common.autherror'),
              selectedLanguageItem?.language_id === 0
                ? verifySocialUser?.meta?.message
                : verifySocialUser?.meta?.message_arabic,
            );
            setLoadingButton(false);
            setModalVisible(false);
          }
        } else {
          await sendOtpWithSMS();
          setLoadingButton(false);
          setModalVisible(false);
        }
        // eslint-disable-next-line no-catch-shadow, no-shadow
      } catch (error) {
        console.error('Error from Check phone number api', error);
        if (error?.code && isFromSocial) {
          handleAuthError(error);
        } else if (isFromSocial) {
          showErrorToast(
            translate('common.autherror'),
            selectedLanguageItem?.language_id === 0
              ? error?.data?.meta?.message
              : error?.data?.meta?.message_arabic,
          );
        } else {
          handleAuthError(error);
        }
        setLoadingButton(false);
        setModalVisible(false);
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setLoadingButton(false);
  };
  return (
    <AppBackground
      safeAreaColor={Colors.themeColor}
      bottomSafeAreaColor={Colors.WHITE}>
      <AppHeader
        Logo
        titleComponentStyle={{backgroundColor: Colors.themeColor}}
        mainContainerStyle={{height: hp(18.47)}}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{opacity: loadingButton ? 0.4 : 1}}>
        <AuthHeader
          title={
            isFromSocial
              ? translate('common.giveMoreDetails')
              : translate('common.registerto')
          }
        />
        <AppInput
          editable={isEdit === false ? false : !loadingButton}
          label={translate('common.yourname')}
          placeholder={translate('common.enteryourname')}
          required
          // eslint-disable-next-line no-shadow
          onChangeText={name => {
            setName(name);
            setError({...error, ['nameErr']: null});
          }}
          value={name ? name : socialUserData?.displayName ?? null}
          validate={[validateUserName]}
          error={error.nameErr}
          language={selectedLanguageItem?.language_id}
        />
        <AppInput
          editable={!loadingButton}
          label={translate('common.mobilephonenumber')}
          placeholder={translate('common.enteryourphonenumber')}
          required
          isNumberField
          value={
            isFromSocial
              ? splitMobileNumber(socialUserData.phoneNumber)?.lastTenDigits
              : phoneNumber
              ? splitMobileNumber(phoneNumber)?.lastTenDigits
              : phoneNo
          }
          // eslint-disable-next-line no-shadow
          onChangeText={phoneNo => {
            setPhoneNo(phoneNo);
            setError({...error, ['phoneErr']: null});
          }}
          validate={[maxLength10, validatePhoneNo]}
          error={error.phoneErr}
          onChangeCountry={val => console.log(val)}
          onChangeFormattedText={val => setFormattedNum(val)}
          defaultCode={
            isFromSocial
              ? getCountryCode(
                  splitMobileNumber(socialUserData.phoneNumber)
                    ?.remainingDigits,
                )
              : phoneNumber
              ? getCountryCode(splitMobileNumber(phoneNumber)?.remainingDigits)
              : 'IQ'
          }
          language={selectedLanguageItem?.language_id}
        />

        {isFromSocial ? (
          ''
        ) : (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
            <Text style={styles.termsPrivacy}>
              {translate('common.agree')}{' '}
              <Text
                suppressHighlighting={true}
                onPress={() => console.log('Terms & Condition')}
                style={{color: Colors.themeColor}}>
                {translate('common.termsandconditions')}
              </Text>{' '}
              {translate('common.and')}{' '}
              <Text
                suppressHighlighting={true}
                onPress={() => console.log('Privacy Policy')}
                style={{color: Colors.themeColor}}>
                {translate('common.privacypolicy')}
              </Text>
            </Text>
          </View>
        )}

        <AppButton
          label={
            timer > 0
              ? `Please try after ${timer} seconds`
              : translate('common.continue')
          }
          containerStyle={
            isFromSocial // eslint-disable-next-line react-native/no-inline-styles
              ? {marginTop: 42, marginBottom: 31} // eslint-disable-next-line react-native/no-inline-styles
              : {marginTop: '5%', marginBottom: '10%'}
          }
          onPress={signupTapped}
          disabled={loadingButton || timer > 0}
          isIndicatorLoading={loadingButton}
        />

        {isFromSocial ? (
          <Text
            suppressHighlighting={true}
            onPress={() => navigation.goBack()}
            style={[styles.backButtonText]}>
            {translate('common.goback')}
          </Text>
        ) : (
          ''
        )}

        {isFromSocial ? (
          ''
        ) : (
          <AuthBottomContainer
            title={translate('common.orsignupwith')}
            isAccountText={translate('common.alreadyhaveanaccount?')}
            isSignUp={true}
            onPressButton={() =>
              navigation.navigate('Login', {phoneNumber: formattedNum})
            }
            loadingButton={loadingButton}
            setLoadingButton={setLoadingButton}
          />
        )}
      </KeyboardAwareScrollView>
      <PopupDrawer
        modalVisible={modalVisible}
        onRequestClose={() => closeModal()}>
        <ReceiveMessageModel
          phoneNo={phoneNo}
          onContinuePress={signUpWithNumber}
          loadingButton={loadingButton}
          onRadioSelect={handleRadioSelect}
        />
      </PopupDrawer>
    </AppBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  title: {
    fontFamily: getFonts.SEMI_BOLD,
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  titleContainer: {
    paddingVertical: '5%',
    borderBottomColor: Colors.GRAY,
    borderBottomWidth: 1,
  },
  termsPrivacy: {
    fontFamily: getFonts.MEDIUM,
    fontWeight: 500,
    letterSpacing: 0.5,
    textAlign: 'left',
    color: Colors.GRAY3,
    lineHeight: 19,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.GRAY,
    width: wp(30),
    paddingVertical: '4%',
    gap: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: getFonts.REGULAR,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '5%',
    // width: '90%',
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  backButtonText: {
    fontFamily: getFonts.SEMI_BOLD,
    letterSpacing: 0.5,
    textAlign: 'left',
    lineHeight: 21,
    fontSize: 16,
    color: Colors.themeColor,
  },
});
