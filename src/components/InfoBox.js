import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import "./InfoBox.scss";

function InfoBox({ title, cases, isRed, isGray, isGreen, active, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${isGray && "infoBox--grey"}`}>
      <CardContent>
        <h1 className={`infoBox__title ${isRed && "infoBox--red"} ${isGray && "infoBox--grey"} ${isGreen && "infoBox__cases--green"}`}>{title}</h1>
        <h1 className={`infoBox__cases ${isRed && "infoBox--red"} ${isGray && "infoBox--grey"} ${isGreen && "infoBox__cases--green"}`}>{cases}</h1>
        <span className="infoBox__total">
          {total} Total
        </span>
      </CardContent>
    </Card>
  )
}

export default InfoBox
