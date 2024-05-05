import {View, StyleSheet, Image} from 'react-native';
import {Color} from '../constant/Colors';
import {AppIcons} from '../constant/AppAsset';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from './text/StyledText';
type ScreenToolBar = {
  title: string;
  onButtonBackPress: Function;
};
const ScreenToolBar = ({title, onButtonBackPress}: ScreenToolBar) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            onButtonBackPress();
          }}>
          <Image style={styles.icon} source={AppIcons.back} />
        </TouchableOpacity>
      </View>
      <Text style={styles.tabBarTitle}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  tabBarTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: Color.MAINCOLOR,
    elevation: 3,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  buttonContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    left: 20,
    position: 'absolute',
  },
});
export default ScreenToolBar;
