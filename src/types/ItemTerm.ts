import {ImageSourcePropType} from 'react-native';

export interface ItemTerm {
  _id: string;
  subjectCode: string;
  subjectName: string;
  status: string;
  mark: number;
  icon: ImageSourcePropType;
}
