import React, { useState, useEffect } from 'react';
import numeral from "numeral";
import "./Vaccine.scss";
import Syringe from "../syringe.png";

/* https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1 */

function Vaccine() {
  const [vaccineData, setVaccineData] = useState();
  console.log(vaccineData)

  useEffect(() => {
    const getVaccineData = async () => {
      await fetch("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1")
      .then(response => response.json())
      .then((data) => {
        const vaccinesTotal = (Object.entries(data)[0])
        setVaccineData(vaccinesTotal);
      })
    };

    getVaccineData();
  }, []);
  
  return (
    <div className="vaccine">
      {vaccineData?.length > 0 && (
        <div className="vaccine__data">
          
          <span>
            <img src={Syringe} alt="syringe"/>
              {numeral(vaccineData[1]).format("")} 
              {" "}
              vaccine doses administered worldwide
          </span>

          <small>
            Last Update {vaccineData[0]}
          </small> 
        </div>
      )}
    </div>
  )
}

export default Vaccine;
