import AnimatedLottieView from 'lottie-react-native';
import {StyleSheet, Text, View} from 'react-native';
import {AppAnimations} from '../constant/AppAsset';

const NoResultView = () => {
  return (
    <View style={styles.container}>
      <AnimatedLottieView loop autoPlay source={AppAnimations.noResult} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
});
export default NoResultView;
