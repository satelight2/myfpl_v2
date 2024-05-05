import {
  TouchableOpacity,
  ToastAndroid,
  Image,
  View,
  StyleSheet,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Share, { ShareOptions } from 'react-native-share';
import { AppIcons } from '../constant/AppAsset';
type ContactInfoItemProps = {
  name: string;
  info: string;
};
import { Text } from './text/StyledText';
const ContactInfoItem = ({ info, name }: ContactInfoItemProps) => {
  const CoppyToClipBoard = () => {
    Clipboard.setString(info);
    ToastAndroid.show('Đã sao chép thông tin liên hệ', ToastAndroid.SHORT);
  };
  const shareViaEmail = async () => {
    const shareOptions: ShareOptions = {
      subject: '',
      email: info,
    };
    try {
      const result = await Share.open(shareOptions);
      console.log('Kết quả chia sẻ:', result);
    } catch (error: any) {
      console.log('Lỗi khi chia sẻ:', error.message);
    }
  };
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={[styles.textInfo, { color: 'black' }]}>{name} :</Text>
      <View style={styles.container}>
        <Text style={styles.textInfo}>{info}</Text>
        <TouchableOpacity onPress={CoppyToClipBoard}>
          <Image style={styles.iconClipbroad} source={AppIcons.clipBroad} />
        </TouchableOpacity>
        <TouchableOpacity onPress={shareViaEmail}>
          <Image style={styles.iconClipbroad} source={AppIcons.sendEmail} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  iconClipbroad: {
    resizeMode: 'center',
    width: 25,
    height: 25,
    tintColor: '#0063ac',
  },
  container: {
    marginVertical: 3,
    paddingHorizontal: 30,
    height: 60,
    justifyContent: 'space-between',
    borderRadius: 15,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 1.5,
    backgroundColor: 'white',
  },
  textInfo: {
    fontWeight: '500',
    fontSize: 15,
    color: '#0063ac',
  },
});
export default ContactInfoItem;
