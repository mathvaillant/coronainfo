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
import { sortData } from './components/util';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide'); // by default it"s worldwide
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

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


  /* get data when user selects a country */
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    /* Turnary operator to check if user selected worldwide or a specific country */
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    /* Then fetch the url -> worldwide or the country selected */
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
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
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem
                  value={country.value}
                >
                  {country.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/> 
        </div>

        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>WorldWide new cases</h3>
          <LineGraph />
        </CardContent>
        
      </Card>
    </div>
  );
}

export default App;
