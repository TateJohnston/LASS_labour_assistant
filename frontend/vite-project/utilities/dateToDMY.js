const dateToDMY = (date) => {
  if (!date || typeof date !== "string") return "Invalid Date";
  const dateArr = date.split("-");
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  return `${day}-${month}-${year}`;
};

export default dateToDMY;
