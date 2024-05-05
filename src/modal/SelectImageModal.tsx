import React, {memo} from 'react';
import {
  Modal,
  Text,
  View,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ModalGenaralStyle from './ModalGenaralStyle';
import {AppIcons} from '../constant/AppAsset';

interface SelectImageModalProps {
  setShowModal: Function;
  isShowModal: boolean;
  onOpenCamera: Function;
  onOpenLibrary: Function;
}
const SelectImageModal = ({
  isShowModal,
  setShowModal,
  onOpenCamera,
  onOpenLibrary,
}: SelectImageModalProps): React.JSX.Element => {
  return (
    <Modal transparent visible={isShowModal}>
      <View style={ModalGenaralStyle.container}>
        <View style={styles.modalContainer}>
          <View style={{flexDirection: 'row'}}>
            <SelectMethod
              onPress={onOpenLibrary}
              label="Mở thư viện"
              icon={AppIcons.photo}
            />
            <SelectMethod
              onPress={onOpenCamera}
              label="Chụp ảnh"
              icon={AppIcons.camera}
            />
          </View>
          <View style={styles.cancelContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={styles.cancelLabel}>Trở lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const SelectMethod: React.FC<{
  onPress: Function;
  icon: ImageSourcePropType;
  label: string;
}> = ({icon, label, onPress}) => {
  return (
    <View style={{width: '40%', height: 100}}>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={styles.methodContainer}>
        <Image style={styles.methodIcon} source={icon} />
        <Text style={styles.methodName}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  methodIcon: {
    width: 40,
    height: 40,
  },
  modalContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    elevation: 2,
  },
  methodName: {
    marginVertical: 10,
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  methodContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelContainer: {
    position: 'absolute',
    bottom: 10,
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelLabel: {
    color: '#0066b3',
    fontWeight: '700',
    fontSize: 18,
  },
});
export default memo(SelectImageModal);
