import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { AppIcons } from '../../constant/AppAsset';
import { Text } from '../text/StyledText';
interface FacilityCard {
  name: string;
  isSelected: boolean;
  onPress: Function;
}
const FacilityCard = ({
  name,
  isSelected,
  onPress,
}: FacilityCard): React.JSX.Element => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[
        styles.container,
        isSelected && { borderColor: '#f27125', borderWidth: 0.5 },
      ]}>
      <Text style={[styles.text, isSelected && { color: '#f27125' }]}>
        {name}
      </Text>
      {isSelected && <Image style={styles.icon} source={AppIcons.poly} />}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
    fontSize: 15,
    color: 'black',
  },
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 15,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '99%',
    alignSelf: 'center',
    height: 48,
  },
  icon: {
    position: 'absolute',
    right: 10,
    width: 30,
    height: 30,
  },
});
export default FacilityCard;
