import React from 'react';
import "./Map.scss";
import { MapContainer as LeafletMap,TileLayer,useMap } from "react-leaflet";

function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ countries, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap>
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
      </LeafletMap>
    </div>
  )
}

export default Map
