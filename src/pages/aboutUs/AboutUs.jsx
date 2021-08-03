import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonImg,
    IonToolbar,
  } from '@ionic/react'
  import React from 'react'
  import logo from '../../assets/img/lab37100.jpg'
  
  const AboutUs = (props) => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>37100 LAB</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h1>APP sviluppata da 37100 LAB</h1>
          <IonImg src={logo} height='100px' width='100px'/>
          <p>www 37100lab comune verona it</p>
          <p>seguici sui social facebook instagram linkedin youtube</p>
        </IonContent>
      </IonPage>
    )
  }
  
  export default AboutUs
  