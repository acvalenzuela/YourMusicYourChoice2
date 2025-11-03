import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

const Tracks: React.FC = () => {
  const { getArtistTopTracks } = useApi();
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [artistName, setArtistName] = useState<string>("");
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    // Get artist name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const artist = urlParams.get('artist');
    if (artist) {
      setArtistName(artist);
      loadTracks(artist);
    }
  }, []);

  const loadTracks = async (artist: string) => {
    setLoading(true);
    try {
      const result = await getArtistTopTracks(artist);
      if (result?.toptracks?.track) {
        const trackList = Array.isArray(result.toptracks.track) 
          ? result.toptracks.track 
          : [result.toptracks.track];
        setTracks(trackList);
      } else {
        setTracks([]);
      }
    } catch (error) {
      presentAlert({
        header: "Error",
        message: "Failed to load tracks. Please try again.",
        buttons: ["OK"]
      });
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/Artists" />
          </IonButtons>

          <IonTitle>{artistName ? `${artistName} - Tracks` : 'Tracks'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Loading tracks...
          </div>
        ) : (
          <div style={{ padding: '10px' }}>
            {tracks.length === 0 ? (
              <div>No tracks found for {artistName}</div>
            ) : (
              tracks.map((track, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    padding: '12px', 
                    borderBottom: '1px solid #eee',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '4px',
                    marginBottom: '4px'
                  }}
                >
                  <strong>{track?.name || "Unknown Track"}</strong>
                  {track?.artist && (
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      by {track.artist.name}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Tracks;