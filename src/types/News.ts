import {NewsType} from './NewType';
export interface News {
  _id: string;
  title: string;
  content: string;
  type: NewsType;
  like: number;
  dislike: number;
  publishedAt: string;
}
