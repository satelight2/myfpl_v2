import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ApiKey} from '../constant/ApiKey';
import AxiosInstance from '../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../constant/AsyncStorageKey';
import auth from '@react-native-firebase/auth';

export const loginWithGoogle = async () => {
    // Check if your device supports Google Play
    try {
        await GoogleSignin.signOut();
        await GoogleSignin.hasPlayServices();
        const resGoogleLogin = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(
            resGoogleLogin.idToken,
        );
        // Sign-in the user with the credential
        await auth().signInWithCredential(googleCredential);
        const resSeverLogin: any = await AxiosInstance().post('auth/logingoogle', {
            tokenId: resGoogleLogin.idToken,
        });
        console.log(resSeverLogin);
        // res data.accessToken
        await AsyncStorage.setItem(
            AsyncStorageKey.AccessTokenKey,
            resSeverLogin.data.accessToken,
        );
        console.log(
            'resSeverLogin.data.accessToken',
            resSeverLogin.data.accessToken,
        );
        await AsyncStorage.setItem(
            AsyncStorageKey.RefeshTokenKey,
            resSeverLogin.data.refreshToken,
        );
        return 'not errr'
    } catch (err) {
      console.log('loi login', {err});
        return false
    }
};
