import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import "./InfoBox.scss";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent className="infoBox__title">
        {/* title */}
        <Typography color="textSecondary">
          {title}
        </Typography>

        {/* Number of cases */}
        <h2 className="infoBox__cases">{cases}</h2>

        {/* Total */}
        <Typography className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox
