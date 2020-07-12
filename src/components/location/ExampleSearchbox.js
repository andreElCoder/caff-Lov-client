import React, { Component, useDebugValue } from 'react';
import { GoogleMap, LoadScript , useLoadScript, Marker} from '@react-google-maps/api';
import mapStyles from "../../mapStyles"
require('dotenv').config()

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl : true
}
const libraries=["places"]

class ExampleSearchBox extends Component{

  state={
  markers : []
  }
  
  insertMarker = (event) =>{
    if(this.state.markers){
      this.setState({
        markers :  [...this.state.markers,{
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }]
      })
    } else{
      this.setState({
        markers: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      })
    }
  }

  render(){
    return (
      <div>
        <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
        libraries={libraries}
        >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={options}
          onClick={this.insertMarker}
        >

          { /* Child components, such as markers, info windows, etc. */ }
          {this.state.markers ? this.state.markers.map((marker,i) => {
            return(
               <Marker
                key={i}
                position={{lat:marker.lat, lng: marker.lng}}
               />
               )
          }
            
          )
          :null}
          <></>
        </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}
export default ExampleSearchBox