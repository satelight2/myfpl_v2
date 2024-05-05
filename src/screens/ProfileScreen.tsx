import {ScrollView} from 'react-native-gesture-handler';
import AppToolBar from '../components/AppToolBar';
import ScreenContainer from '../components/ScreenContainer';
import StudentCard from '../components/StudentCard';
import LogoutButton from '../components/buttons/LogoutButton';
import ProfileMenuItem from '../components/item_card/ProflieMenuItem';
import {AppIcons} from '../constant/AppAsset';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProp} from '../navigation/AppNavigator';
const ProfileScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const menuItems = [
    {
      label: 'Thông tin cá nhân',
      icon: AppIcons.info,
      onPress: () => {
        navigation.navigate('DetailProfile');
      },
    },
    {
      label: 'Điểm danh',
      icon: require('../assets/icon/ic_aa.png'),
      onPress: () => {
        navigation.navigate('Email');
      },
    },
    {
      label: 'Khen thưởng - Kỷ luật',
      icon: AppIcons.prize,
      onPress: () => {
        navigation.navigate('DetailProfile');
      },
    },
    {
      label: 'Cổng liên hệ',
      icon: AppIcons.contact,
      onPress: () => {
        navigation.navigate('Contact');
      },
    },
    {
      label: 'Báo lỗi ứng dụng',
      icon: AppIcons.warring,
      onPress: () => {
        navigation.navigate('ErorReport');
      },
    },
  ];
  return (
    <ScreenContainer>
      <AppToolBar />
      <ScrollView>
        <StudentCard />
        <View
          style={{
            marginVertical: 20,
          }}>
          {menuItems.map(item => (
            <ProfileMenuItem
              onPress={item.onPress}
              key={item.label}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </View>
      </ScrollView>
      <LogoutButton />
    </ScreenContainer>
  );
};

export default ProfileScreen;
