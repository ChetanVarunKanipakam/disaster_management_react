import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // <-- IMPORT
import { store, persistor } from './store/store'; // <-- IMPORT persistor
import App from './App';
import { setupAuthInterceptor } from './utils/api';
import 'leaflet/dist/leaflet.css';
import './styles/main.css';

// Setup the interceptor
setupAuthInterceptor(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Wrap App with PersistGate */}
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);