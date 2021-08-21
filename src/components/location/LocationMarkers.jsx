import React from 'react'
import { Popup, Polygon } from 'react-leaflet'
import Location from './Location'
import { connect } from 'react-redux'
import { showLocationModal } from '../../redux/actions'

export const LocationList = ({ myloc, locations, showLocationModal }) => {
  return (
    <div>
      {myloc &&
        myloc.length &&
        myloc.map(loc => (
          <Polygon
            key={loc.id}
            positions={loc.geometry.coordinates[0]}
            color={scegliColore(loc)}
          >
            <Popup>
              <Location location={loc} />
            </Popup>
          </Polygon>
        ))}
    </div>
  )
}

function scegliColore(locColor) {
  var min = 15000
  var max = 60000
  var x = parseInt(locColor.properties.residenti)
  var color = 255 - ((x - min) / (max - min)) * 150
  return 'rgb(0,' + parseInt(color).toString() + ',0)'
}
const mapStateToProps = state => ({
  //locations: Object.values(state.location),
})

const mapDispatchToProps = { showLocationModal }

export default connect(mapStateToProps, mapDispatchToProps)(LocationList)
