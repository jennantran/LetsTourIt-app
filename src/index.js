import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import FavoritesContext from './FavoritesContext';

ReactDOM.render(
    <BrowserRouter>
       <FavoritesContext.Provider>
      <App />
      </FavoritesContext.Provider>
    </BrowserRouter>,
    document.getElementById('root')
  )
  
  