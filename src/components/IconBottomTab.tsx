import {View, StyleSheet, Image, ImageSourcePropType, Text} from 'react-native';
import {Color} from '../constant/Colors';
type IconBottomTabProps = {
  color: string;
  name: string;
  icon: ImageSourcePropType;
  focused: boolean;
};
const IconBottomTab = ({color, name, icon, focused}: IconBottomTabProps) => {
  return (
    <View style={[styles.container, focused && styles.containerFocused]}>
      <Image
        style={[styles.icon, focused && styles.iconFocused]}
        source={icon}
      />
      {focused && <Text style={[styles.label, {color: color}]}>{name}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    tintColor: 'black',
    width: 17,
    height: 17,
  },
  iconFocused: {
    tintColor: Color.MAINCOLOR,
    width: 22,
    height: 22,
  },
  containerFocused: {
    borderTopColor: Color.MAINCOLOR,
    borderTopWidth: 2,
  },
  container: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
  },
});
export default IconBottomTab;
