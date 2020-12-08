import { SET_BUSINESS } from './actionTypes';

export const setBusiness = (data) => {
    return {
        type: SET_BUSINESS,
        data: data
    };
};
