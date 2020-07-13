import React, { Component, useDebugValue } from 'react';
import { GoogleMap, LoadScript , StandaloneSearchBox, Marker, InfoWindow} from '@react-google-maps/api';
import GoogleSuggest from './GoogleSuggest'
import mapStyles from "../../mapStyles"

require('dotenv').config()

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {

};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl : true
}
const libraries=["places"]


class Map extends Component{

  state={
  markers  : [],
  selected : null,
  center :   {lat: -3.745,lng: -38.523},
  name : ""
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

  selectMarker = (marker) =>{

      this.setState({
        selected: marker
      })
    
  }
  unSelectMarker = () =>{

    this.setState({
      selected: null
    })
  
}
addMarkerFromSearch = (marker) =>{
  if(this.state.markers){
    this.setState({
      markers :  [...this.state.markers,marker],
      center : marker,
      name : this.props.coffeeName
    })
    } 
    else{
      this.setState({
        markers: marker,
        name : this.props.coffeeName
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
          center={this.state.center}
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
                icon={{
                  url: "/coffee.svg",
                  scaledSize: new window.google.maps.Size(30,30),
                  origin: new window.google.maps.Point(0,0),
                  anchor: new window.google.maps.Point(15,15)
                }}
                onClick={() => this.selectMarker(marker)}
                
               />
               )
          })
          :null}
          {this.state.selected ?     
          <InfoWindow
            position={this.state.selected}
            onCloseClick={this.unSelectMarker}
          >
          <div>
        <h1>{this.state.name}</h1>
      </div>
    </InfoWindow>:null}

    <GoogleSuggest addMarkerFromSearch={this.addMarkerFromSearch}>

    </GoogleSuggest>
          <></>
        </GoogleMap>
        <div>Icons used as Markers, made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </LoadScript>
      </div>
    )
  }
}
export default Map