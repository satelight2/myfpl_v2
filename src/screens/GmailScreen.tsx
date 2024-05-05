import ScreenContainer from '../components/ScreenContainer';
import { memo, useState } from 'react';
import { View, FlatList } from 'react-native';
import { fakeAttandancesType } from '../modal/FakeData';
import AttandancesItem from '../components/AttendancesItem';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/AppNavigator';
import ScreenToolBar from '../components/ScreenToolBar';


const AttandancesScreen = () => {

  const [attandance, setAttendance] = useState(fakeAttandancesType);
  const navigation = useNavigation<AppNavigationProp>();
  return (
    <ScreenContainer>
      <ScreenToolBar
        onButtonBackPress={() => {
          navigation.goBack();
        }}
        title="Điểm danh"
      />
      <View style={{ flex: 1, backgroundColor: '#fff', paddingVertical: 10 }}>
        <FlatList
          data={attandance}
          renderItem={({ item }) => (
            <AttandancesItem
              item={item}
              onPress={() => {
                navigation.navigate('Attendances');
              }}
            />
          )}
          keyExtractor={item => item._id}
        />
      </View>

    </ScreenContainer>
  );
};

export default memo(AttandancesScreen);

{/*import ScreenContainer from '../components/ScreenContainer';
import { getData } from '../service/test.callapi';
import { memo, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from '../components/text/StyledText';
// cho luu data
// vi tri o nho la 1
const EmailScreen = () => {
  const ham = useCallback(() => { }, []);
  useEffect(() => {
    getData();
  }, []);

  return (
    <ScreenContainer>
      <Test cc={ham}></Test>
    </ScreenContainer>
  );
};
const Test: React.FC<{ cc: Function }> = ({ cc }) => {
  return <View>
  </View>;
};
export default memo(EmailScreen);
*/}