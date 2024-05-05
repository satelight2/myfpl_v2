import {HourAndMinute} from './HourAndMinute';

export interface TimeSlot {
  _id: string;
  startTime: HourAndMinute;
  endTime: HourAndMinute;
  label: string;
}
