import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppIcons, AppImages} from '../constant/AppAsset';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AppNavigationProp,
  DetialNewsScreenProps,
} from '../navigation/AppNavigator';
import {useState, useEffect} from 'react';
import {Text} from '../components/text/StyledText';
import {News} from '../types/News';
import AxiosInstance from '../helper/axiosInstance';
import {changeTypeNews} from '../types/NewType';
const DetailNewsScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const newId = useRoute<DetialNewsScreenProps['route']>().params.newId;
  const [news, setNews] = useState<News>();
  const getDetailNews = async () => {
    const res = await AxiosInstance().get(`news/${newId}`);
    setNews(res.data);
  };
  useEffect(() => {
    getDetailNews();
  }, []);

  // Tùy chỉnh ngôn ngữ thành tiếng Việt

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={styles.banner}
            source={require('../assets/img/img_banner.png')}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            top: -40,
            padding: 24,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View
            style={{
              backgroundColor: '#0b85e5',
              borderRadius: 20,
              width: 100,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: 'white'}}>
              {changeTypeNews(news?.type || '')}
            </Text>
          </View>
          <Text style={styles.title}>{news?.title}</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.authorContainer}>
              <Image style={styles.image} source={AppIcons.admin} />
              <Text style={styles.nameText}>Hoàng Văn Thành</Text>
            </View>
            <Text style={styles.nameText}>
              {moment(
                news?.publishedAt || '2023-07-18T17:21:19.791Z',
                'YYYYMMDD',
              )
                .locale('vi')
                .format('Do MMM  YYYY')}
            </Text>
          </View>
          <Text style={styles.contentText}>{news?.content}</Text>
        </View>
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
      </ScrollView>
      <View
        style={{
          borderRadius: 20,
          top: 50,
          position: 'absolute',
          left: 10,
          width: 50,
          height: 50,
          backgroundColor: 'rgba(255, 165, 0, 0.6)',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            alignItems: 'center',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: 18,
              tintColor: 'white',

              height: 18,
              resizeMode: 'contain',
            }}
            source={AppIcons.back}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  authorContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  title: {
    color: '#323f53',
    fontSize: 23,
    marginRight: 10,
    marginVertical: 2,
    width: '100%',
    fontWeight: '800',
    marginTop: 10,
  },
  nameText: {
    color: '#9f9f9f',
    fontSize: 16,
    fontWeight: '500',
  },
  contentText: {
    fontSize: 18,
    lineHeight: 24,
    color: 'black',
    textAlign: 'justify',
  },
  banner: {
    width: '101%',
    alignSelf: 'center',
    resizeMode: 'cover',
    height: 400,
  },
});

export default DetailNewsScreen;
