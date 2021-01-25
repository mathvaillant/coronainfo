import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    multiplier: 200,
    option: { color:"#fe0639", fillColor: "#fe0639" },
  },
  recovered: {
    multiplier: 300,
    option: { color:"#26a243", fillColor: "#26a243" },
  },
  deaths: {
    multiplier: 1200,
    option: { color:" #6b747c", fillColor: " #6b747c" }
  },
};
 

export const sortData = (data) => { 
  /* Copy it out into an array */
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

};

export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0"; 

// DRAW CIRCLES ON THE MAP 
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={casesTypeColors[casesType].option}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));