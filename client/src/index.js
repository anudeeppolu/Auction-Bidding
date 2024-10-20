import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme file (you can choose other themes)
import 'primereact/resources/primereact.min.css';          // Core PrimeReact CSS
import 'primeicons/primeicons.css';                        // PrimeIcons for components like buttons and icons
import 'primeflex/primeflex.css';                          // PrimeFlex for layout utilities (optional)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

