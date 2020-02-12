import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import Header from './helpers/Header';
import Footer from './helpers/Footer';
import Router from './Router';

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Router />
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
