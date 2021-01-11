import {
    SET_BUSINESS,
   
  } from '../actions/actionTypes';
  
  const initialState = {
    businessDetails: {},
  
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUSINESS:
            return {
              ...state,
              businessDetails: action.data,
            };
      
     
      default:
        return state;
    }
  };
  
  export default reducer;
  