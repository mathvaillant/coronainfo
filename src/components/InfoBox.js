import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import "./InfoBox.scss";

function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
      <CardContent className="infoBox__title">
        <Typography color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
        <Typography className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
