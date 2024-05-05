import { Image, TouchableOpacity } from 'react-native';
import { AppAnimations, AppIcons } from '../../constant/AppAsset';
import { buttonGeneralStyle } from './GenaralStyles';
import { Text } from '../text/StyledText';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ApiKey } from '../../constant/ApiKey';

import AnimatedLottieView from 'lottie-react-native';
import { memo } from 'react';
type LoginGoogleButtonProps = {
  isLoading: boolean;
  onPress: Function;
};
const LoginGoogleButton = ({ isLoading, onPress }: LoginGoogleButtonProps) => {
  GoogleSignin.configure({
    webClientId: ApiKey.googleClientId,
  });
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={async () => {
        onPress();
      }}
      style={[buttonGeneralStyle.container]}>
      {isLoading ? (
        <AnimatedLottieView
          speed={1}
          duration={2500}
          resizeMode="contain"
          style={{
            width: 'auto',
            height: '100%',
            alignSelf: 'center',
          }}
          autoPlay
          loop
          source={AppAnimations.ggLoadingAnm}
        />
      ) : (
        <>
          <Image style={buttonGeneralStyle.icon} source={AppIcons.google} />
          <Text style={buttonGeneralStyle.text}>Đăng nhập với Google</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
{
  /* */
}
export default memo(LoginGoogleButton);
