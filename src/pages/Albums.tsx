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
} from "@ionic/react";
import React, { useEffect, useState } from 'react';
import useApi, { SearchResult, SearchType } from '../hooks/useApi';
import { IonBackButton, IonButtons, IonButton } from '@ionic/react';


const Albums: React.FC = () => {
  const { searchData } = useApi();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const type = SearchType.album; // Define the type for searching albums

  useEffect(() => {
    if (searchTerm === '') {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const loadData = async () => {
        try {
          const result: any = await searchData(searchTerm, type);
          console.log("~ file: Albums.tsx ~ loadData ~ result:", result);
          
          if (result?.Error) {
            presentAlert({
              header: "Error",
              message: result.Error,
              buttons: ["OK"],
            });
            setResults([]);
          } else if (result?.results?.albummatches?.album) {
            const list = Array.isArray(result.results.albummatches.album) 
              ? result.results.albummatches.album 
              : [result.results.albummatches.album];
            setResults(list);
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error('Search error:', error);
          presentAlert({
            header: "Error",
            message: "Failed to search albums. Please try again.",
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
          <IonTitle>Albums</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent>
        <input 
          type="text"
          placeholder="Search Albums"
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
            <div>No albums found. Try searching for "abbey road" or "dark side"</div>
          ) : (
            results.map((album, idx) => (
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
                  // For now, just show an alert with the album name
                  // Later we can navigate to a tracks page
                  presentAlert({
                    header: "Album Selected",
                    message: `You selected: ${album?.name || "Unknown Album"}`,
                    buttons: ["OK"]
                  });
                }}
              >
                <strong>{album?.name || "Unknown Album"}</strong>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  Click to view tracks
                </div>
              </div>
            ))
          )}
        </div>
        
        <IonButton routerLink="/app/Albums/Tracks" expand="full">
          Go to Tracks
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Albums;