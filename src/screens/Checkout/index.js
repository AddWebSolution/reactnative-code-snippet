import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import AppBackground from '../Components/AppBackground';
import AppHeader from '../Components/AppHeader';
import {translate} from '../../utility';
import {getFonts} from '../utils';

const Checkout = props => {
  return (
    <>
      <AppBackground>
        <AppHeader title={translate('common.checkout')} showRightComponent />

        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.circle}>
              <Text style={styles.btnText}>1</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              {' ' + translate('common.addressTxt')}
            </Text>
          </View>
        </View>
      </AppBackground>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Colors.WHITE,
    fontFamily: getFonts.SEMI_BOLD,
  },
  text: {
    fontSize: 12,
    fontFamily: getFonts.SEMI_BOLD,
    letterSpacing: 0.5,
    fontWeight: 600,
    paddingHorizontal: 8,
  },
});
