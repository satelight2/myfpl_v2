import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {AppIcons} from '../../constant/AppAsset';
import {Text} from '../text/StyledText';
type ProfileMenuItemsProps = {
  label: string;
  icon: ImageSourcePropType;
  onPress: Function;
};
const ProfileMenuItem = ({label, icon, onPress}: ProfileMenuItemsProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '90%',
        }}>
        <TouchableOpacity
          onPress={() => {
            onPress();
          }}
          style={styles.container}>
          <Image style={styles.icon} source={icon} />
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
        {/* <View style={styles.line} /> */}
      </View>
      <Image style={styles.iconArr} source={AppIcons.arr_right} />
    </View>
  );
};
const styles = StyleSheet.create({
  iconArr: {
    resizeMode: 'center',
    width: 19,
    height: 18,
    tintColor: '#0063ac',
  },
  line: {
    width: '80%',
    height: 0.7,
    alignSelf: 'center',
    backgroundColor: '#0063ac',
  },
  container: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  icon: {
    marginHorizontal: 10,
    resizeMode: 'center',
    width: 25,
    height: 25,
  },
  label: {
    marginRight: 20,
    fontSize: 17,
    fontWeight: '700',
    color: '#0063ac',
  },
});
export default ProfileMenuItem;
