import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Colors from '../constant/Colors';

const AppBackground = props => {
  return (
    <>
      {props.hideSafeArea ? null : (
        <SafeAreaView
          style={[
            styles.safeArea,
            props.safeAreaColor && {backgroundColor: props.safeAreaColor},
          ]}
        />
      )}
      <View style={[styles.backgroundContainer, props.containerStyle]}>
        <StatusBar
          hidden={false}
          translucent={false}
          barStyle="light-content"
          backgroundColor={Colors.themeColor}
        />
        {props.children}
      </View>
      {props.hideBottomSafeArea ? null : (
        <SafeAreaView
          style={[
            styles.safeArea,
            props.safeAreaColor && {backgroundColor: props.safeAreaColor},
            props.bottomSafeAreaColor && {
              backgroundColor: props.bottomSafeAreaColor,
            },
          ]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: Colors.LightGray,
  },
  safeArea: {
    backgroundColor: Colors.WHITE,
  },
});

export default AppBackground;
