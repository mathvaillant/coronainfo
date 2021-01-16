import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, {
  useState,
  useEffect
} from 'react';
import './App.scss';

function App() {
  const [countries, setCountries] = useState(['USA', 'UK', 'BRAZIL']);
  const [country, setCountry] = useState('');

  // Covid-19 data -> https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    const getCountriesData = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await response.json();
      const countries = data.map((country) => (
        // Each country will be an object
        {
          name: country.country, // United States, Spain, France
          value: country.countryInfo.iso2 // USA, ES, FR
        }
      )
      )
    }

    getCountriesData();
  }, []);

  return (
    <div className="App">
      <div className="app__header">
        <h1>CoronaInfo</h1>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
            value=''
          >

            {countries.map((country) => (
              <MenuItem
                country={country}
              >
                {country}
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
