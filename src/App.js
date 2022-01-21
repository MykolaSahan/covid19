import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";

import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Table from "./components/Table";
import { pettyPrintStat, sortData } from "./utils/utils";
import numeral from 'numeral';
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(3);

  const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country, // United States
          value: country.countryInfo.iso2, // USA
        }));

        let sortedData = sortData(data);
        setCountries(countries);
        setMapCountries(data);
        setTableData(sortedData);
      });
  };

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        // All of the data from the country response
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  const getAllCountries = async () => {
    await fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }

  useEffect(() => {
    getAllCountries();
    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        {/* Title + Select input dropdown field */}
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <h2>Updated: {  }</h2>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* Loop thought all the countries and show a drop down */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* InfoBoxs */}
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === 'cases'}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={pettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format('0,0')}
          />

          <InfoBox
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={pettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format('0,0')}
          />

          <InfoBox
            isRed
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={pettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format('0,0')}
          />
        </div>

        {/* Map */}
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent className="app__right--border" >
          {/* Table */}
          <h3 className="app__graphTitle" style={{ marginTop: "1rem" }}>Wordwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
          <h3 style={{ marginTop: '20px' }}>Live Cases by Country</h3>
          <Table countries={tableData} />
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
