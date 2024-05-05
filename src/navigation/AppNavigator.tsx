import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../constant/AsyncStorageKey';
import {View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppAnimations} from '../constant/AppAsset';
import {ApiKey} from '../constant/ApiKey';
import MainBottomNavigatior from './MainBottomNavigator';
import EmailScreen from '../screens/GmailScreen';
import ContactScreen from '../screens/ContactsScreen';
import DetailNewsScreen from '../screens/DetailNewsScreen';
import DetailProFile from '../screens/DetailProfileScreen';
import SearchResultScreen from '../screens/SearchResult';
import ErorReportScreen from '../screens/ErrorReportScreen';
import Notification from '../screens/Notification';
import Attendances from '../screens/Attendances';
import Transcript from '../components/Transcript';
import {Transcript as TranscriptType} from '../types/Grades';
type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Email: undefined;
  Contact: undefined;
  DetailNews: {newId: string};
  DetailProfile: undefined;
  SearchResultScreen: {searchKey: string};
  ErorReport: undefined;
  Notification: undefined;
  Attendances: undefined;
  Transcript: {
    transcript: TranscriptType;
  };
};

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type SearchResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchResultScreen'
>;
export type DetialNewsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailNews'
>;

export type TranscriptScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Transcript'
>;
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator = () => {
  //google config
  GoogleSignin.configure({
    webClientId: ApiKey.googleClientId,
  });

  const [initialRouteName, setInitialRouteName] = useState<'Login' | 'Main'>(
    'Login',
  );
  const [isCheckLogin, setCheckIsLogin] = useState<boolean>(false);
  const getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem(
      AsyncStorageKey.AccessTokenKey,
    );
    if (accessToken) setInitialRouteName('Main');
    setCheckIsLogin(true);
  };
  useEffect(() => {
    getAccessToken();
  }, []);
  return isCheckLogin ? (
    <>
      <RootStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialRouteName}>
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Main" component={MainBottomNavigatior} />
        <RootStack.Screen name="Email" component={EmailScreen} />
        <RootStack.Screen name="Notification" component={Notification} />
        <RootStack.Screen name="Contact" component={ContactScreen} />
        <RootStack.Screen name="DetailNews" component={DetailNewsScreen} />
        <RootStack.Screen name="DetailProfile" component={DetailProFile} />
        <RootStack.Screen name="ErorReport" component={ErorReportScreen} />
        <RootStack.Screen name="Attendances" component={Attendances} />
        <RootStack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
        />
        <RootStack.Screen name="Transcript" component={Transcript} />
      </RootStack.Navigator>
    </>
  ) : (
    <View style={{flex: 1}}>
      <AnimatedLottieView source={AppAnimations.loadingAnm} autoPlay loop />
    </View>
  );
};
export default AppNavigator;
