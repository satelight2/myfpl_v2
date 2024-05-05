import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {AppIcons} from '../constant/AppAsset';
import {ViewStyle, View} from 'react-native';
import IconBottomTab from '../components/IconBottomTab';
import {Color} from '../constant/Colors';
import ProfileScreen from '../screens/ProfileScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MarskScreen from '../screens/MarskScreen';

const Tab = createBottomTabNavigator();
const ScreenTabs = [
  {
    name: 'Trang chủ',
    icon: AppIcons.home,
    component: HomeScreen,
  },
  {
    name: 'Lịch học',
    icon: AppIcons.schedule,
    component: ScheduleScreen,
  },
  {
    name: 'Bảng điểm',
    icon: AppIcons.mark,
    component: MarskScreen,
  },
  {
    name: 'Cá nhân',
    icon: AppIcons.account,
    component: ProfileScreen,
  },
];
const MainBottomNavigatior = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarStyle: bottomTabContainerStyle,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Color.MAINCOLOR,
        tabBarInactiveTintColor: 'black',
      }}>
      {ScreenTabs.map(tab => {
        return (
          <Tab.Screen
            key={tab.name}
            options={{
              tabBarIcon: ({color, focused}) => (
                <IconBottomTab
                  focused={focused}
                  icon={tab.icon}
                  name={tab.name}
                  color={color}
                />
              ),
            }}
            name={tab.name}
            component={tab.component}
          />
        );
      })}
    </Tab.Navigator>
  );
};
const bottomTabContainerStyle: ViewStyle = {
  width: '100%',
  backgroundColor: 'white',
  elevation: 5,
  height: 65,
};
export default MainBottomNavigatior;
