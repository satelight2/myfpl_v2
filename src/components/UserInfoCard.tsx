import { View, StyleSheet } from 'react-native';
import { Text } from './text/StyledText';
type UserInfoCardProps = {
  infoLabel: string;
  info: string;
};
const UserInfoCard = ({ info, infoLabel }: UserInfoCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoLabel}>{infoLabel}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  info: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 30,
    color: '#595151',
    borderWidth: 1.3,
    padding: 10,
    borderRadius: 15,
    borderColor: '#bababa',
  },
  infoLabel: {
    marginVertical: 5,
    fontWeight: '700',
    color: 'black',
    fontSize: 17,
  },
});
export default UserInfoCard;
