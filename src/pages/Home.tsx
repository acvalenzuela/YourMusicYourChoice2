import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Redirect, Route } from 'react-router';
import Albums from './Albums';
import Artists from './Artists';
import { albumsOutline, personOutline } from 'ionicons/icons';
import Tracks from './Tracks';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="dark">
        <IonTitle>Your Music Your Choice</IonTitle>
        <IonButtons slot="end">
          <IonButton routerLink="/" routerDirection="root">
          Logout
          </IonButton>
        </IonButtons>
      </IonToolbar>
      </IonHeader>
      
      <IonContent>

      <IonTabs>
        <IonRouterOutlet>
          <Route exact path='/app/Albums' component={Albums} />
          <Route exact path='/app/Albums/Tracks' component={Tracks} />
          <Route exact path='/app/Artists' component={Artists} />
          <Route exact path="/app/"> 
            <Redirect to="/app/Home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="Albums" href="/app/Albums">
            <IonIcon icon={albumsOutline} />
            <IonLabel>Albums</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Artists" href="/app/Artists">
            <IonIcon icon={personOutline} />
            <IonLabel>Artists</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      </IonContent>
    </IonPage>
  );
};


export default Home;

