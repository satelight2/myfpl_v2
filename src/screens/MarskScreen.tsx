import MarksTopTab from '../navigation/MarksTopTab';
import AppToolBar from '../components/AppToolBar';
import TermScreen from './TermScreen';
import {View, FlatList, ScrollView, ListRenderItem} from 'react-native';

const MarskScreen = () => {
  return (
    <View style={{flex: 1}}>
      <AppToolBar />
      <TermScreen />
    </View>
  );
};
export default MarskScreen;
