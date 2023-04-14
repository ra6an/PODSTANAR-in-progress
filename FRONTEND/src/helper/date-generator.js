const dateGen = (date) => {
  const dateSplited = date.split("T")[0];
  const day = dateSplited.split("-")[2];
  const month = dateSplited.split("-")[1];
  const year = dateSplited.split("-")[0];

  return `${day}-${month}-${year}`;
};

export default dateGen;
