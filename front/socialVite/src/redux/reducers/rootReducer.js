import { combineReducers } from 'redux';
import {changeDescriptionReducer, 
    changeNameReducer, changePhotoReducer,
    loginReducer, 
    registrationReducer, 
    setPhotoReducer} from './userReducer';

const rootReducer = combineReducers({
    user: loginReducer,
    registrationUser: registrationReducer,
    changeName: changeNameReducer,
    changeDescription: changeDescriptionReducer,
    changePhotoReducer: changePhotoReducer,
    setPhotoReducer: setPhotoReducer
});

export default rootReducer;
