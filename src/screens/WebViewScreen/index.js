import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import Colors from '../../constant/Colors';
import AppBackground from '../Components/AppBackground';
import {showErrorToast} from '../../Components/universal/Toast';
import {updateOrderStatus} from '../../services/apis/OrdersAPI/UpdateOrderStatus';
import {useSelector} from 'react-redux';

const WebViewScreen = props => {
  const orderId = props?.route?.params?.orderId;
  const paymentData = props?.route?.params?.paymentData;
  const navigation = useNavigation();
  const {selectedLanguageItem} = useSelector(state => state.languageReducer);

  const handlePaymentCheckout = async event => {
    if (event.nativeEvent.data === 'payment successful') {
      try {
        const statusData = {
          orderId: orderId,
          statusType: 'order_status',
          status: 'processing',
          paymentMethod:
            paymentData?.display_name?.[selectedLanguageItem.language_name] ||
            paymentData?.display_name?.en,
        };
        await updateOrderStatus(statusData, navigation);
      } catch (err) {
        showErrorToast(translate('common.error'), err?.data?.meta?.message);
      }
    } else {
      navigation.navigate('ErrorScreen', {
        message: 'Payment failed try again!',
      });
    }
  };
  return (
    <AppBackground>
      <WebView
        source={{uri: `${paymentData?.route_url}?order_id=${orderId}`}}
        onMessage={event => handlePaymentCheckout(event)}
        style={[styles.container]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        automaticallyAdjustContentInsets={true}
        startInLoadingState={true}
        useWebKit={true}
        scrollEnabled={true}
        bounces={true}
        decelerationRate="normal"
        allowsBackForwardNavigationGestures={true}
        scalesPageToFit={true}
      />
    </AppBackground>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    margin: 12,
    backgroundColor: Colors.WHITE3,
    flex: 1,
    resizeMode: 'cover',
  },
});
