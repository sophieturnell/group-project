import React from 'react'
import { Link } from 'react-router-dom'
import MapGL, { Marker } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'


// Map in event show page
class MapShow extends React.Component {
  constructor() {
    super()

    this.state = {
      lat: null,
      long: '',
      viewport: null
    }
    
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.event !== this.props.event) {
      this.latlongCalc()
    } 
  }

  componentDidMount() {
    // console.log('mounting')
    console.log('props', this.props.event)
    this.latlongCalc()
    
  }

  latlongCalc() {
    console.log('map', event.location)

    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.event.location}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`)
      .then(res => {
        const lat = res.data.features[0].geometry.coordinates[1]
        const long = res.data.features[0].geometry.coordinates[0]

        this.setState({ lat, long })
      })
      .catch(err => console.log(err))
  }

  render() {
    // console.log('rendering')
    // console.log(this.state)
    if (!this.state.lat) return null
    return (
      <div className="map">
        < MapGL
          className="event-map"
          mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
          height={'200px'}
          width={'200px'}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          zoom={11}
          latitude={this.state.lat}
          longitude={this.state.long}
        >
          <Marker
            latitude={this.state.lat}
            longitude={this.state.long}
          >
            <div className="marker">🔵</div>
          </Marker>
        </MapGL >
      </div>
    )
  }

}

export default MapShow

