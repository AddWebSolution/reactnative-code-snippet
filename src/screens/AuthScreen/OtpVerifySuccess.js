import React from 'react';
import EmptyDetailScreen from '../../Components/EmptyDetailScreen';
import Images from '../../constant/Images';
import {useNavigation} from '@react-navigation/native';
import {translate} from '../../utility';

const OtpVerifySuccess = () => {
  const navigation = useNavigation();

  return (
    <EmptyDetailScreen
      image={Images.OTPVerify}
      title={translate('common.numberVerified')}
      description={translate('common.thankForRegister')}
      buttonLabel={translate('common.gotoshopping')}
      onpress={() => navigation.navigate('HomeTab')}
    />
  );
};

export default OtpVerifySuccess;
