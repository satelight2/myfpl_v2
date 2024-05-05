import React, {memo, useCallback} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import FacilityCard from '../components/item_card/Facility';
import {Facility} from '../types/Facility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../constant/AsyncStorageKey';
import ModalGenaralStyle from './ModalGenaralStyle';
const fakeData: Facility[] = [
  {
    id: '1',
    name: 'FPT Polytechnic HCM',
  },
  {
    id: '2',

    name: 'FPT Polytechnic HN',
  },
  {
    id: '3',

    name: 'FPT Polytechnic CT',
  },
  {
    id: '4',
    name: 'FPT Polytechnic HCM1',
  },
  {
    id: '5',

    name: 'FPT Polytechnic HN1',
  },
  {
    id: '6',

    name: 'FPT Polytechnic CT1',
  },
];
interface SelectFacilityModalProps {
  isShowModal: boolean;
  setVisible: Function;
  facility?: Facility;
  setFacility: Function;
}
const SelectFacilityModal = ({
  isShowModal,
  setVisible,
  facility,
  setFacility,
}: SelectFacilityModalProps): React.JSX.Element => {
  console.log(facility);
  const onFacilityCardPress = useCallback(async (facility: Facility) => {
    setVisible(false);
    setFacility(facility);
    await AsyncStorage.setItem(
      AsyncStorageKey.FacilityKey,
      JSON.stringify(facility),
    );
  }, []);
  return (
    <Modal transparent visible={isShowModal}>
      <View style={ModalGenaralStyle.container}>
        <View style={styles.scrollViewContainer}>
          <Text style={styles.label}>Chọn cơ sở đào tạo:</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {fakeData.map(item => (
              <FacilityCard
                onPress={() => {
                  onFacilityCardPress(item);
                }}
                isSelected={item.id === facility?.id}
                key={item.id}
                name={item.name}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    justifyContent: 'center',
    padding: 24,
    width: '90%',
    height: '50%',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 15,
    color: '#f27125',
  },
});
export default memo(SelectFacilityModal);
