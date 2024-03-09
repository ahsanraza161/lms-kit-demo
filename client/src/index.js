import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import Admin from './features/admin';
import { BrowserRouter } from 'react-router-dom'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
   {/* <App />  */}
     <Admin/>

  </React.StrictMode>
  </BrowserRouter>
);
