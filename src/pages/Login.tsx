import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  useIonRouter,
  IonButton,
} from "@ionic/react";

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push("/app", "root", "replace");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color ="dark">
          <IonTitle>Your Music Your Choice</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="full" onClick={() => doLogin()}>
          Login 
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Login;