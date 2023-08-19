import React from 'react';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { briefcaseSharp, home, cart, person, bagAdd, call, construct } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import About from '../pages/About';
import Home from '../pages/Home';
import Header from './Header';
import { IAuthReducers } from '../redux/reducers/auhReducers';
import LoginPage from '../pages/userAuth/LoginPage';
import OrderPayment from '../container/payment/OrderPayment';
import ProductDetails from '../container/productDetails/ProductDetails';
import BuyNow from '../container/buyNow/BuyNow';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

const Sidebar: React.FC = () => {

  const userData: IAuthReducers = useSelector(
    (state: RootState) => state.AuthReducers
  );
  console.log("userData>>>>>>>>>>>", userData)

  return (
    <>
      <IonReactRouter>
        <Header />
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/header" exact component={Header} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/order-payment" exact component={OrderPayment} />
            <Route path="/product-details" exact component={ProductDetails} />
            <Route path="/buy-now" exact component={BuyNow} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            {userData?.isLoggedIn ? (
              <>
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
            )
              : (
                <>
                  <IonTabButton tab="radio" href="/order">
                    <IonIcon icon={bagAdd} />
                    <IonLabel>Login</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="library" href="/cart">
                    <IonIcon icon={call} />
                    <IonLabel>Contact</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="search" href="/account">
                    <IonIcon icon={construct} />
                    <IonLabel>Term and Condition</IonLabel>
                  </IonTabButton>
                </>
              )
            }

          </IonTabBar>
        </IonTabs>
      </IonReactRouter>

    </>
  );
};

export default Sidebar;