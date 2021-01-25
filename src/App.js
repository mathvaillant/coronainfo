import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, {
  useState,
  useEffect
} from 'react';
import './App.scss';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import { prettyPrintStat, sortData } from './components/util';
import "leaflet/dist/leaflet.css";

function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  /* when the page loads the first time, call the API and use worldwide info */
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, []);


  /* get data from all countries and turn it into an array of objects */
  useEffect(() => {
    const getCountriesData = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await response.json();
      const countries = data.map((country) => (
        // Each country will be an object
        {
          name: country.country, // United States, Spain, France
          value: country.countryInfo.iso2 // USA, ES
        }
      ))
      
      const sortedData = sortData(data);
      setTableData(sortedData)
      setCountries(countries);
      setMapCountries(data);
    }

    getCountriesData();
  }, []);

  console.log(casesType);

  /* get data when user selects a country */
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    /* Turnary operator to check if user selected worldwide or a specific country */
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    /* Then fetch the url -> worldwide or the country selected */
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setInputCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>CoronaInfo</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
              style={{border: "none", color:"#636B75"}}
            >
              <MenuItem value="worldwide" style={{backgroundColor: "#161625", color:"#636B75", border: "none"}}>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem
                  style={{backgroundColor: "#161625", color:"#636B75"}}
                  value={country.value}
                >
                  {country.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"} 
            onClick={(e) => setCasesType("cases")}
            title="Cases" 
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            isGreen
            active={casesType === "recovered"} 
            onClick={(e) => setCasesType("recovered")}
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isGray
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")} 
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)}
          /> 
        </div>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />

      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__right__graphTitle">WorldWide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
        
      </Card>
    </div>
  );
}

export default App;
