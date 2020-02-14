import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SERVER from '../helpers/Config';
import WelcomeComponent from './WelcomeComponent';
import LoginForm from './LoginForm';
import {loginUser} from '../../redux/actions/userActions';
import { error } from '../../redux/actions/errorAction';
import store from '../../redux/store';

class Login extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loginStatus: '',
  //     hasError: false,
  //     errorMsg: ''
  //   };
  // }
  login = e => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    //console.log("prevent--", e.target.email.value);
    e.target.password.value = '';

    axios
      .post(SERVER.SERVER_URL + SERVER.ROUTES.LOGIN, data)
      .then(response => {
        //console.log("response12-------", response.status);
        const loginStatus = response.data.status;

        //let ans = response.data.status;
        //this.setState({ loginStatus });
        //alert("Status: "+this.state.loginStatus)
        //let ans = response.data;
        //this.setState({ans})
        let emailStyle = {
          border: '1px solid black'
        };
        let passwordStyle = {
          border: '1px solid black'
        };

        if (loginStatus === 'Invalid E-mail') {
          emailStyle.border = '1px solid red';
          passwordStyle.border = '1px solid black';
          //this.setState({ emailStyle, passwordStyle,loginStatus });
          store.dispatch(loginUser('',emailStyle,passwordStyle,loginStatus));
        } else if (loginStatus === 'Incorrect password') {
          emailStyle.border = '1px solid black';
          passwordStyle.border = '1px solid red';
          store.dispatch(loginUser('',emailStyle,passwordStyle,loginStatus));
          //this.setState({ emailStyle, passwordStyle,loginStatus });
        } else {
          emailStyle.border = '1px solid black';
          passwordStyle.border = '1px solid black';
          //this.setState({ emailStyle, passwordStyle ,loginStatus});
          localStorage.setItem('userID', response.data.result[0]._id);
          localStorage.setItem('name', response.data.result[0].first_name);
          store.dispatch(loginUser('',emailStyle,passwordStyle,loginStatus));

          this.props.history.push('/Homepage');
        }
      })
      .catch(err => {
        // this.setState({
        //   hasError: true,
        //   errorMsg: error.message
        // });
        store.dispatch(error(true, err.message));
      });
  };

  componentDidMount() {
    if (localStorage.getItem('userID') != null) {
      this.props.history.push('/Homepage');
    }
  }

  render() {
    if (this.props.hasError) {
      return (
        <div
          style={{ padding: '16% 30%', color: '#f47b13', textAlign: 'center' }}
        >
          <h1>Something went wrong.</h1>
          <h2>Error:{this.props.errorMsg}</h2>
        </div>
      );
    }
    return (
      <div className="container">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="content">
          <LoginForm
            //emailStyle={this.state.emailStyle}
            //passwordStyle={this.state.passwordStyle}
            //loginStatus={this.state.loginStatus}
            login={this.login}
          />
          <WelcomeComponent />
        </div>
      </div>
    );
  }
}

const mapStateToProps=state=> {
  return{
    hasError: state.error.hasError,
    errorMsg: state.error.errorMsg
  };
};

Login.propTypes = {
  history: PropTypes.object,
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
};
export default connect(mapStateToProps)(Login);
