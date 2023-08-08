import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
// import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import About from './pages/About';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import "./style/global.css"
import Home from './pages/Home';
import LoginPage from './pages/userAuth/LoginPage';
import ProductDetails from './container/productDetails/ProductDetails';
import BuyNow from './container/buyNow/BuyNow';
import { home, briefcaseSharp, cart, person } from 'ionicons/icons';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <Header />
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/header" exact component={Header} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/product-details" exact component={ProductDetails} />
          <Route path="/buy-now" exact component={BuyNow} />
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
  </IonApp>
);

export default App;
