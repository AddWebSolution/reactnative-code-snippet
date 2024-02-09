import {Platform, Dimensions, PixelRatio} from 'react-native';

let screenWidth = Dimensions.get('window').width;

let screenHeight = Dimensions.get('window').height;

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const heightPercentageToDP = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const widthPercentageToDP = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const responsiveFontSize = f => {
  const tempHeight = (16 / 9) * screenWidth;
  return (
    Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(screenWidth, 2)) * (f / 100)
  );
};

const SIZE = size => {
  const newSize = (size * WIDTH) / 375;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else if (Platform.OS === 'android') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return size;
  }
};

export {
  responsiveFontSize as RF,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  screenWidth,
  screenHeight,
  SIZE,
};
