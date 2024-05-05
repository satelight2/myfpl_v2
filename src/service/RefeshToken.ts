import AxiosInstance from '../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../constant/AsyncStorageKey';
export const RefeshToken = async () => {
  try {
    const refeshToken = await AsyncStorage.getItem(
      AsyncStorageKey.RefeshTokenKey,
    );
    console.log('refesh toke trong refesh token', refeshToken);
    const res: any = await AxiosInstance().post('auth/refeshtoken', {
      refeshtoken: refeshToken,
    });
    if (res.accessToken && res.refeshToken) {
      await AsyncStorage.setItem(
        AsyncStorageKey.AccessTokenKey,
        res.accessToken,
      );
      await AsyncStorage.setItem(
        AsyncStorageKey.RefeshTokenKey,
        res.refeshToken,
      );
    }
    return res.accessToken;
  } catch (err) {
    console.log('trong refeshToken', err);
  }
};
