import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from "redux-thunk";
import logger from "redux-logger";
import ActionType from "../../resources/enums";
 
import {AuthReducers} from './auhReducers'
 
export interface IUpdateStatus {
  isUpdated: boolean;
}
export interface IData {
  data: IUpdateStatus;
}

export interface IActionType {
  type: ActionType;
  payload: IData;
}
const appReducers = combineReducers({
  AuthReducers,
  //   ChatReducer,
});

let rootReducers = null;
rootReducers = (state: any, action: IActionType) => {
  let tep = state;
  if (action.type === ActionType.LOGOUT) {
    tep = undefined;
  }
  return appReducers(tep, action);
};
const store = createStore(rootReducers, applyMiddleware(thunk, logger));

export default store;

export type RootState = ReturnType<typeof rootReducers>;
