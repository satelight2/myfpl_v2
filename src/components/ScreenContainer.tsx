import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {Color} from '../constant/Colors';

const ScreenContainer = ({
  children,
}: React.PropsWithChildren): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.MAINCOLOR} />
      {children}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f9f8',
  },
});
export default ScreenContainer;
