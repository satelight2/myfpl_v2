import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, ListRenderItem } from 'react-native';
import { NewsTabItem } from '../components/NewsTabItem';
import ListNewsItem from '../components/item_card/ListNewsItem';
import { RefreshControl } from 'react-native-gesture-handler';
import { News } from '../types/News';
import { NewsType } from '../types/NewType';
import LoadingModal from '../modal/Loading';
import AxiosInstance from '../helper/axiosInstance';
const Tabs = [
  {
    name: 'Tất cả',
    newsType: 'All',
  },
  {
    name: 'Học tập',
    newsType: 'hoctap',
  },

  {
    name: 'Hoạt động',
    newsType: 'hoatdong',
  },
  {
    name: 'Học phí',
    newsType: 'hocphi',
  },
];
export type DashBoardProps = {
  isSearch?: boolean;
  newsData?: News[];
  keyword?: string;
  setData: Function;
  isLoading?: boolean;
};
const DashBoard = ({
  newsData,
  isSearch,
  setData,
  isLoading,
  keyword,
}: DashBoardProps): React.JSX.Element => {
  const [tabSelected, setTab] = useState<NewsType | string>(Tabs[0].newsType);
  const [isListNewRefesh, setListNewRefesh] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<{ [key: string]: boolean }>(
    {},
  );

  const fetchDataForTab = async (newsType: NewsType | string) => {
    setLoadingStatus(prev => ({ ...prev, [newsType]: true }));
    if (newsType === 'All') {
      let res = await AxiosInstance().get(`/news`);
      setData(res.data);
      setLoadingStatus(prev => ({ ...prev, [newsType]: false }));
      return;
    }
    try {
      const res = await AxiosInstance().get(`/news/type/${newsType}`);
      setData(res.data);
    } catch (error) {
      console.log(`/news/type/${newsType.toLowerCase()}`);
    } finally {
      setLoadingStatus(prev => ({ ...prev, [newsType]: false }));
    }
    setLoadingStatus(prev => ({ ...prev, [newsType]: false }));
  };
  const searchDataForTab = async (
    newsType: NewsType | string,
    keyword: string | undefined,
  ) => {
    setLoadingStatus(prev => ({ ...prev, [newsType]: true }));
    if (newsType === 'All') {
      let res = await AxiosInstance().get('/news/search/' + keyword);
      setData(res.data);
      setLoadingStatus(prev => ({ ...prev, [newsType]: false }));
      return;
    }
    try {
      console.log(newsType);
      console.log(keyword);
      const res = await AxiosInstance().get(
        '/news/search/' + keyword + '?type=' + newsType,
      );
      setData(res.data);
      console.log('=============', res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStatus(prev => ({ ...prev, [newsType]: false }));
    }
    setLoadingStatus(prev => ({ ...prev, [newsType]: false }));
  };
  const onTabPress = (newsType: NewsType | string) => {
    setTab(newsType);
    if (!isSearch) {
      fetchDataForTab(newsType);
    } else {
      searchDataForTab(newsType, keyword);
    }
  };

  const onListNewsRefesh = () => {
    setListNewRefesh(true);
    setTimeout(() => {
      setListNewRefesh(false);
    }, 3000);
  };

  useEffect(() => { }, [tabSelected]);

  const RenderItemNews: ListRenderItem<News> = ({ item }) => {
    return <ListNewsItem news={item} />;
  };
  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={{
            height: 60,
          }}>
          {Tabs.map(tab => (
            <NewsTabItem
              onPress={() => {
                onTabPress(tab.newsType);
              }}
              key={tab.name}
              name={tab.name}
              isSelected={tab.newsType === tabSelected}
            />
          ))}
        </ScrollView>
      </View>
      {newsData && (
        <FlatList
          style={{}}
          refreshControl={
            <RefreshControl
              refreshing={isListNewRefesh}
              onRefresh={() => {
                onListNewsRefesh();
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          data={newsData}
          renderItem={RenderItemNews}
        />
      )}
      {isLoading && <LoadingModal isShowModal={isLoading} />}
      {loadingStatus[tabSelected] && <LoadingModal isShowModal={true} />}
    </>
  );
};

export default DashBoard;
