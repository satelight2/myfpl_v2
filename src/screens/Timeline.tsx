import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { Alert } from 'react-native';
import { AppIcons } from '../constant/AppAsset';
import moment from 'moment';
import { Text } from '../components/text/StyledText';
import AxiosInstance from '../helper/axiosInstance';
import { ScheduleQuery } from './ScheduleScreen';
import { set } from 'lodash';
import LoadingModal from '../modal/Loading';
interface ScheduleTimesProps {
  selectedTabQuery: ScheduleQuery;
  isShowModal: boolean;
}
const ScheduleTimes: React.FC<ScheduleTimesProps> = ({ selectedTabQuery, isShowModal }) => {
  const [schedule, setSchedule] = useState();
  const getSchedule = async () => {
    try {
      isShowModal = true;
      const res = await AxiosInstance().get(
        `/schedule?type=${selectedTabQuery.type}&limit=${selectedTabQuery.limit}`,
      );
      setSchedule(res.data);
    } catch (err) {
      console.log(err);
      isShowModal = false;
    } finally {
      isShowModal = false;
    }
  };
  useEffect(() => {
    getSchedule();
  }, [selectedTabQuery]);

  useEffect(() => {
    isShowModal = true;
  }, [selectedTabQuery]);

  const renderDetail = (data: any): JSX.Element => {
    return (
      <View style={{ flex: 1 }}>
        {isShowModal && <LoadingModal isShowModal={isShowModal} />}
        <Text style={[styles.rowTitle]}>
          {`${data.classInfo.subject.name} (${data.classInfo.subject.code})`}
        </Text>
        <View style={styles.descriptionContainer}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Image style={styles.icon} source={AppIcons.des}></Image>
            <Text style={[styles.textDescriptionStyle]}>
              {data.description}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Image style={styles.icon} source={AppIcons.place}></Image>
            <Text style={[styles.textDescriptionStyle]}>{data.room}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {/* <Image
              source={{ uri: data.classInfo.teacher.photo }}
              style={styles.imageStyle}
            /> */}
            <Text
              style={{
                fontWeight: '500',
                marginHorizontal: 5,
                color: 'black',
              }}>
              {`${data.classInfo.teacher.fullName} (${data.classInfo.teacher.username})`}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTime = (data: any): JSX.Element => {
    return (
      <View style={{ width: 80, backgroundColor: '#f4f9f8' }}>
        <Text
          style={{
            fontSize: 14,
            color: '#327ab8',
            fontWeight: '700',
          }}>
          {moment(data.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            color: '#04b14a',
            fontWeight: '700',
          }}>
          {data.slot.label}
        </Text>
        <Text
          style={{
            marginTop: 20,
            fontSize: 14,
            color: 'black',
            fontWeight: '700',
          }}>
          {data.slot.startTime}
        </Text>
        <Text
          style={{
            color: '#BCC1CD',
          }}>
          {data.slot.endTime}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Timeline
        style={{ backgroundColor: '#f4f9f8' }}
        data={schedule}
        circleSize={20}
        circleColor="rgba(0,0,0,0)"
        lineColor="#BCC1CD"
        timeStyle={{
          textAlign: 'center',
          color: 'white',
          padding: 5,
          borderRadius: 13,
        }}
        descriptionStyle={{ color: 'white', fontWeight: '400' }}
        detailContainerStyle={{
          padding: 10,
          width: '98%',
          marginBottom: 20,
          elevation: 2,
          backgroundColor: '#fafdf5',
          borderRadius: 15,
        }}
        onEventPress={(item: any) =>
          Alert.alert(`${item.title} at ${item.time}`)
        }
        renderDetail={renderDetail}
        renderTime={renderTime}
        options={{
          showsVerticalScrollIndicator: false,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#f4f9f8',
    marginTop: 10,
  },
  title: {
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#327ab8',
    marginBottom: 2,
  },
  descriptionContainer: {
    flexDirection: 'column',
    marginVertical: 5,
  },
  imageStyle: {
    width: 20,
    height: 20,
    borderRadius: 25,
  },
  textDescriptionStyle: {
    margin: 5,
    color: 'black',
  },
  icon: {
    tintColor: 'black',
    width: 12,
    height: 12,
  },
});

export default memo(ScheduleTimes);
