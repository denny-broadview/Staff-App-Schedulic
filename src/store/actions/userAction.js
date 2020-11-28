import { SET_USER_DATA_BY_ID,SET_USER_ID,SET_USER_TOKEN, SET_USER_DATA,SET_USER_IMAGE,LOGOUT } from './actionTypes';

export const setUserDataById = (key) => {
    return {
        type: SET_USER_DATA_BY_ID,
        userId: key
    };
};
export const setUserId = (id) => {
    return {
        type: SET_USER_ID,
        userId: id
    };
};
export const setUserToken = (token) => {
    return {
        type: SET_USER_TOKEN,
        token: token
    };
};
export const setUserImage = (val) => {
    return {
        type: SET_USER_IMAGE,
        userImage: val
    };
};

export const setUserData = (data) => {
    // console.log('from userAction ',data);
    return {
        type: SET_USER_DATA,
        data: data
    };
};
export const logout = () => {
    return {
        type: LOGOUT
    }; 
};


