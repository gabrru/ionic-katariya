import React from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { briefcaseSharp, home, cart, person } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import About from '../pages/About';
import Home from '../pages/Home';

const Sidebar: React.FC = () => {
  return (
    <>
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="radio" href="/order">
        <IonIcon icon={briefcaseSharp} />
        <IonLabel>Order</IonLabel>
      </IonTabButton>

      <IonTabButton tab="library" href="/cart">
        <IonIcon icon={cart} />
        <IonLabel>Cart</IonLabel>
      </IonTabButton>

      <IonTabButton tab="search" href="/account">
        <IonIcon icon={person} />
        <IonLabel>Account</IonLabel>
      </IonTabButton>

    </>
  );
};

export default Sidebar;