import {StyleSheet} from 'react-native';
export const buttonGeneralStyle = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 2,
    width: '100%',
    height: 52,
    borderRadius: 15,
  },
  icon: {
    resizeMode: 'cover',
    marginRight: 20,
    width: 28,
    height: 28,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
});
