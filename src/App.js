import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, {
  useState,
  useEffect
} from 'react';
import './App.scss';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide'); // by default it"s worldwide

  // Covid-19 data -> https://disease.sh/v3/covid-19/countries

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
    <div className="App">
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

      {/* Header */}
      {/* Title + Select input field dropdown country */}

      {/* InfoBox */}
      {/* InfoBox */}
      {/* InfoBox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
