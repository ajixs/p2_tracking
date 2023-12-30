import React from 'react';
import AppNavigation from './navigation/appNavigation';
import { Provider } from 'react-redux';
import {store} from './redux/store';

export default function App() {
  return (
    // main app 
    <Provider store={store} >
      <AppNavigation />
    </Provider>

  );
}

