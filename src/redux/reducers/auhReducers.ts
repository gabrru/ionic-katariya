import ActionType from "../../resources/enums";
import {IUserInterface} from "../../interfaces/userInterface"
import storage from "../../utils/storage"


export interface IAuthReducers{
    isLoggedIn : boolean,
    authData : IUserInterface,
    isRegistered : string,
    isUpdated : boolean
}
export interface IUpdateStatus {
  isUpdated: boolean;
}
export interface IData {
  data: IUpdateStatus;
}

export interface IActionType{
    type : ActionType;
    payload : IData
}

const initaialState : IAuthReducers = {
    isRegistered: "",
  isLoggedIn: (storage.get("authData") as string) ? true : false,
  authData: (storage.get("authData") as string)
    ? JSON.parse(storage.get("authData") as string)
    : {},
  isUpdated: false,
}

export const AuthReducers = (state = initaialState, action : IActionType)=>{
    switch(action.type){
        case ActionType.LOGIN:
            return{
                ...state,
                isLoggedIn : true,
                authData : {...state.authData, ...action?.payload?.data},
            };
        case ActionType.LOGOUT :
            return {
                ...state,
                isLoggedIn : false,
                authData : {},
                isUpdated : false
            }
        default:
      return state;
    }
}



