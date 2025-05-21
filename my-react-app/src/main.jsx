import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StatsProvider } from "./context/StatsContext";
import './index.css'; // jeśli używasz Tailwinda lub stylów globalnych
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <StatsProvider>
        <App />
      </StatsProvider>
    </UserProvider>
  </React.StrictMode>
);