import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { People } from './pages/People';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <People />
  </React.StrictMode>
);
