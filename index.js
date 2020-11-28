import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/navigation';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import {store ,persistor} from './src/store/configStore';
import { PersistGate } from 'redux-persist/integration/react';

// const store = configureStore();

const RNRedux = () => (
     <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
         <App />
      </PersistGate>
     </Provider>
 )
AppRegistry.registerComponent(appName, () => RNRedux);