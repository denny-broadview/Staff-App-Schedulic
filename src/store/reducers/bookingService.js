import {
  SET_SERVICE_LIST,
  SEARCH_KEY
} from '../actions/actionTypes';

const initialState = {
  serviceList: [],
  serachKey: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICE_LIST:
      return Object.assign({}, state, {
        serviceList: action.data,
      });
    case SEARCH_KEY:
      return {
        ...state,
        serachKey: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
