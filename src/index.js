import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import { AppContextProvider } from './context/AppContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <AppContextProvider>
      <App />
      <Toaster position="top-right"
        reverseOrder={false} />
    </AppContextProvider>
  </BrowserRouter>
);
