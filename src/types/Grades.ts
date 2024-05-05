export interface Transcript {
  subject: SubjectOnGrades;
  grades: Grade[];
}
export interface SubjectOnGrades {
  name: string;
  code: string;
  semester: string;
}
export interface Grade {
  name: string;
  weight: number;
  result: number;
}
