import {
  SET_SETTING, TAX
} from '../actions/actionTypes';

const initialState = {
  setting: [],
  tax: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTING:
      return Object.assign({}, state, {
        setting: action.data,
      });
    case TAX:
      return Object.assign({}, state, {
        tax: action.data,
      });
    default:
      return state;
  }
};

export default reducer;
