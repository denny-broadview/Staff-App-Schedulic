import { SET_SERVICE_LIST ,SEARCH_KEY,SET_ONGOING_DATA, SET_LOCATION} from './actionTypes';

export const setServiceList = (data) => { 
    return {
        type: SET_SERVICE_LIST,
        data: data
    };
};

export const setSearchKey = (data) => {
    return {
        type: SEARCH_KEY,
        data: data
    };
};

export const setGoingOnData = (data) => {
    return {
        type: SET_ONGOING_DATA,
        data: data
    };
};

export const setStaffLocation = (data) => {
    return {
        type: SET_LOCATION,
        data: data
    };
};