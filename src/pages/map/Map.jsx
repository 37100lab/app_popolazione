import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
  IonFooter,
  IonImg,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
  //LayersControl,
} from 'react-leaflet'

import {dismissLocationModal} from '../../redux/actions'
import classes from './Map.module.css'

import LocationMarkers from '../../components/location/LocationMarkers'
import LocationModal from '../../components/location/LocationModal'

import { Geolocation } from '@capacitor/geolocation'
//import circoscrizioni from '../../data/circoscrizioni.json'
//import quartieri from '../../data/quartieri.json'

import sponsor from '../../assets/img/sponsor.jpg'
import { locateSharp } from 'ionicons/icons'

const url='http://3.142.202.105:7484'

export class Map extends Component {
  
  state = {
    mapContainer: false,
    //farmacie:{},
    //quartieri:{},
    circoscrizioni: {},
    center:[45.438351, 10.99171],
    mapCont:null,
  }

  async componentDidMount() {

    const res = await Geolocation.getCurrentPosition()
    this.center=[res.coords.latitude, res.coords.longitude]
    this.GetPopolazionePerCircoscrizione()
    if (this.state.mapContainer) return

    setTimeout(() => {
      this.setState({ mapContainer: true })
    }, 500)
  }

  /*GetCircoscrizioni(){
    fetch(url+'/get/popolazioneResidentePerCircoscrizione', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({circoscrizioni : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }*/

  GetPopolazionePerCircoscrizione(){
    fetch(url+'/get/popolazioneResidentePerCircoscrizione', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      var appoggio = 0
      for (let j=0; j<data.features.length; j++){
        for (let i = 0; i<data.features[j].geometry.coordinates[0][0].length; i++){
          appoggio = data.features[j].geometry.coordinates[0][0][i][1]
          data.features[j].geometry.coordinates[0][0][i][1] = data.features[j].geometry.coordinates[0][0][i][0]
          data.features[j].geometry.coordinates[0][0][i][0] = appoggio
        }
    }
      this.setState({circoscrizioni : data})
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  //ON EACH METHODS
  /*OnEachFarmacia = (farmacia, layer) =>{
    layer.bindPopup(farmacia.properties.denominazi)
  }

  OnEachQuartiere = (quartiere, layer) =>{
    layer.bindPopup(stringManager.titleCase(quartiere.properties.quartiere))
  }

  OnEachCircoscrizione = (paese, layer) =>{
    layer.bindPopup(stringManager.titleCase(paese.properties.circoscriz))
  }*/

  render() {
    const { zoom, locationClicked, showModal } = this.props.map

  const centerPosition = () => {
    this.state.mapCont.flyTo(this.center)
  }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Residenti a Verona</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="content" fullscreen>


          <IonModal isOpen={showModal} backdropDismiss={false}>   
            { locationClicked && ( <LocationModal loc={locationClicked}/> )}
            <IonButton onClick={() => this.props.dismissLocationModal()}>
              Chiudi
            </IonButton>
          </IonModal>

          {this.state.mapContainer && (
            <MapContainer
              className={classes.mapContainer}
              center={this.center}
              zoom={zoom}
              whenCreated={mapCont => this.setState({ mapCont })}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapConsumer>
                {map => {
                  map.setView(this.center)
                  return null
                }}
              </MapConsumer>
              <Marker position={this.center}>
                <Popup>Tu sei qui</Popup>
              </Marker>
              <LocationMarkers myloc={this.state.circoscrizioni.features}/>
            </MapContainer>
          )}

          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => centerPosition()}>
              <IonIcon icon={locateSharp} />
            </IonFabButton>
          </IonFab>
        </IonContent>

        <IonFooter>
            <IonImg src={sponsor} style={{maxWidth: "500px" , margin: "auto"}}/>
        </IonFooter>
      </IonPage>
    )
  }
}
const mapStateToProps = state => ({
  map: state.map,
})

const mapDispatchToProps = {dismissLocationModal}

export default connect(mapStateToProps, mapDispatchToProps)(Map)