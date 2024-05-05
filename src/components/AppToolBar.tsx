import { StyleSheet, View, Image, TouchableOpacity, Alert, Linking, Modal, Platform } from 'react-native';
import React, { useState } from 'react';
import { AppIcons } from '../constant/AppAsset';
import { Color } from '../constant/Colors';
import { useNavigation } from '@react-navigation/native';
import { Text } from './text/StyledText';
import { AppNavigationProp } from '../navigation/AppNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { set } from 'lodash';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';

const AppToolBar: React.FC = () => {

  const [isQRScanning, setIsQRScanning] = useState(false);
  const [isQRScanningError, setIsQRScanningError] = useState(false);

  const onQRCodeScanned = (e: any) => {
    setIsQRScanning(false);
    setIsQRScanningError(false);
    const { data } = e;
    if (isValidURL(data)) {
      Linking.openURL(data);
    } else {
      setIsQRScanningError(true);
    }
  };

  const isValidURL = (url: string) => {
    const regex = new RegExp(
      '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
      'i',
    );
    return !!regex.test(url);
  };

  // const scanQRCodeFromImage = async () => {
  //   const options = {
  //     title: 'Select QR Code',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   await launchImageLibrary(options, (response: any) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       Alert.alert('Error', 'Something went wrong while selecting image');
  //     } else {
  //       const { uri } = response;
  //       if (uri) {
  //         Linking.canOpenURL(uri)
  //           .then((supported) => {
  //             if (supported) {
  //               Linking.openURL(uri);
  //             } else {
  //               setIsQRScanningError(true);
  //             }
  //           })
  //           .catch(() => {
  //             setIsQRScanningError(true);
  //           });
  //       } else {
  //         setIsQRScanningError(true);
  //       }
  //     }
  //   });
  // };



  const navigation = useNavigation<AppNavigationProp>();
  const userInfo = useSelector(
    (state: RootState) => state.userReducer.userInfo,
  );
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://lh3.googleusercontent.com/a/AAcHTteekTstA5kgs1FHesSYpP7-lUiLXgONjLeDp_-IhzB0=s96-c',
        }}
        style={styles.profileImage}
      />
      <Text style={styles.nameText}>
        {userInfo?.fullName || 'Anonymous user'}
      </Text>
      <View style={styles.qrNotificationContainer}>
        <TouchableOpacity onPress={() => setIsQRScanning(true)}>
          <Image source={AppIcons.qr} style={styles.qrImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Notification');
        }}>
          <Image
            source={AppIcons.notification}
            style={styles.notificationImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Email');
          }}
          style={{ marginLeft: 10 }}>
          <Image source={AppIcons.mail} style={styles.notificationImage} />
        </TouchableOpacity>
      </View>

      {isQRScanning && (
        <Modal style={styles.qrScannerContainer}>
          <QRCodeScanner
            onRead={onQRCodeScanned}
            flashMode={RNCamera.Constants.FlashMode.auto}
            // reactivate={true}
            // reactivateTimeout={2000}
            topContent={
              <Text style={styles.qrScannerText}>Đặt mã QR trong khung quét</Text>
            }
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', top: -100, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsQRScanning(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>

        </Modal>
      )}

      {isQRScanningError && (
        <Modal
          visible={isQRScanningError}
          animationType='slide'
          onRequestClose={() => setIsQRScanningError(false)}
        >
          <View style={{}}>
            <Text style={{ color: 'black', fontWeight: '800' }}>QR không hợp lệ</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsQRScanningError(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default AppToolBar;
const styles = StyleSheet.create({
  qrScannerContainer: {
    flex: 1,
    position: 'absolute',
  },

  qrScannerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  container: {
    elevation: 3,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    height: 60,
    backgroundColor: Color.MAINCOLOR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  qrNotificationContainer: {
    tintColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  qrImage: {
    tintColor: 'white',
    width: 20,
    height: 20,
    marginRight: 15,
  },
  notificationImage: {
    tintColor: 'white',
    width: 20,
    height: 20,
  },
});
