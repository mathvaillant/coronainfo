import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, {
  useState,
  useEffect
} from 'react';
import './App.scss';
import InfoBox from './components/InfoBox';
import Map from './components/Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide'); // by default it"s worldwide

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

      setCountries(countries);
    }

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
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
          <InfoBox title="Coronavirus Cases" total={3000}/>
          <InfoBox title="Recovered" total={3000}/>
          <InfoBox title="Deaths" total={3000}/> 
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>WorldWide new cases</h3>
          {/* Graph */}
        </CardContent>
        
      </Card>
    </div>
  );
}

export default App;
