import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppIcons } from '../../constant/AppAsset';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../../navigation/AppNavigator';
import { Logout } from '../../service/Logout';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { showLoadingModal } from '../../helper/showLoadingModal';
import { Text } from '../text/StyledText';

const LogoutButton = () => {
  const appNavigation = useNavigation<AppNavigationProp>();
  const dishpatch = useDispatch<AppDispatch>();
  return (
    <TouchableOpacity
      onPress={async () => {
        showLoadingModal(dishpatch, true);
        await Logout();
        appNavigation.reset({
          index: 0, // chỉ định vị trí màn hình muốn reset
          routes: [{ name: 'Login' }], // chỉ định tên màn hình mà bạn muốn reset đến
        });
        showLoadingModal(dishpatch, false);
      }}
      style={styles.container}>
      <Text style={styles.label}>Đăng xuất</Text>
      <Image style={styles.icon} source={AppIcons.logOut} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: 'row',
    borderRadius: 18,
    height: 40,
    backgroundColor: '#0063ac',
    width: '38%',
    // position: 'absolute',
    // bottom: 30,
    alignSelf: 'center',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 17,
    color: 'white',
    fontWeight: '700',
  },
  icon: {
    marginLeft: 10,
    width: 17,
    height: 17,
    tintColor: 'white',
  },
});
export default LogoutButton;
