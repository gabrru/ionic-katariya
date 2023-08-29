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
import { home, briefcaseSharp, cart, person, call, construct, bagAdd } from 'ionicons/icons';
import OrderPayment from './container/payment/OrderPayment';
import PublicRoutes from './routes/PublicRoutes';
import { IAuthReducers } from './redux/reducers/auhReducers';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducers';

setupIonicReact();

const App: React.FC = () => {
  const userData: IAuthReducers = useSelector(
    (state: RootState) => state.AuthReducers
  );
  return (
  <IonApp>
    <IonReactRouter>
      <Header />
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/" component={PublicRoutes} />
        </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            {userData.isLoggedIn ?
              <IonTabButton tab="library" href="/cart">
                <IonIcon icon={cart} />
                <IonLabel>Cart</IonLabel>
              </IonTabButton>
              :
              <IonTabButton tab="library" href="/contact">
                <IonIcon icon={call} />
                <IonLabel>Contact</IonLabel>
              </IonTabButton>
            }
            {userData.isLoggedIn ?
              <IonTabButton tab="search" href="/account">
                <IonIcon icon={person} />
                <IonLabel>Account</IonLabel>
              </IonTabButton>
              :
              <IonTabButton tab="search" href="/term">
                <IonIcon icon={construct} />
                <IonLabel>Term and Condition</IonLabel>
              </IonTabButton>
            }
            {userData.isLoggedIn ?
              <IonTabButton tab="order" href="/order">
                <IonIcon icon={briefcaseSharp} />
                <IonLabel>Order</IonLabel>
              </IonTabButton>
              :
              <IonTabButton tab="radio" href="/login">
                <IonIcon icon={bagAdd} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
            }

          </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
