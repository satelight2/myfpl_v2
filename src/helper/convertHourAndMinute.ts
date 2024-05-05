import {HourAndMinute} from '../types/HourAndMinute';
import moment from "moment";

export const convertHourAndMinuesToString = (time: HourAndMinute) => {
  let minute = time.minute.toString();
  if (time.minute == 0) {
    minute = '00';
  }
  return time.hour + ':' + minute;
};
export const newFeedTimeFormat = (time: number | string): string => {
  const now = moment();
  const date = moment(time);
  const diffInMinutes = now.diff(date, 'minutes');
  if (diffInMinutes < 1) {
    return 'Vừa xong'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} giờ trước `;
  } else if (diffInMinutes < 10080) {
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
  } else {
    return date.format('DD/MM/YYYY');
  }
}




