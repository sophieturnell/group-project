import React from 'react'
import { Link } from 'react-router-dom'
import MapGL, { Marker } from 'react-map-gl'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

import EventLogo from '../events/EventLogo'

// Map on events index page
class Map extends React.Component {
  constructor() {
    super()

    this.state = {
      latLongs: []
    }
    
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      this.setState({ latLongs: [] })
      this.latlongCalc()
    } 
  }

  componentDidMount() {
    // console.log('mounting')
    // console.log('props', this.props.events)
    this.latlongCalc()
    
  }

  latlongCalc() {
    this.props.events.map(event => {
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${event.location}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`)
        .then(res => {
          const lat = res.data.features[0].geometry.coordinates[1]
          const long = res.data.features[0].geometry.coordinates[0]
          const _id = event._id
          const category = event.category

          this.setState({ latLongs: [...this.state.latLongs, { _id, lat, long, category }] })
        })
        .catch(err => console.log(err))
    })
  }


  render() {
    // console.log('rendering')
    // console.log(this.state)
    return (
      <div>
        < MapGL
          className="event-map"
          mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
          height={'100vh'}
          width={'87.7vw'}
          // mapStyle="mapbox://styles/mapbox/light-v10"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          zoom={12}
          latitude={51.515877}
          longitude={-0.07}
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          {
            this.state.latLongs.map(point => (
              <Marker
                key={point._id}
                latitude={point.lat}
                longitude={point.long}
              >
                {/* <Link className="marker-link" to={`/events/${point._id}`}><div className="marker">🔵</div></Link> */}
                <Link className="marker-link" to={`/events/${point._id}`}><div className="marker"><EventLogo colorCategory={point.category} /></div></Link>
              </Marker>
            ))
          }
        </MapGL >
      </div>
    )
  }

}

export default Map

