import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from '../components/text/StyledText';
import moment from 'moment';
import { fakeAttandances } from '../modal/FakeData';
import AttendancesList from '../components/AttendancesList';
import LeaveStatus from '../components/LeaveStatus';
import { AppIcons } from '../constant/AppAsset';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/AppNavigator';

const Attendances = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const absented = 3; // Số ngày nghỉ
  const study = 2; //Ca học
  moment.locale('en');
  const [data, setData] = useState(fakeAttandances);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    setData(fakeAttandances);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            borderRadius: 20,
            left: 10,
            width: 50,
            height: 50,
            backgroundColor: 'rgba(255, 165, 0, 0.6)',
            marginRight: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              alignItems: 'center',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 18,
                tintColor: 'white',

                height: 18,
                resizeMode: 'contain',
              }}
              source={AppIcons.back}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>
          Tất cả ngày nghỉ
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <LeaveStatus
          label="Số ngày nghỉ"
          value={absented}
          backgroundColor="#fff9f8"
          borderColor="#ff7f74"
        />
      </View>
      <AttendancesList
        data={data}
        study={study}
      />
    </View>
  );
};

export default Attendances;
