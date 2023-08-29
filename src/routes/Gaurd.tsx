import React, {FC, ComponentType } from 'react'
import { IAuthReducers } from '../redux/reducers/auhReducers';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { Redirect, Route, RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { AFTER_LOGIN_ROUTE, BEFORE_LOGIN_ROUTE, ROUTES } from '../constant/routes';


interface Props extends RouteComponentProps{
    path : string;
    component: ComponentType<any>
}

const Gaurd: FC<Props> = (props) => {
    const userData: IAuthReducers = useSelector(
        (state: RootState) => state.AuthReducers
    );
    const history = useHistory()
    const user_type = userData.authData.account_type;
    const {location} = props;
    const route = location.pathname;
    let returnData;
    const logged = userData.isLoggedIn;
    const loginPage = (
        <Redirect exact path="/login" to="/login" />
    );
    const homePage = (
        <Redirect exact  to="/home" />
    );

    if (BEFORE_LOGIN_ROUTE.includes(route)){
        if(userData.authData && logged){
            returnData = homePage;
        } else {
            
            returnData = <Route {...props} />
        }
    } else if (AFTER_LOGIN_ROUTE.includes(route)){
        if (logged){
        returnData = <Route {...props} />;
        }
        else{
            returnData = homePage
        }
    }else{
        returnData = <Route {...props} />
            }

  return (
    returnData
  )
}

export default withRouter(Gaurd)