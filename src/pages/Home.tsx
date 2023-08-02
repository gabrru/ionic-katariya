import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from '@ionic/react';
import Index from '../components/Index';
import Index2 from '../components/index2';
// import './Home.css';

const Home: React.FC = () => {
  return (
    <>
      <IonContent fullscreen={true} className="ion-padding">
      <div className="constainer" >
        <div className="pt-5 p-1" >
          {/* <Index /> */}
          <Index2 />
        </div>
      </div>
      </IonContent>
    </>
  );
};

export default Home;
