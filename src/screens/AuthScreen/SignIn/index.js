import React, {useEffect, useState} from 'react';
import Colors from '../../../constant/Colors';
import {hp} from '../../../constant/responsiveFunc';
import AppBackground from '../../Components/AppBackground';
import AppHeader from '../../Components/AppHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthHeader from '../AuthHeader';
import AuthBottomContainer from '../AuthBottomContainer';
import {useNavigation} from '@react-navigation/native';
import AppInput from '../../../constant/AppInput';
import AppButton from '../../Components/AppButton';
import {maxLength10, validatePhoneNo, getCountryCode} from '../../utils';
import {isValidNumber} from 'react-native-phone-number-input';
import {
  handleAuthError,
  signInWithPhoneNumber,
  WhatsAppOtpSentApi,
} from '../../../services/socialAuth';
import {useSelector} from 'react-redux';
import {translate} from '../../../utility';
import {checkPhoneNumberOrEmailExists} from '../../../services/apis';
import {showErrorToast} from '../../../Components/universal/Toast';
import PopupDrawer from '../../../Components/universal/Modal/PopupDrawer';
import ReceiveMessageModel from '../../../Components/universal/Modal/ReceiveMessageModel';
import {useTimer} from '../../../context/GlobalStateContext';
import {splitMobileNumber} from '../../../utility/splitMobileNumber';

const Login = ({route}) => {
  const {timer, startTimer} = useTimer();
  const [phoneNo, setPhoneNo] = useState('');
  const [formattedNum, setFormattedNum] = useState('');
  const [error, setError] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [smsType, setSmsType] = useState('');
  const phoneNumber = route?.params?.phoneNumber;
  const navigation = useNavigation();

  const {selectedLanguageItem} = useSelector(state => state.languageReducer);

  const handleRadioSelect = value => {
    setSmsType(value);
  };

  useEffect(() => {
    if (phoneNumber) {
      setPhoneNo(splitMobileNumber(phoneNumber)?.lastTenDigits);
      setFormattedNum(phoneNumber);
    }
  }, [phoneNumber]);

  // eslint-disable-next-line no-shadow
  const Login = async () => {
    setLoadingButton(true);
    const errorList = {};
    //=============Phone Number Validation================
    if (maxLength10(phoneNo)) {
      errorList.phoneErr = maxLength10(phoneNo);
      setLoadingButton(false);
    } else if (!isValidNumber(formattedNum)) {
      errorList.phoneErr = validatePhoneNo(phoneNo);
      setLoadingButton(false);
    }
    setError(errorList);
    //================API Call Fuction================
    if (Object.keys(errorList).length === 0) {
      setError({});
      setLoadingButton(true);
      const res = await checkPhoneNumberOrEmailExists(formattedNum);

      if (res?.meta?.message === 'Phone or Email is not used') {
        setLoadingButton(false);
        showErrorToast('Error', res?.meta?.message);
        navigation.navigate('Signup', {phoneNumber: formattedNum});
      } else {
        setLoadingButton(false);
        setModalVisible(true);
      }
    }
  };

  const signInWithNumber = async () => {
    setLoadingButton(true);
    if (smsType === 'WhatsApp') {
      try {
        const data = {
          mobile: formattedNum,
          language: selectedLanguageItem?.language_name ?? 'en',
        };
        const response = await WhatsAppOtpSentApi(data);
        if (response?.meta?.response_code === 200) {
          startTimer();
          navigation.navigate('OtpVerification', {
            phoneNumber: formattedNum,
            isFromSignUp: false,
            isFromSignIn: true,
            smsType: smsType,
          });
          setModalVisible(false);
          setLoadingButton(false);
        } else if (response?.meta?.response_code === 400) {
          showErrorToast(
            translate('common.autherror'),
            selectedLanguageItem?.language_id === 0
              ? response?.meta?.message
              : response?.meta?.message_arabic,
          );
          setModalVisible(false);
          setLoadingButton(false);
          console.error('Error in API response:', response?.meta?.message);
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
        const res = await checkPhoneNumberOrEmailExists(formattedNum);
        if (!res.success) {
          const result = await signInWithPhoneNumber(formattedNum);
          setLoadingButton(false);
          if (result) {
            startTimer();
          }
          navigation.navigate('OtpVerification', {
            authResult: result,
            phoneNumber: formattedNum,
            isFromSignUp: false,
            isFromSignIn: true,
          });
          setModalVisible(false);
          setLoadingButton(false);
        } else {
          showErrorToast(
            translate('common.autherror'),
            selectedLanguageItem?.language_id === 0
              ? res?.message
              : res?.message,
          );
          setModalVisible(false);
          setLoadingButton(false);
        }
      } catch (err) {
        navigation.navigate('HomeScreen');
        handleAuthError(err);
        setModalVisible(false);
        setLoadingButton(false);
        console.error('Error from signInWithNumber', err);
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
      <KeyboardAwareScrollView style={{opacity: loadingButton ? 0.4 : 1}}>
        <AuthHeader title={translate('common.signintoyouraccount')} />
        <AppInput
          editable={!loadingButton}
          label={translate('common.mobilephonenumber')}
          required
          placeholder={translate('common.enteryourphonenumber')}
          isNumberField
          value={
            phoneNo ? phoneNo : splitMobileNumber(phoneNumber)?.lastTenDigits
          }
          onChangeText={phone => {
            setPhoneNo(phone);
            setError({...error, ['phoneErr']: null});
          }}
          validate={[maxLength10, validatePhoneNo]}
          error={error.phoneErr}
          onChangeFormattedText={val => setFormattedNum(val)}
          maxLength={10}
          defaultCode={
            phoneNumber
              ? getCountryCode(splitMobileNumber(phoneNumber)?.remainingDigits)
              : 'IQ'
          }
          language={selectedLanguageItem?.language_id}
        />

        <AppButton
          label={
            timer > 0
              ? `Please try after ${timer} seconds`
              : translate('common.signin')
          }
          containerStyle={{marginVertical: '5%'}}
          onPress={Login}
          isIndicatorLoading={loadingButton}
          disabled={loadingButton || timer > 0}
        />

        <AuthBottomContainer
          title={translate('common.orsigninwith')}
          isAccountText={translate('common.don’thaveaaccount?')}
          isSignUp={false}
          onPressButton={() =>
            navigation.navigate('Signup', {phoneNumber: formattedNum})
          }
          loadingButton={loadingButton}
          setLoadingButton={setLoadingButton}
        />
      </KeyboardAwareScrollView>
      <PopupDrawer
        modalVisible={modalVisible}
        onRequestClose={() => closeModal()}>
        <ReceiveMessageModel
          phoneNo={phoneNo}
          onContinuePress={signInWithNumber}
          loadingButton={loadingButton}
          onRadioSelect={handleRadioSelect}
        />
      </PopupDrawer>
    </AppBackground>
  );
};

export default Login;
