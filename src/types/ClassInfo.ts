import {ClassAdress} from './Adress';
import {Subject} from './Subject';
import {Teacher} from './Teacher';
import {TimeSlot} from './TimeSlot';

export interface ClassInfo {
  _id: string;
  classCode: string;
  subject: Subject;
  date: string;
  link: string;
  description: string;
  classAddress: ClassAdress;
  slot: TimeSlot;
  note: string;
  status: string;
  teacher: Teacher;
}

/*{
  "_id":"64b5150b8575b4fc209d60ff",
  "classCode":"MD18101",
  "date":"2023-07-19T00:00:00.000Z",
  "description":"Slide 4:Express js và hbs template (P2), Lab4(P2), Quiz4",
  "link":"https://www.youtube.com/watch?v=9bZkp7q19f0",
  "note":"ghi chu",
  "room":"T1103",
  "slot":{
      "_id":"64b4ec69db426a902d573b99",
      "endTime":"09:15",
      "label":"Ca 1",
      "startTime":"07:15"
  },
  "status":"HDI"
},*/
