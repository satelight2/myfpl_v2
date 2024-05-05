import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import _ from 'lodash';
import { AppIcons } from '../constant/AppAsset';
import { Color } from '../constant/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  AppNavigationProp,
  TranscriptScreenProps,
} from '../navigation/AppNavigator';
import { Transcript as TranscriptType } from '../types/Grades';
import ScreenToolBar from './ScreenToolBar';

const Transcript: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const transcriptRoute =
    useRoute<TranscriptScreenProps['route']>().params.transcript;

  const [columns, setColumns] = useState<string[]>([
    'Tên đầu điểm',
    'Trọng số',
    'Điểm',
  ]);

  const calculateAverage = (transcripts: TranscriptType) => {
    const weightedSum = transcripts.grades.reduce(
      (sum, item) => sum + item.result * item.weight,
      0,
    );
    return (weightedSum / 100).toFixed(2);
  };


  const getStatus = (transcripts: TranscriptType) => {
    const average = parseFloat(calculateAverage(transcripts));
    return average >= 5.0 ? 'Passed' : 'Failed';
  };
  type TableFooterProps = {
    transcripts: TranscriptType;
  };
  const TableFooter = ({ transcripts }: TableFooterProps) => (
    <View style={styles.tableFooter}>
      <Text style={styles.footerText}>
        Average Score:
        <Text style={{ fontWeight: '900' }}>{calculateAverage(transcripts)}</Text>
      </Text>
      <Text style={styles.footerText}>Status: {getStatus(transcripts)}</Text>
    </View>
  );

  const [direction, setDirection] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [transcript, setTranscripts] =
    useState<TranscriptType>(transcriptRoute);

  const sortTable = (column: string) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc';
    const columnMap: { [key: string]: string } = {
      'Tên đầu điểm': 'name',
      'Trọng số': 'weight',
      Điểm: 'result',
    };
    const propertyName = columnMap[column];
    const sortedData = _.orderBy(
      transcript.grades,
      [propertyName],
      [newDirection],
    );
    setSelectedColumn(column);
    setDirection(newDirection);
    setTranscripts({ ...transcript, grades: sortedData });
  };

  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.columnHeader}
            onPress={() => sortTable(column)}>
            <View style={styles.columnHeaderContent}>
              <Text style={styles.columnHeaderTxt}>{column + ' '}</Text>
              {selectedColumn === column && (
                <Image
                  source={direction === 'desc' ? AppIcons.desc : AppIcons.asc}
                  style={styles.arrowIcon}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScreenToolBar
        onButtonBackPress={() => {
          navigation.goBack();
        }}
        title={'Bảng điểm'}
      />

      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 5,
            color: 'black',
          }}>
          {transcript.subject.name}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: 5,
            color: 'black',
          }}>
          {transcript.subject.code}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={transcript.grades}
          style={{ width: '100%' }}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={tableHeader}
          stickyHeaderIndices={[0]}
          renderItem={({ item, index }) => {
            const formattedMark = item.result.toFixed(1);
            return (
              <View
                style={{
                  ...styles.tableRow,
                  backgroundColor: index % 2 != 0 ? '#faf1e6' : 'white',
                }}>
                <Text style={{ ...styles.columnRowTxt, fontWeight: 'bold' }}>
                  {item.name}
                </Text>
                <Text style={styles.columnRowTxt}>{item.weight}</Text>
                <Text style={styles.columnRowTxt}>{formattedMark}</Text>
              </View>
            );
          }}
        />
        <TableFooter transcripts={transcript} />
      </View>
    </View>
  );
};

export default Transcript;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Color.MAINCOLOR,
    height: 50,
  },
  tableRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  columnHeader: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  columnRowTxt: {
    color: 'black',
    width: '33%',
    textAlign: 'center',
  },
  columnHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 10,
    height: 10,
    marginLeft: 5,
  },
  tableFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Color.MAINCOLOR,
    height: 50,
    marginBottom: 30,
  },
  footerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
