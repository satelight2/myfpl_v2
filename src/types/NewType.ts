export enum NewsType {
  Study = 'Study',
  Tuition = 'Tuition',
  Activity = 'Activity',
}

export function changeTypeNews(type: string) {
  if (type == 'hocphi') return 'Học phí';
  if (type == 'hoatdong') return 'Hoạt động';
  if (type == 'hoctap') return 'Học tập';
}
