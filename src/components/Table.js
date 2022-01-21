import React from "react";
import numeral from "numeral";

function Table({ countries, allCountries }) {
  return (
    <div className="table">
      <thead className="table__top">
        <td>Country</td>
        <td>Total cases</td>
        <td>New cases</td>
        <td>Total deaths</td>
        <td>New deaths</td>
        <td>Total recovered</td>
        <td>New recovered</td>
        <td>Active Cases</td>
        <td>Critical</td>
        <td>Total cases/ 1M pop</td>
        <td>Deaths/ 1M pop</td>
        <td>Total tests</td>
        <td>Tests/ 1M pop</td>
        <td>Population</td>
        <td></td>
      </thead>
      {countries.map(
        ({
          country,
          cases,
          todayCases,
          deaths,
          todayDeaths,
          recovered,
          todayRecovered,
          active,
          critical,
          casesPerOneMillion,
          deathsPerOneMillion,
          tests,
          testsPerOneMillion,
          population,
        }) => (
          <tr>
            <td>{country}</td>
            <td>{numeral(cases).format("0,0")}</td>
            <td className={todayCases > 0 ? "today__cases" : null}>
              {todayCases !== 0
                ? `+${numeral(todayCases).format("0,0")}`
                : null}
            </td>
            <td>{deaths !== 0 ? numeral(deaths).format("0,0") : null}</td>
            <td className={todayDeaths > 0 ? "today__deaths" : null}>
              {todayDeaths !== 0
                ? `+${numeral(todayDeaths).format("0,0")}`
                : null}
            </td>
            <td>{recovered !== 0 ? numeral(recovered).format("0,0") : null}</td>
            <td className={todayRecovered > 0 ? "today__recovered" : null}>
              {todayRecovered !== 0
                ? `+${numeral(todayRecovered).format("0,0")}`
                : null}
            </td>
            <td>{active !== 0 ? numeral(active).format("0,0") : null}</td>
            <td>{critical !== 0 ? numeral(critical).format("0,0") : null}</td>
            <td>
              {casesPerOneMillion !== 0
                ? numeral(casesPerOneMillion).format("0,0")
                : null}
            </td>
            <td>
              {deathsPerOneMillion !== 0
                ? numeral(deathsPerOneMillion).format("0,0")
                : null}
            </td>
            <td>{tests !== 0 ? numeral(tests).format("0,0") : null}</td>
            <td>
              {testsPerOneMillion !== 0
                ? numeral(testsPerOneMillion).format("0,0")
                : null}
            </td>
            <td>
              {population !== 0 ? numeral(population).format("0,0") : null}
            </td>
          </tr>
        )
      )}
    </div>
  );
}

export default Table;
