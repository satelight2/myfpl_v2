import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../constant/AsyncStorageKey';
export const Logout = async () => {
  await AsyncStorage.removeItem(AsyncStorageKey.AccessTokenKey);
  await AsyncStorage.removeItem(AsyncStorageKey.RefeshTokenKey);
  await GoogleSignin.signOut();
};
