import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TermScreen from '../screens/TermScreen';
const Tab = createMaterialTopTabNavigator();
const MarksTopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontWeight: '700'},
        tabBarIndicatorStyle: {backgroundColor: '#084d9a'},
        tabBarActiveTintColor: '#084d9a',
      }}
      style={{flex: 1}}>
      <Tab.Screen
        options={{title: 'Kì Học'}}
        name="Kì Học"
        component={TermScreen} 
      />
      {/* <Tab.Screen name="Lịch sử học" component={ProfileScreen} /> */}
      {/* <Tab.Screen
        options={{title: 'Bảng điểm'}}
        name="Bảng điểm 2"
        component={Transcript}
      /> */}
    </Tab.Navigator>
  );
};
export default MarksTopTab;
