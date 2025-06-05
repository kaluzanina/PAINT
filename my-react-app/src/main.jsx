import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { StatsProvider } from "./context/StatsContext";
import './index.css';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <StatsProvider>
          <App />
        </StatsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);