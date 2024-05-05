import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from './text/StyledText';

type NewsTabItem = {
  isSelected: boolean;
  name: string;
  onPress: Function;
};

export const NewsTabItem = ({ name, isSelected, onPress }: NewsTabItem) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[styles.container, isSelected && { backgroundColor: '#04b14a' }]}>
      <Text style={[styles.label, isSelected && { color: 'white' }]}>{name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    height: 40,
    width: 90,
  },
  label: {
    color: '#7c82a1',
    fontSize: 15,
    fontWeight: '600',
  },
});
export default NewsTabItem;
