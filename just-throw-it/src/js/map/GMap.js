import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import {APIKey} from "../api/APIKey";

const GMap = compose(
  withProps({

    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" + APIKey + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: props.lat, lng: props.lng }}>
      <Marker position={{ lat: props.lat, lng: props.lng }} />

  </GoogleMap>
));

export default GMap;

