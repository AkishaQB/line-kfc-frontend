import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LiffProvider } from './contexts/LiffContext';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LiffProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LiffProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
