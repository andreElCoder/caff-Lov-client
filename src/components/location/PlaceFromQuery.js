import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

require('dotenv').config()
const containerStyle = {
  width: '800px',
  height: '400px'
};
 console.log({key : process.env.REACT_APP_GOOGLE_KEY})
const center = {
  lat: -3.745,
  lng: -3.523
};
 
function MyComponent() {
  
  const [map, setMap] = React.useState(null)
 
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
 
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(MyComponent)