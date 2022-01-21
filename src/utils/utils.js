import numeral from "numeral";

export const pettyPrintStat = (stat) => 
  stat ? `+${numeral(stat).format('0,0')}` : '+0';

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// draw circles on the map with interactive tooltip

