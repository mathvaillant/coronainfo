import { FormControl, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="app__header">
        <h1>Covid-19 Info</h1>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
            value=''
          >
            <MenuItem value='worldwide'>Worldwide</MenuItem>
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
