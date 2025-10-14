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
import useApi, { SearchResult, SearchType } from '../hooks/useApi';
import { IonBackButton, IonButtons } from '@ionic/react';


const Artist: React.FC = () => {
  const { searchData } = useApi();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const [presentloading, dismissloading] = useIonLoading();  
  const type = "artist"; // Define the type for searching artists

  useEffect(() => {
    if (searchTerm === '') {
      setResults(results.Search || results.artist || results.results || []);
      return
    }
const loadData = async () => {
      await presentloading()
      const result: any = await searchData(searchTerm, type)
      console.log("~ file: Artists.tsx:31 ~ loadData ~ result:", result)
      await dismissloading()

      if (result?.Error) {
        presentAlert({
          header: "Error",
          message: result.Error,
          buttons: ["OK"],
       });
      } else {

      const list = result?.results?.artistmatches?.artist || [];

      setResults(list);
      }
};
    loadData()
  
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/Home" />
          </IonButtons>
          <IonTitle>Artists</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSearchbar placeholder="Search Artists"
        value={searchTerm} 
        debounce={300}
        onIonChange={(e) => setSearchTerm(e.detail.value!)}
        ></IonSearchbar>
        
        <IonList>
          {results.length === 0 ? (
            <IonItem>
              <div>No artists found.</div>
            </IonItem>
          ) : (
            results.map((artist, idx) => (
              <IonItem key={idx}>
                <div>{artist?.name || artist?.Name || "Unknown Artist"}</div>
              </IonItem>
            ))
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Artist;

