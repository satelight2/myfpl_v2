import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React, { memo } from 'react';
import { AttandancesType } from '../types/AttandancesType';
import { Text } from './text/StyledText';

interface AttandancesItemProps {
    item: AttandancesType;
    onPress: () => void;
}

const getNumberFromString = (str: string) => {
    return parseInt(str.split('/')[0], 10);
}

const AttendancesItem = ({ item, onPress }: AttandancesItemProps) => {
    const totalDay = 21;
    const passed = getNumberFromString(item.nos) === totalDay;
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>

            <View style={styles.card}>
                <View style={styles.row}>
                    <Image style={{ width: 60, height: 60 }} source={item.icon} />

                    <View style={styles.textContainer}>
                        <View style={[styles.row, { justifyContent: 'space-between' }]}>
                            <Text style={styles.subjectName}>{item.subjectName}</Text>
                        </View>
                        <View style={[styles.row, { justifyContent: 'space-between' }]}>
                            <Text style={styles.subjectCode}>{item.subjectCode}</Text>
                            <Text
                                style={[
                                    styles.status,
                                    {
                                        color: passed ? '#4caf50' : '#f44336',
                                    },
                                ]}
                            >
                                {item.nos}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default memo(AttendancesItem);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    card: {
        borderWidth: 1,
        borderColor: '#e9e9e9',
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    subjectName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    mark: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    subjectCode: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginRight: 10,
    },
});
