import React, { Component } from "react";
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Map.css';
 
export class MapContainer extends Component {
  render() {
    const mapStyles = {
        width: '40%',
        height: '40%',
      };
    return (
        <div className='map' >
            <Map google={this.props.google} 
                 zoom={10}
                 style={mapStyles}
                 >
        
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
        
                {/* <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow> */}
            </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBHdqGP9ct6h2F5z6QaCdnp_4IQXSxxjxA')
})(MapContainer)