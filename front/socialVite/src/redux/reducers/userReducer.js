import { 
    CHANGE_DESCRIPTION_ERROR, 
    CHANGE_DESCRIPTION_REQUEST, 
    CHANGE_DESCRIPTION_SUCCESS, 
    
    CHANGE_PHOTO_ERROR, 
    CHANGE_PHOTO_REQUEST, 
    CHANGE_PHOTO_SUCCESS, 
    
    CHANGE_USER_NAME_ERROR, 
    CHANGE_USER_NAME_REQUEST, 
    CHANGE_USER_NAME_SUCCESS, 

    LOGIN_USER_ERROR, 
    LOGIN_USER_REQUEST, 
    LOGIN_USER_SUCCESS, 
    
    REGISTRATION_USER_ERROR, 
    REGISTRATION_USER_REQUEST, 
    REGISTRATION_USER_SUCCESS,

    SET_PHOTO_REQUEST,
    SET_PHOTO_ERROR,
    SET_PHOTO_SUCCESS
} from "../types";

const userInitialState = {
    name: '',
    surname: '',
    description: '',
    photo: '',
    login: null, 
    loading: false,
    error: null,
};

const loginReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST: 
            return {
                ...state,
                loading: true,
                error: null
            };
        case LOGIN_USER_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case LOGIN_USER_SUCCESS:
            console.log("Reducer: LOGIN_USER_SUCCESS payload", action.payload); 
            return {
                ...state,
                loading: false,
                login: action.payload
            };
        default:
            return state;
    }
};

const registrationReducer = (state = userInitialState, action) => {
    switch (action.type){
        case REGISTRATION_USER_REQUEST: 
            return { 
                ...state,
                error: false,
                loading: true
            }
        case REGISTRATION_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case REGISTRATION_USER_SUCCESS: 
            return {
                ...state,
                loading: false,
                login: action.payload
            }
        default:
            return state;
    }
}

const changeNameReducer = (state = userInitialState, action) => {
    switch(action) {
        case CHANGE_USER_NAME_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };
        case CHANGE_USER_NAME_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case CHANGE_USER_NAME_SUCCESS:
            return { 
                ...state,
                loading: false,
                name: action.payload.name,
                surname: action.payload.surname
            }
        default:
            return state
    }
}

const changeDescriptionReducer = (state = userInitialState, action) =>{
    switch(action){
        case  CHANGE_DESCRIPTION_REQUEST: 
            return {
                ...state,
                loading: true,
                error: false
            }
        case CHANGE_DESCRIPTION_ERROR: 
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case CHANGE_DESCRIPTION_SUCCESS:
            return {
                ...state,
                loading: false,
                description: action.payload.description
            }
        default: 
            return state
    }
}

const changePhotoReducer = (state = userInitialState, action) => {
    switch(action) {
        case CHANGE_PHOTO_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }
        case CHANGE_PHOTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case CHANGE_PHOTO_SUCCESS:
            return {
                ...state,
                loading: false,
                photo: action.payload.photo
            }
        default:
            return state
    }
}

const setPhotoReducer = (state = userInitialState, action) => {
    switch(action) {
        case SET_PHOTO_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }
        case SET_PHOTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case SET_PHOTO_SUCCESS:
            return {
                ...state,
                loading: false,
                photo: action.payload.photo
            }
        default:
            return state
    }
}

export {
    loginReducer,
    registrationReducer,
    changeNameReducer,
    changeDescriptionReducer,
    changePhotoReducer,
    setPhotoReducer
};
