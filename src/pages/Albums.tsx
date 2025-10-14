import {
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonSearchbar, 
  IonItem, 
  IonList, 
  useIonAlert, 
  useIonLoading, 
} from "@ionic/react";
import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { IonBackButton, IonButtons, IonButton } from '@ionic/react';


const Albums: React.FC = () => {
  const { getAlbum } = useApi();

  const [presentAlert] = useIonAlert();
  const [present, dismiss] = useIonLoading();

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchAlbum = async () => {
      await present({
        message: 'Loading album details...',
        duration: 5000,
      });
    };

  }, [present]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/Home" />
          </IonButtons>
          <IonTitle>Albums</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton routerLink="/app/Albums/Tracks" expand="full">
          Go to Tracks
        </IonButton>
        <IonSearchbar placeholder="Search Albums"
        value={searchTerm} 
        debounce={300}
        onIonChange={(e) => setSearchTerm(e.detail.value!)}
        ></IonSearchbar>
        <IonList>
          <IonItem />
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Albums;