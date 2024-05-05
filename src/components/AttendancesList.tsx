import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from '../components/text/StyledText';
import moment from 'moment';
import { IAttandances } from '../types/Attandances';

interface AttendancesListProps {
    data: IAttandances[];
    study: number;
}


const AttendancesList: React.FC<AttendancesListProps> = ({ data, study }) => {

    return (
        <View style={{ marginTop: 20 }}>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, fontWeight: '400', maxWidth: '80%', color: 'black' }}>Ngày</Text>
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: '800', maxWidth: '80%', color: 'black' }}>{moment(item.date).format('DD/MM/YYYY')}</Text>
                        <View style={{ borderWidth: 0.25, borderColor: '#e0e0e0', borderStyle: 'solid', marginTop: 6 }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>Ca học</Text>
                                <Text style={{ color: '#ff7f74', fontWeight: '800', fontSize: 16 }}>{study}</Text>
                            </View>

                            <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                <Text style={{ color: 'black', fontWeight: '400', fontSize: 14 }}>Giáo viên</Text>
                                <Text style={{ color: 'black', fontWeight: '800', fontSize: 14 }}>{item.approver}</Text>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default React.memo(AttendancesList);

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
        elevation: 2
    }
})
