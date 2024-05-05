import {
  View,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { AppIcons, AppImages } from '../constant/AppAsset';
import UserInfoCard from '../components/UserInfoCard';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/AppNavigator';
import { Text } from '../components/text/StyledText';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import moment from 'moment';

const DetailProFile = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const userInfo = useSelector(
    (state: RootState) => state.userReducer.userInfo,
  );
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ elevation: 3 }}>
        <Image
          style={styles.banner}
          source={require('../assets/img/bannerFpoly.png')}
        />
        <View style={styles.backGround}></View>

        <Image style={styles.logo} source={AppImages.poly} />
        <NameAndAvatarContainer
          name={userInfo?.fullName || ''}
          email={userInfo?.email || ''}
          avatar={userInfo?.picture || ''}
        />
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={{ tintColor: 'white', width: 24, height: 24 }}
              source={AppIcons.back}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: 'flex-start', padding: 24 }}>
        <UserInfoCard
          infoLabel="Mã số sinh viên"
          info={userInfo?.studentID || ''}
        />
        <UserInfoCard infoLabel="Giới tính" info={userInfo?.gender || ''} />
        <UserInfoCard
          infoLabel="Ngày sinh"
          info={moment(userInfo?.birthday).format('DD/MM/YYYY') || ''}
        />
        <UserInfoCard infoLabel="Địa chỉ" info={userInfo?.address || ''} />
        <UserInfoCard infoLabel="Chuyên ngành" info={userInfo?.major || ''} />
      </ScrollView>
      <StatusBar translucent backgroundColor="transparent" />
    </View>
  );
};
const NameAndAvatarContainer: React.FC<{ name: string; email: string, avatar: string }> = ({
  name,
  email,
  avatar
}) => {
  return (
    <View style={styles.nameContainer}>
      <Image
        style={styles.avatar}
        source={{
          uri: avatar,
        }}
      />

      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.name, { fontSize: 14 }]}>{email}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  logo: {
    position: 'absolute',
    top: 40,
    right: 10,
    alignSelf: 'center',
    resizeMode: 'center',
    width: 120,
    height: 40,
  },
  banner: {
    resizeMode: 'contain',
    width: '100%',
    height: 250,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  name: {
    fontWeight: '900',
    fontSize: 22,
    color: 'white',
    marginTop: 5,
  },
  backGround: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 90,
    position: 'absolute',
    bottom: 50,
  },
  backButton: {
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    position: 'absolute',
  },
});
export default DetailProFile;
