import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import Header from './header/Header';
import Footer from './footer/Footer';
import Router from './Router';
import { error } from '../redux/actions/errorAction';
import { loginUser } from '../redux/actions/userActions';

class App extends React.Component {

  static getDerivedStateFromError(err) {

    store.dispatch(error(true, 'Error!!!!!!!!'));
  }

  componentDidMount() {
    //console.log("app", this.props.userID)
    store.dispatch(loginUser(localStorage.getItem('userID'), localStorage.getItem('name'), {}, {}, ''));

  }

  render() {
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
  }
};

export default App;
