import ScreenContainer from '../components/ScreenContainer';
import DashBoard from './NewsList';
import SearchBar from '../components/SearchBar';
import ScreenToolBar from '../components/ScreenToolBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  AppNavigationProp,
  SearchResultScreenProps,
} from '../navigation/AppNavigator';
import {StyleSheet, View} from 'react-native';
import {Color} from '../constant/Colors';
import {useEffect, useState} from 'react';
import {News} from '../types/News';
import NoResultView from '../components/NoResult';
import {Text} from '../components/text/StyledText';
import AxiosInstance from '../helper/axiosInstance';

const SearchResultScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const searchKey =
    useRoute<SearchResultScreenProps['route']>().params.searchKey;
  const [data, setData] = useState<News[]>([]);
  const search = async () => {
    try {
      setSearching(true);
      const res = await AxiosInstance().get('/news/search/' + searchKey);
      console.log(res);
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearching(false);
    }
  };
  const [isSearching, setSearching] = useState<boolean>(true);

  useEffect(() => {
    search();
  }, [searchKey]);
  return (
    <ScreenContainer>
      <ScreenToolBar
        onButtonBackPress={() => {
          navigation.goBack();
        }}
        title="Tìm kiếm bài viết "
      />
      <SearchBar searchKeyPassed={searchKey} />
      {data && data.length != 0 && (
        <>
          <View style={{flexDirection: 'row', paddingHorizontal: 24}}>
            <Text style={styles.searchText}>Kết quả tìm kiếm cho</Text>
            <Text style={styles.searchKey}>{searchKey}</Text>
          </View>
        </>
      )}
      <View>
        <DashBoard
          isSearch={true}
          keyword={searchKey}
          setData={setData}
          newsData={data}
        />
        {data && data.length == 0 && (
          <View
            style={{
              paddingHorizontal: 24,
              position: 'absolute',
              alignSelf: 'center',
            }}>
            {!isSearching && (
              <Text
                style={{
                  marginBottom: 20,
                  fontWeight: 'bold',
                  fontSize: 17,
                  marginVertical: 20,
                  top: 50,
                }}>
                Xin lỗi, không có bài viết nào phù hợp với tìm kiếm của bạn !
              </Text>
            )}
            {<NoResultView />}
          </View>
        )}
      </View>
    </ScreenContainer>
  );
  //can truyen data vao dashbroad
};
const styles = StyleSheet.create({
  searchKey: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '700',
    color: Color.MAINCOLOR,
    textDecorationLine: 'underline',
  },
  searchText: {
    color: 'black',
    fontSize: 15,
  },
});
export default SearchResultScreen;
