import React, { Component} from 'react';
import { GoogleMap, LoadScript , Marker, InfoWindow} from '@react-google-maps/api';
import GoogleSuggest from './GoogleSuggest'
import mapStyles from "../../mapStyles"

require('dotenv').config()

const containerStyle = {
  width: '800px',
  height: '400px'
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl : true
}
const libraries=["places"]

/*                icon={{
                  url: "/coffee.svg",
                  scaledSize: new window.google.maps.Size(30,30),
                  origin: new window.google.maps.Point(0,0),
                  anchor: new window.google.maps.Point(15,15)
                }}
<div>Icons used as Markers, made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
*/

class Map extends Component{

  state={
  markers  : this.props.markers,
  selected : null,
  center :   {lat: -3.745,lng: -38.523},
  name : "",
  editable: this.props.editable
  }
  componentDidMount(){
    
    this.setState({
      markers : this.props.markers
    })
    console.log(this.state)
  }
  
  insertMarker = (event) =>{
    if(this.state.markers && this.state.editable){
      this.setState({
        markers :  [...this.state.markers,{
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }]
      })
    } else{
      if(this.state.editable){
        this.setState({
          markers: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }
        })
      }
    }
    if(this.state.editable) this.props.liftUpMarkers(this.state.markers)
  }

  selectMarker = (marker) =>{
      if(!this.state.editable){
      this.setState({
        selected: marker
      })
    } else{
        const markersCopy = this.state.markers
        let index = markersCopy
                    .findIndex(markerElementArray => 
                      {return markerElementArray.lat ===marker.lat && markerElementArray.lng===marker.lng})

        markersCopy.splice(index,1)
        this.setState({
          markers: markersCopy
        })
    }
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

    console.log(this.props)
    console.log(this.state)
    return (
      <div>
        <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
        libraries={libraries}
        onLoad={console.log("I have loaded")}
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

    {this.state.editable && <GoogleSuggest addMarkerFromSearch={this.addMarkerFromSearch}>

    </GoogleSuggest>}
          <></>
        </GoogleMap>
        
        </LoadScript>
      </div>
    )
  }
}
export default Map