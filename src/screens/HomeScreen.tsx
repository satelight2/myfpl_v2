import ScreenContainer from '../components/ScreenContainer';
import DashBoard from './NewsList';
import {useEffect, useState} from 'react';
import AppToolBar from '../components/AppToolBar';
import SearchBar from '../components/SearchBar';
import AxiosInstance from '../helper/axiosInstance';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {getUserInfo} from '../redux/userSlice';
import {getSemester} from '../redux/SemesterSlice';
import {NewsType} from '../types/NewType';
import {set} from 'lodash';

const HomeScreen = () => {
  const disPatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    disPatch(getUserInfo());
  }, []);
  useEffect(() => {
    disPatch(getSemester());
  }, []);

  const [data, setData] = useState(undefined);

  const getNews = async () => {
    setLoading(true);
    try {
      const res = await AxiosInstance().get('/news');
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <ScreenContainer>
      <AppToolBar />
      <SearchBar searchKeyPassed="" />
      <DashBoard setData={setData} newsData={data} isLoading={isLoading} />
    </ScreenContainer>
  );
};
export default HomeScreen;
