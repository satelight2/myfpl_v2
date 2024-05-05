import AnimatedLottieView from 'lottie-react-native';
import {View, Animated, StyleSheet, Image} from 'react-native';
import {AppAnimations, AppIcons} from '../constant/AppAsset';
import React, {useEffect, useRef} from 'react';
const PolyLoadingView = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={AppIcons.poly} />
      <AnimatedLottieView
        style={styles.animation}
        autoPlay
        loop
        source={AppAnimations.loadingAnm}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  animation: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  container: {
    alignSelf: 'center',
    height: 300,
  },
  image: {
    top: 125,
    position: 'absolute',
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
});
export default PolyLoadingView;
