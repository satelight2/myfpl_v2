import ScreenContainer from '../components/ScreenContainer';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ScreenToolBar from '../components/ScreenToolBar';
import { View, Image, Linking } from 'react-native';
import ContactInfoItem from '../components/ContactInfoItem';
import { ScrollView } from 'react-native-gesture-handler';
import { AppIcons, AppImages } from '../constant/AppAsset';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/AppNavigator';
import Share from 'react-native-share';
import { Text } from '../components/text/StyledText';
const ContactInfos = [
  {
    name: 'Phòng Dịch vụ sinh viên',
    info: 'dvsvpoly.hcm@poly.edu.vn',
  },
  {
    name: 'Phòng Đào tạo',
    info: 'dvsvpoly.hcm@poly.edu.vn',
  },
  {
    name: 'Phòng Hành chính',
    info: 'taichinhfplhcm@fe.edu.vn',
  },
  {
    name: 'Phòng Quan hệ doanh nghiệp',
    info: 'qhdn.fplhcm@fe.edu.vn',
  },
  {
    name: 'Phòng Công tác sinh viên',
    info: 'ctsv.fplhcm@fe.edu.vn',
  },
//   á
];
const ContactScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();

  return (
    <ScreenContainer>
      <ScreenToolBar
        onButtonBackPress={() => {
          navigation.goBack();
        }}
        title="Cổng thông tin liên hệ FPOLY"
      />
      <ScrollView>
        <View
          style={{
            padding: 24,
            paddingTop: 0,
          }}>
          <View
            style={{
              marginTop: 30,
            }}>
            {ContactInfos.map(item => (
              <ContactInfoItem
                key={item.name}
                name={item.name}
                info={item.info}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={async () => {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          try {
            await Linking.openURL('https://www.facebook.com/ctsvfpolyhcm');
          } catch (err) {
            console.log(err);
          }
        }}
        style={styles.buttonFacebook}>
        <Text style={styles.label}>Fanpage CTSV FOLY HCM</Text>
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={AppIcons.poly}
        />
      </TouchableOpacity>
      <Image
        style={{
          alignSelf: 'center',
          marginBottom: 20,
          resizeMode: 'center',
          width: 160,
          height: 70,
        }}
        source={AppImages.poly}
      />
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  buttonFacebook: {
    justifyContent: 'center',
    borderRadius: 15,
    width: '80%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#558bf7',
    elevation: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontWeight: '700',
    fontSize: 17,
    color: 'white',
    marginRight: 10,
  },
});
export default ContactScreen;
