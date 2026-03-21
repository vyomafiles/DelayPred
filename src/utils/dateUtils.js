// Date utilities
import { formatDate as dfFormatDate, parseISO, addDays } from 'date-fns';

export const formatDate = (date, format = 'PPP') => {
  return dfFormatDate(new Date(date), format);
};

export const getNextWeekDates = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(new Date(), i));
  }
  return dates;
};

export const isPastDate = (date) => {
  return new Date(date) < new Date();
};
