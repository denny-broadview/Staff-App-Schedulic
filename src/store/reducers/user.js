import {
  SET_USER_DATA_BY_ID,
  SET_USER_ID,
  SET_USER_TOKEN,
  SET_USER_DATA,
  SET_USER_IMAGE,
  LOGOUT
} from '../actions/actionTypes';

const initialState = {
  user: [],
  userId: null,
  token: null,
  userImage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA_BY_ID:
      return Object.assign({}, state, {
        user: action.data,
      });
    case SET_USER_ID: 
      return {
        ...state,
        userId: action.userId,
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_USER_IMAGE:
      return {
        ...state,
        userImage: action.userImage,
      };

    case SET_USER_DATA:
      return {
        ...state,
        user: action.data,
      };
    case LOGOUT:
      return { 
        ...state,
         token: null, 
         user: [], 
         userId: null, 
         userImage: null
       };
    default:
      return state;
  }
};

export default reducer;
