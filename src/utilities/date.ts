import dayjs, { ManipulateType } from 'dayjs';

export const formatAnyToDate = (date: any) => {
  const newDate = dayjs(date).toDate();

  return newDate;
};

export const formatDateToString = (date: Date) => {
  const newDate = new Date(date);

  return newDate.toDateString();
};

export const addDate = (value: number, unit: ManipulateType) => {
  const newDate = dayjs().add(value, unit);

  return newDate.toDate();
};

export const subtractDate = (value: number, unit: ManipulateType) => {
  const newDate = dayjs().subtract(value, unit);

  return newDate.toDate();
};
