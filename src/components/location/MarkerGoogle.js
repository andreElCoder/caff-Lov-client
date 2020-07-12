import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
require('dotenv').config()



class MarkerGoogle extends Component {
  state={
    containerStyle : {
    width: '400px',
    height: '400px'
  },

    center : {
      lat: -3.745,
      lng: -38.523
    },
    locations:[],
    position : {
      lat: 37.772,
      lng: -122.214
    }
  }
  onLoad = (marker) => {
    console.log('marker: ', marker)
  }
  render() {
    return (
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
      >
        <GoogleMap
          mapContainerStyle={this.state.containerStyle}
          center={this.state.center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <Marker
            position={this.state.position}
          />
          
        </GoogleMap>
      </LoadScript>
    )
  }
}
export default MarkerGoogle