import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {AsyncStorageKey} from '../constant/AsyncStorageKey';
import {RefeshToken} from '../service/RefeshToken';
const AxiosInstance = (contentType = 'application/json') => {
  let isRefreshing = false;
  const axiosInstance = axios.create({
    baseURL: 'http://myap.ddns.net/',
  });
  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const token = await AsyncStorage.getItem(AsyncStorageKey.AccessTokenKey);
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Types': contentType,
      };
      return config;
    },
    err => Promise.reject(err),
  );

  axiosInstance.interceptors.response.use(
    res => res.data,
    async err => {
      console.log(err);
      const originalRequest = err.config;
      if (!err.response) {
        Alert.alert('network error');
        return Promise.reject(err);
      }
      if (err.response.status === 401) {
        if (!isRefreshing) {
          console.log('loi accesstoke het han');
          try {
            isRefreshing = true;
            const newAccessToken = await RefeshToken();
            //set new header
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + newAccessToken;
            return axiosInstance(originalRequest);
          } catch (err) {
            console.log('refeshToken het han login di');
            return Promise.reject(err);
          }
        }
      }
      return Promise.reject(err);
    },
  );
  return axiosInstance;
};

export default AxiosInstance;
