import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {fakeNotification} from '../modal/FakeData';
import {TypeNotification} from '../types/Notification';
import ScreenContainer from '../components/ScreenContainer';
import {Text} from '../components/text/StyledText';
import AppToolBar from '../components/AppToolBar';
import ScreenToolBar from '../components/ScreenToolBar';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProp} from '../navigation/AppNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
// dasdasda

const Notification: React.FC = () => {
  const [data, setData] = useState<TypeNotification[]>(fakeNotification);
  const navigation = useNavigation<AppNavigationProp>();
  const handleItemPress = (itemId: string) => {
    const updatedData = data.map(item =>
      item._id === itemId ? {...item, isRead: true} : item,
    );
    setData(updatedData);
  };

  const handleMarkAllAsRead = () => {
    const updatedData = data.map(item => ({...item, isRead: true}));
    setData(updatedData);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenToolBar
        onButtonBackPress={() => {
          navigation.goBack();
        }}
        title="Thông báo"
      />
      <ScrollView style={{padding: 20}}>
        <TouchableOpacity
          style={{marginBottom: 10}}
          onPress={handleMarkAllAsRead}>
          <Text style={styles.notificationContent}>
            Đánh dấu tất cả là đã đọc
          </Text>
        </TouchableOpacity>
        {data.map(item => (
          <View
            key={item._id}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={[
                styles.notificationDot,
                {backgroundColor: item.isRead ? 'transparent' : 'red'},
              ]}
            />
            <TouchableOpacity
              key={item._id}
              style={[styles.notificationContainer]}
              onPress={() => handleItemPress(item._id)}>
              <Text style={styles.notificationContent}>{item.content}</Text>
              <Text style={styles.notificationDate}>
                Với {item.user.fullName} vào{' '}
                {moment(item.createdAt).format(
                  '[ngày] DD [tháng] MM [năm] YYYY',
                )}
              </Text>
              <Image
                source={{uri: item.user.picture}}
                style={styles.notificationImage}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    alignSelf: 'center',
  },
  notificationContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    marginBottom: 8,
    elevation: 5,
    borderRadius: 10,
    width: '93%',
  },
  notificationContent: {
    fontWeight: '700',
    fontSize: 15,
    width: '80%',
    color: '#353A5F',
  },
  notificationDate: {
    fontSize: 13,
    color: '#B6C0C5',
    fontWeight: '400',
    maxWidth: '85%',
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default Notification;
