export const sortData = (data) => {
  /* Copy it out into an array */
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

};