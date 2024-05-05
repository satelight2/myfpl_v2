import ScreenContainer from '../components/ScreenContainer';
import { useEffect, useState } from 'react';
import AppToolBar from '../components/AppToolBar';
import ScrollTimeStudy from '../components/ScorllTimeStudy';
import ScheduleTimes from './Timeline';
import { View, FlatList } from 'react-native';
import NewsTabItem from '../components/NewsTabItem';
import { ScrollView } from 'react-native-gesture-handler';
import { fakeAttandancesType } from '../modal/FakeData';
import { PreventRemoveContext, useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/AppNavigator';
import AttandancesItem from '../components/AttendancesItem';
import { TabBar } from 'react-native-tab-view';
import LoadingModal from '../modal/Loading';
import { set } from 'lodash';
type Scheduletab = {
  name: string;
  scheduleType: string;
};
const Tabs: Scheduletab[] = [
  {
    name: 'Lịch học',
    scheduleType: '1',
  },
  {
    name: ' Lịch thi',
    scheduleType: '2',
  },
];
export type ScheduleQuery = {
  type: string;
  limit: string;
};
const ScheduleScreen = () => {
  const [scheduleQuery, setScheduleQuery] = useState<ScheduleQuery>({
    type: '1',
    limit: '0',
  });
  const navigation = useNavigation<AppNavigationProp>();
  const [tabSelected, setTab] = useState<Scheduletab>(Tabs[0]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onTabPress = (tab: Scheduletab) => {
    setIsShowModal(false);
    setScheduleQuery(prev => {
      return { ...prev, type: tab.scheduleType };
    });
    setTab(tab);
  }




  const [attandance, setAttendance] = useState(fakeAttandancesType);
  return (
    <ScreenContainer>
      <AppToolBar />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={{
            height: 60,
          }}>
          {Tabs.map(tab => (
            <NewsTabItem
              onPress={() => {
                onTabPress(tab);
              }}
              key={tab.name}
              name={tab.name}
              isSelected={tab.name === tabSelected.name}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollTimeStudy setTabQuery={setScheduleQuery} isShowModal={isShowModal} />
      <ScheduleTimes selectedTabQuery={scheduleQuery} isShowModal={isShowModal} />
    </ScreenContainer>
  );
};

export default ScheduleScreen;
