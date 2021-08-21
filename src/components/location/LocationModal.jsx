import React from 'react'

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonList,
  IonItem,
  IonIcon,
  IonNote,
} from '@ionic/react'

import { globeOutline, leafOutline } from 'ionicons/icons'
import stringManager from '../../utility/stringManager'

const categoryConfig = {
  parco: {
    icon: leafOutline,
    color: 'success',
  },
  circoscrizioni: {
    icon: globeOutline,
    color: 'blue',
  },
}

export const LocationModal = ({ loc }) => {
  //if don't have loc.properties or its attributes throw internal error text,
  // just to easily customize the app farmacie in to other apps
  if (
    (loc.properties &&
      (!('circoscriz' in loc.properties) ||
        !('residenti' in loc.properties) ||
        !('numscuole' in loc.properties) ||
        !('numfarmacie' in loc.properties))) ||
    !loc.properties
  )
    return (
      <IonContent>
        <h1>Internal Error</h1>
      </IonContent>
    )

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonTitle>
              {stringManager.titleCase(loc.properties.circoscriz)}
            </IonTitle>
            <IonIcon
              color={categoryConfig['circoscrizioni'].color}
              icon={categoryConfig['circoscrizioni'].icon}
              slot="end"
            />
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonList>
        <IonItem>
          <IonNote slot="start" color="primary">
            Residenti
          </IonNote>
          <IonLabel>
            {stringManager.titleCase(loc.properties.residenti)}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonNote slot="start" color="primary">
            N° Scuole
          </IonNote>
          <IonLabel>
            {stringManager.titleCase(loc.properties.numscuole)}
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonNote slot="start" color="primary">
            N° Farmacie
          </IonNote>
          <IonLabel>
            {stringManager.titleCase(loc.properties.numfarmacie)}
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  )
}

export default LocationModal
