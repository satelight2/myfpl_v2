import React, {memo, useCallback} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import ModalGenaralStyle from './ModalGenaralStyle';
import AnimatedLottieView from 'lottie-react-native';
import {AppAnimations} from '../constant/AppAsset';
interface SelectFacilityModalProps {
  isShowModal: boolean;
}
const LoadingModal = ({
  isShowModal,
}: SelectFacilityModalProps): React.JSX.Element => {
  return (
    <Modal transparent visible={isShowModal}>
      <View style={ModalGenaralStyle.container}>
        <AnimatedLottieView source={AppAnimations.loadingAnm} autoPlay loop />
      </View>
    </Modal>
  );
};
export default LoadingModal;
