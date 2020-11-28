import { SET_SETTING,TAX } from './actionTypes';

export const setSetting = (data) => {
    return {
        type: SET_SETTING,
        data: data
    };
};
export const setTax = (data) => {
    return {
        type: TAX,
        data: data
    };
};