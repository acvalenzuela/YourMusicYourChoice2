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
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from 'react';
import useApi, { SearchResult, SearchType } from '../hooks/useApi';
import { IonBackButton, IonButtons } from '@ionic/react';


const Artist: React.FC = () => {
  const { searchData } = useApi();
  const router = useIonRouter();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const type = SearchType.artist; // Define the type for searching artists


  useEffect(() => {
    if (searchTerm === '') {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const loadData = async () => {
        try {
          const result: any = await searchData(searchTerm, type);
          
          if (result?.Error) {
            presentAlert({
              header: "Error",
              message: result.Error,
              buttons: ["OK"],
            });
            setResults([]);
          } else if (result?.results?.artistmatches?.artist) {
            const list = Array.isArray(result.results.artistmatches.artist) 
              ? result.results.artistmatches.artist 
              : [result.results.artistmatches.artist];
            setResults(list);
          } else {
            setResults([]);
          }
        } catch (error) {
          presentAlert({
            header: "Error",
            message: "Failed to search artists. Please try again.",
            buttons: ["OK"],
          });
          setResults([]);
        }
      };

      loadData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

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
        <input 
          type="text"
          placeholder="Search Artists"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            margin: '8px 0'
          }}
        />
        
        
        
        <div style={{ padding: '10px' }}>
          {results.length === 0 ? (
            <div>No artists found. Try searching for "beatles" or "radiohead"</div>
          ) : (
            results.map((artist, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                  marginBottom: '4px'
                }}
                onClick={() => {
                  // Navigate to tracks page with artist name
                  const artistName = artist?.name || "Unknown Artist";
                  router.push(`/app/Tracks?artist=${encodeURIComponent(artistName)}`);
                }}
              >
                <strong>{artist?.name || "Unknown Artist"}</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  Click to view tracks
                </div>
              </div>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Artist;

