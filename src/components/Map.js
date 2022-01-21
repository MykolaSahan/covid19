import React from "react";
import { Map as MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import numeral from 'numeral';

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 120,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 120,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Loop throught countries and draw circles on the screen */}
        {countries.map((country) => (
          <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
              Math.sqrt(country[casesType]) *
              casesTypeColors[casesType].multiplier
            }
          >
            <Popup>
              <div className="info__container">
                <div className="info__flag">
                  <img src={country.countryInfo.flag} alt={country.country} />
                </div>
                <div className="info__name">{country.country}</div>
                <div className="info__confirmed">
                  Cases: {numeral(country.cases).format("0,0")}
                </div>
                <div className="info__recovered">
                  Recovered: {numeral(country.recovered).format("0,0")}
                </div>
                <div className="info__deaths">
                  Deaths: {numeral(country.deaths).format("0,0")}
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
