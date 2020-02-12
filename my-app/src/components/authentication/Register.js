import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import SERVER from '../helpers/Config';
import WelcomeComponent from './WelcomeComponent';
import RegisterForm from './RegisterForm';

class Register extends React.Component {
  constructor(props) {
    super(props);
    //console.log("Constructor");
    this.state = {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      hasError: false,
      errorMsg: ''
    };
  }
  changestate = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  signup = e => {
    e.preventDefault();
    //console.log("prevent", this.state);

    axios
      .post(SERVER.SERVER_URL + SERVER.ROUTES.SIGN_UP, this.state)
      .then(response => {
        console.log('response-------', response);
        const status = response.data.status;
        //let ans = response.data.status;
        this.setState({ status });
        //alert("Status: "+this.state.status)
        //let ans = response.data;
        //this.setState({ans})
        if (this.state.status === 'Updated') {
          setTimeout(() => {
            this.props.history.push('/Login');
          }, 2000);
        }
      })
      .catch(error => {
        this.setState({
          hasError: true,
          errorMsg: error.message
        });
        //alert("something went wrong");
      });
  };

  componentDidMount() {
    if (localStorage.getItem('userID')) {
      this.props.history.push('/Homepage');
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{ padding: '16% 30%', color: '#f47b13', textAlign: 'center' }}
        >
          <h1>Something went wrong.</h1>
          <h2>Error:{this.state.errorMsg}</h2>
        </div>
      );
    }
    return (
      <div>
        <div className="container">
          <Helmet>
            <title>Register</title>
          </Helmet>
          <div className="content">
            <RegisterForm
              changestate={this.changestate}
              signup={this.signup}
              {...this.state}
            />
            <WelcomeComponent />
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  history: PropTypes.object
};
export default Register;
