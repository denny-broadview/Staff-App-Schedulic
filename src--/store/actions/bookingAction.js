import { SET_SERVICE_LIST ,SEARCH_KEY} from './actionTypes';

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