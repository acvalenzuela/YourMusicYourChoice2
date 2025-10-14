import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";

const Tracks: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/Albums" />
          </IonButtons>

          <IonTitle>Tracks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding"></IonContent>
    </IonPage>
  );
}

export default Tracks;