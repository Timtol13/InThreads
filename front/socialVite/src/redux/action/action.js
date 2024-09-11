import { authAPI, ChangeProfileAPI } from '../../components/api/api';
import { 
     CHANGE_USER_NAME_REQUEST,
     CHANGE_USER_NAME_ERROR,
     CHANGE_USER_NAME_SUCCESS,

     LOGIN_USER_ERROR,
     LOGIN_USER_REQUEST,
     LOGIN_USER_SUCCESS,

     REGISTRATION_USER_ERROR,
     REGISTRATION_USER_REQUEST,
     REGISTRATION_USER_SUCCESS, 

     CHANGE_DESCRIPTION_REQUEST,
     CHANGE_DESCRIPTION_ERROR,
     CHANGE_DESCRIPTION_SUCCESS,

     CHANGE_PHOTO_REQUEST,
     CHANGE_PHOTO_SUCCESS,
     CHANGE_PHOTO_ERROR,

     SET_PHOTO_REQUEST,
     SET_PHOTO_SUCCESS,
     SET_PHOTO_ERROR
    } from "../types";

export function login(login, password){
    return async (dispatch) => {
        dispatch({ type: LOGIN_USER_REQUEST });
        try{
            let data
            await authAPI.login(login, password)
            .then((e) => {
                data = e.data;
                localStorage.setItem('isLoggin', true)
                localStorage.setItem('user', JSON.stringify({'login': data}))
                location.replace('/')
                dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
            })
            .catch(e => {
                console.log(e);
                e.response.status === 404  && dispatch({ type: LOGIN_USER_ERROR, error: 'Неверный логин или пароль!' });
            })
        } catch (err){
            dispatch({ type: LOGIN_USER_ERROR, error: err.message });
        }
    };
}

export function registration({login, password, name, surname, description}){
    return async (dispatch) => {
        dispatch({ type: REGISTRATION_USER_REQUEST });
        try {
            let data 
            await authAPI.registration({login, password, name, surname, description})
            .then((e) => {
                data = e.data
                localStorage.setItem('isLoggin', true)
                localStorage.setItem('user', JSON.stringify({'login': data}))
                location.replace('/')
                dispatch({ type: REGISTRATION_USER_SUCCESS, payload: data });
            })
            .catch(e => {
                dispatch({ type: REGISTRATION_USER_ERROR, error: e.response.data });
            })
        } catch(err){
            dispatch({ type: REGISTRATION_USER_ERROR, error: err.message })
        }
    }
}


export const changeName = ( Name, Surname ) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_USER_NAME_REQUEST })
        try {
            const login = JSON.parse(localStorage.getItem('user')).login
            let data = {}
            console.log({Name, Surname, "login": login.login});
            await ChangeProfileAPI.putName({name: Name, surname: Surname, login: login.login})
            dispatch({ type: CHANGE_USER_NAME_SUCCESS, payload: data })
        } catch(err) {
            dispatch({ type: CHANGE_USER_NAME_ERROR, error: err.message })
        }
    }
}

export const changeDescription = (description) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_DESCRIPTION_REQUEST })
        try {
            const login = JSON.parse(localStorage.getItem('user')).login
            let data = {}
            await ChangeProfileAPI.putDescription({description, login: login.login})
            dispatch({ type: CHANGE_DESCRIPTION_SUCCESS, payload: data })
        } catch(err){
            dispatch({ type: CHANGE_DESCRIPTION_ERROR, error: err.message })
        }
    }
}

export const changePhoto = (event) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_PHOTO_REQUEST })
        try { 
            const login = JSON.parse(localStorage.getItem('user')).login
            let data = {}
            await authAPI.sendPhoto({'login': login.login, 'status': 'main', 'files': event.target.files[0]}).then((e) => {
                dispatch({ type: CHANGE_PHOTO_SUCCESS, payload: data })
            })
        } catch (err) {
            dispatch({ type: CHANGE_PHOTO_ERROR, error: err.message })
        }
    }
}

export const setPhoto = () => {
    return async (dispatch) => {
        dispatch({ type: SET_PHOTO_REQUEST })
        try {
            const login = JSON.parse(localStorage.getItem('user')).login
            let data = {}
            await authAPI.getPhoto(login.login).then((e) => {
                data = { photo: `http://localhost:7653/images/${login}/${e.data[0]?.filename}` }
            })
            dispatch({ type: SET_PHOTO_SUCCESS, payload: data })
        } catch (err){
            dispatch({ type: SET_PHOTO_ERROR, error: err.message })
        }
    }
}




