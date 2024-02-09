import {StyleSheet, Dimensions, View} from 'react-native';
import React, {useState, useRef} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';

const Carousels = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isCarousel = useRef(null);

  return (
    <>
      <NativeViewGestureHandler disallowInterruption>
        <Carousel
          layout="default"
          ref={isCarousel}
          data={props.Data}
          scrollEnabled={props.scrollEnabled}
          sliderWidth={props.sliderWidth}
          itemWidth={props.itemWidth}
          renderItem={props.renderItem}
          useScrollView={true}
          inactiveSlideShift={0}
          onSnapToItem={index => setActiveIndex(index)}
          activeSlideAlignment={'center'}
          contentContainerCustomStyle={props.contentContainerCustomStyle}
          {...props}
        />
      </NativeViewGestureHandler>
      {props.enablePagination && (
        <View style={props?.paginationContainerStyle || {}}>
          <Pagination
            dotsLength={props?.dotsLength}
            activeDotIndex={activeIndex}
            carouselRef={isCarousel}
            dotStyle={[styles.dotStyle, props.dotStyle]}
            dotContainerStyle={props.dotContainerStyle}
            tappableDots={true}
            inactiveDotOpacity={props.inactiveDotOpacity || 0.4}
            containerStyle={props.containerStyle}
            animatedTension={0}
            animatedDuration={0}
            inactiveDotScale={props.inactiveDotScale || 0.6}
          />
        </View>
      )}
    </>
  );
};

export default Carousels;

const styles = StyleSheet.create({
  dotStyle: {
    width: 15,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FEC350',
  },
  carouselWidth: {
    width: Dimensions.get('window').width,
  },
});
