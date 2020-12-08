import { createStore, combineReducers,compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from './reducers/user';
import settingReducer from './reducers/setting';
import serviceReducer from './reducers/bookingService';
import businessDetails from './reducers/buisenssReduser';



const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      'user',
      'setting',
      'serviceReducer',
      'businessDetails'
    ],
  };

const rootReducer = combineReducers({
    user: userReducer,
    setting:settingReducer,
    BookingService:serviceReducer,
    businessDetails:businessDetails
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const store  = createStore(persistedReducer, composeEnhancers());
// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export {store ,persistor}; 