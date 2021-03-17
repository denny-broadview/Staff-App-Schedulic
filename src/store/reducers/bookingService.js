import {
  SET_SERVICE_LIST,
  SEARCH_KEY,
  SET_ONGOING_DATA,
  SET_LOCATION
} from '../actions/actionTypes';

const initialState = {
  serviceList: [],
  serachKey: '',
  onGoingData:{},
  staffLocation:{}
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
    case SET_ONGOING_DATA:
      return { 
        ...state, 
        onGoingData: action.data
    };
    case SET_LOCATION:
      return { 
        ...state, 
        staffLocation: action.data
    };
    default:
      return state;
  }
};

export default reducer;
