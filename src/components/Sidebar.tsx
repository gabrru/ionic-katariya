import React from 'react';
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import {briefcaseSharp, home, cart, person } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import About from '../pages/About';
import Home from '../pages/Home';

const Sidebar: React.FC = () => {
  return (
    <>
      <div>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/" to="/home" />
              {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
              <Route path="/home" render={() => <Home />} exact={true} />
              <Route path="/radio" render={() => <Home />} exact={true} />
              <Route path="/about" render={() => <About />} exact={true} />
              <Route path="/search" render={() => <Home />} exact={true} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
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
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </div>
    </>
  );
};

export default Sidebar;