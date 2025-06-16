const calculateDayDifference = (start_date, end_date) => {
  const endDateMilli = new Date(end_date).getTime();
  const startDateMilli = new Date(start_date).getTime();
  const conversion = 1000 * 60 * 60 * 24;
  const diff = endDateMilli - startDateMilli;
  const dayDiff = Math.round(diff / conversion) + 1;
  return dayDiff;
};

export default calculateDayDifference;
