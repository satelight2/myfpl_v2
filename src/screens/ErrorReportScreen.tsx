import ScreenContainer from '../components/ScreenContainer';
import {Text} from '../components/text/StyledText';
import ScreenToolBar from '../components/ScreenToolBar';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProp} from '../navigation/AppNavigator';
import {PermissionsAndroid, StyleSheet, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {AppAnimations, AppIcons} from '../constant/AppAsset';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Color} from '../constant/Colors';
import {Image, ToastAndroid} from 'react-native';
import ImageAdded from '../components/ImageAdded';
import {ErrorReport} from '../types/ErroReport';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  Asset,
} from 'react-native-image-picker';
import {useCallback, useState} from 'react';
import SelectImageModal from '../modal/SelectImageModal';
import AxiosInstance from '../helper/axiosInstance';
const ErorReportScreen = () => {
  // state
  const [images, setImages] = useState<Asset[]>([]);
  const [errMess, setErrMess] = useState<string>('');
  const launchOptions: CameraOptions = {
    mediaType: 'photo',
  };

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const onUpdateComplete = (url: string) => {
    console.log(imageUrls);
    setImageUrls([...imageUrls, url]);
  };
  const onOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    const response = await launchCamera(launchOptions);
    setShowModalSelectImage(false);
    if (!response.assets) return;
    if (response.assets) {
      setImages([...images, ...response.assets]);
    }
  };
  const deleteImage = (uri: string) => {
    const newImages = images.filter(item => item.uri != uri);
    setImages(newImages);
  };
  const onOpenLibrary = useCallback(async () => {
    const response = await launchImageLibrary({
      ...launchOptions,
      selectionLimit: 0,
    });
    setShowModalSelectImage(false);
    if (!response.assets) return;
    setImages([...images, ...response.assets]);
  }, [images]);

  const navigation = useNavigation<AppNavigationProp>();
  const sendErroRp = async () => {
    try {
      const requestBody: ErrorReport = {
        content: errMess,
        images: imageUrls,
      };
      await AxiosInstance().post('report-bug', requestBody);
      console.log('thanh cong');
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  const [isShowModalSelectImage, setShowModalSelectImage] =
    useState<boolean>(false);
  const showModalSelectImage = () => {
    setShowModalSelectImage(true);
  };
  return (
    <ScreenContainer>
      <ScreenToolBar
        onButtonBackPress={() => {
          navigation.goBack();
        }}
        title="Báo lỗi ứng dụng"
      />
      <View style={{flex: 1, padding: 20}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              height: 150,
            }}>
            <AnimatedLottieView autoPlay loop source={AppAnimations.eror} />
          </View>
          <Text style={styles.content}>
            Mong bạn thông cảm với sự cố không mong muốn hoặc trải nghiệm không
            tốt của ứng dung, bạn có thể gửi báo cáo cho đội ngũ phát triển,
            chúng tôi sẽ xem xét và cải thiện ứng dụng trong thời gian nhanh
            nhất. Cảm ơn.
          </Text>
          <Text style={styles.label}>Phản hồi của bạn về ứng dụng :</Text>
          <TextInput
            value={errMess}
            onChangeText={text => {
              setErrMess(text);
            }}
            multiline
            style={styles.textInput}
          />
          <Text style={styles.label}>
            Gửi cho chúng tôi ảnh chụp màn hình lỗi bạn gặp phải (nếu có):
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
            }}>
            <ChoseImageButton onPress={showModalSelectImage} />
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {images.map(item => {
                return (
                  <ImageAdded
                    onUpdateComplete={onUpdateComplete}
                    onDelete={deleteImage}
                    img={item}
                    key={item.uri}
                  />
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            sendErroRp();
            navigation.goBack();
            ToastAndroid.show(
              'Cảm ơn bạn đã gửi phản hồi cho chúng tôi !',
              ToastAndroid.SHORT,
            );
          }}
          style={styles.button}>
          <Text style={styles.buttonLabel}>Gửi phản hồi</Text>
        </TouchableOpacity>
      </View>
      <SelectImageModal
        onOpenCamera={onOpenCamera}
        onOpenLibrary={onOpenLibrary}
        setShowModal={setShowModalSelectImage}
        isShowModal={isShowModalSelectImage}
      />
    </ScreenContainer>
  );
};

type ChoseImageButtonProps = {
  onPress: Function;
};
const ChoseImageButton = ({onPress}: ChoseImageButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={styles.choseImgButtonContainer}>
      <Image
        style={{
          width: 34,
          height: 34,
          resizeMode: 'contain',
        }}
        source={AppIcons.addImage}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  choseImgButtonContainer: {
    elevation: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#58a5fe',
    borderStyle: 'dashed',
    borderWidth: 1,
    width: 80,
    marginRight: 10,
    height: 120,
  },
  label: {
    width: '80%',
    fontWeight: '700',
    color: Color.MAINCOLOR,
    fontSize: 16,
  },

  choseImageContainer: {
    marginVertical: 10,
    height: 80,
  },
  buttonLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
  },
  button: {
    elevation: 3,
    borderRadius: 15,
    backgroundColor: Color.MAINCOLOR,
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  content: {
    textAlign: 'justify',
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
  },
  textInput: {
    maxHeight: 150,
    padding: 20,
    elevation: 2,
    marginVertical: 20,
    width: '98%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default ErorReportScreen;
