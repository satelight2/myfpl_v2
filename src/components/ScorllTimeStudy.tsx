import { View, Text, Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppIcons } from '../constant/AppAsset';
import { Color } from '../constant/Colors';
import { set } from 'lodash';
import { ScheduleQuery } from '../screens/ScheduleScreen';
import LoadingModal from '../modal/Loading';
const ScrollTimeStudy: React.FC<{ setTabQuery: Function, isShowModal: boolean }> = ({ setTabQuery, isShowModal }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('0');
  const [items, setItems] = useState([
    { label: '15 ngày trước', value: '-15' },
    { label: '7 ngày trước', value: '-7' },
    { label: 'Hôm nay', value: '0' },
    { label: '7 ngày tới', value: '7' },
    { label: '15 ngày tới', value: '5' },
  ]);


  useEffect(() => {
    isShowModal = true;
  }, [setTabQuery]);

  return (
    <View
      style={{
        marginTop: 20,
        zIndex: 3,
        height: 50,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isShowModal && <LoadingModal isShowModal={isShowModal} />}
      <DropDownPicker
        style={{
          elevation: 3,
          borderWidth: 0,
          borderColor: Color.MAINCOLOR,
        }}
        containerStyle={{ borderWidth: 0 }}
        ArrowDownIconComponent={() => (
          <Image style={styles.iconDropDown} source={AppIcons.arr_down} />
        )}
        ArrowUpIconComponent={() => (
          <Image style={styles.iconDropDown} source={AppIcons.arr_up} />
        )}
        dropDownContainerStyle={{
          backgroundColor: '#f2f2f2',
          borderColor: Color.MAINCOLOR,
          marginTop: 15,
          borderWidth: 0,
        }}
        textStyle={{ color: Color.MAINCOLOR, fontWeight: '700' }}
        TickIconComponent={() => (
          <Image style={{ width: 24, height: 24 }} source={AppIcons.poly} />
        )}
        selectedItemContainerStyle={{
          backgroundColor: '#e3e2ff',
        }}
        onChangeValue={value => {
          setTabQuery((prev: ScheduleQuery) => {
            return { ...prev, limit: value };
          });
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  iconDropDown: {
    marginRight: 10,
    width: 15,
    height: 15,
    tintColor: Color.MAINCOLOR,
  },
});
export default ScrollTimeStudy;
