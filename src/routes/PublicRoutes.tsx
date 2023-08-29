import React, { FC, lazy } from 'react'
import { IonPage, IonRouterOutlet, IonTabs } from "@ionic/react";
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";
import { IonReactRouter } from '@ionic/react-router';



import Header from '../components/Header';
import { IAuthReducers } from '../redux/reducers/auhReducers';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import Cart from '../container/cart/Cart';
import {ROUTES} from '../constant/routes';
import { login } from '../services/auth';
import LoginPage from '../pages/userAuth/LoginPage';
import Error from '../pages/Error';
import { ACCOUNT_TYPE } from '../constant/routes';
import Gaurd from './Gaurd';
import Home from '../pages/Home';
import ProductDetails from '../container/productDetails/ProductDetails';
import BuyNow from '../container/buyNow/BuyNow';
import OrderPage from '../container/order/OrderPage';
import About from '../pages/About';
import Signup from '../pages/userAuth/Signup';
import OrderPayment from '../container/payment/OrderPayment';
import Sidebar from '../components/Sidebar';


interface Props {
    component: React.ComponentType<any>;
    routeProps: RouteComponentProps;
    path: string;
}

export const WithHeader: FC<Props> = ({ path, component, routeProps }) => {
    const userData: IAuthReducers = useSelector(
        (state: RootState) => state.AuthReducers
    );

    const acc_type = userData?.authData?.account_type
    return (
        <>
        <div>
            <Gaurd {...{ path, component, ...routeProps }} />
        </div>
            
        </>
    );

}

const PublicRoutes: FC<RouteComponentProps> = (props) => {
    const userData: IAuthReducers = useSelector(
        (state: RootState) => state.AuthReducers
    );

    const acc_type = userData?.authData?.account_type;
    return (
        <>
            <IonPage>
                <Switch>
                    <WithHeader path={ROUTES.LOGIN} component={LoginPage} routeProps={props} />
                
                    <WithHeader path={ROUTES.HOME} component={Home} routeProps={props} />
                
                    <WithHeader path={ROUTES.PRODUCT_DETAILS} component={ProductDetails} routeProps={props} />
                
                    <WithHeader path={ROUTES.BUY_NOW} component={BuyNow} routeProps={props} />
                
                    <WithHeader path={ROUTES.ORDER} component={OrderPage} routeProps={props} />
                
                    <WithHeader path={ROUTES.ADD_TO_CART} component={Cart} routeProps={props} />
                
                    <WithHeader path={ROUTES.ABOUT} component={About} routeProps={props} />
                    <WithHeader path={ROUTES.PAYMENT} component={OrderPayment} routeProps={props} />
                
                    <WithHeader path={ROUTES.SIGN_UP} component={Signup} routeProps={props} />
                </Switch>
                <Sidebar />
            </IonPage>

        </>
    )
}


export default PublicRoutes;