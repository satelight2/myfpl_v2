import {View, Text, Image, StyleSheet, DimensionValue} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {AppIcons} from '../constant/AppAsset';
import {Color} from '../constant/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Semester} from '../types/Semester';
const ScrollTimeTerm: React.FC<{
  width?: DimensionValue;
  semesters: Semester[];
  semesterId: string;
  setSemesterId: Function;
}> = ({width, semesters, semesterId, setSemesterId}) => {
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        width: width ? width : '100%',
        marginTop: 20,
        zIndex: 3,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <DropDownPicker
        style={{
          elevation: 3,
          borderWidth: 0,
          borderColor: Color.MAINCOLOR,
        }}
        containerStyle={{borderWidth: 0}}
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
        textStyle={{color: Color.MAINCOLOR, fontWeight: '700'}}
        TickIconComponent={() => (
          <Image style={{width: 24, height: 24}} source={AppIcons.poly} />
        )}
        selectedItemContainerStyle={{
          backgroundColor: '#e3e2ff',
        }}
        onChangeValue={value => {
          console.log(value);
          setSemesterId(value);
        }}
        open={open}
        value={semesterId}
        items={semesters.map(semester => ({
          label: semester.name,
          value: semester._id,
        }))}
        setOpen={setOpen}
        setValue={value => {
          setSemesterId(value);
        }}
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
export default ScrollTimeTerm;
