const convertDate = (date) => {
  if (!date) return "Invalid Date";
  const dateStr = new Date(date);
  const year = dateStr.getFullYear();
  const month = String(dateStr.getMonth() + 1).padStart(2, "0");
  const day = String(dateStr.getDate()).padStart(2, "0");
  const convertedDate = `${year}-${month}-${day}`;
  return convertedDate;
};

export default convertDate;
