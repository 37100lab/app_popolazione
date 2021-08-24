import React from 'react'

import { connect } from 'react-redux'
import { showLocationModal } from '../../redux/actions'
import stringManager from '../../utility/stringManager'

export const Location = ({ location, showLocationModal }) => {
  return (
    <div>
      <h3>Zona {stringManager.titleCase(location.properties.circoscriz)}</h3>
      <h3>{stringManager.titleCase(location.properties.residenti)} abitanti</h3>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = { showLocationModal }

export default connect(mapStateToProps, mapDispatchToProps)(Location)
