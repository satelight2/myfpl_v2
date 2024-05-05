import ScreenContainer from '../components/ScreenContainer';
import { memo, useState } from 'react';
import { View, FlatList } from 'react-native';
import { fakeAttandancesType } from '../modal/FakeData';
import AttandancesItem from '../components/AttendancesItem';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/AppNavigator';
import ScreenToolBar from '../components/ScreenToolBar';


const ListAttandancesScreen = () => {

    const [attandance, setAttendance] = useState(fakeAttandancesType);
    const navigation = useNavigation<AppNavigationProp>();
    return (
        <ScreenContainer>

            <ScreenToolBar
                onButtonBackPress={() => {
                    navigation.goBack();
                }}
                title="Điểm danh"
            />
            <View style={{ flex: 1, backgroundColor: '#fff', paddingVertical: 10 }}>
                <FlatList
                    data={attandance}
                    renderItem={({ item }) => (
                        <AttandancesItem
                            item={item}
                            onPress={() => {
                                navigation.navigate('Attendances');
                            }}
                        />
                    )}
                    keyExtractor={item => item._id}
                />
            </View>

        </ScreenContainer>
    );
};

export default memo(ListAttandancesScreen);
