import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '../../Config';
import WelcomeComponent from './WelcomeComponent';
import RegisterForm from './RegisterForm';
import ErrorMessage from '../../helpers/errormessage';
import { error } from '../../redux/actions/errorAction';
import store from '../../redux/store';
import api from '../../helpers/api';


function Register(props) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [first_name, setFirst_name] = useState(null);
  const [last_name, setLast_name] = useState(null);
  const [status, setStatus] = useState(null);

  let history = useHistory();

  useEffect(() => {
    if (!props.userID) {
      history.push('/Login');
    }
  });

  function signup(e) {
    e.preventDefault();
    setUsername(e.target.username.value);
    setPassword(e.target.password.value);
    setEmail(e.target.email.value);
    setFirst_name(e.target.first_name.value);
    setLast_name(e.target.last_name.value);
    const data = {
      username, password, email, first_name, last_name
    };

    api(ROUTES.SIGN_UP, data)
      .then(response => {
        const status = response.data.status;
        setStatus(status);
        if (status === 'Updated') {
          setTimeout(() => {
            history.push('/Login');
          }, 500);
        }
      })
      .catch(err => {
        store.dispatch(error(true, err.message));
      });
  }

  return (
    <div>
      <div>
        <div className="container">
          <Helmet>
            <title>Register</title>
          </Helmet>
          {props.hasError ?
            ErrorMessage(props.errorMsg) :
            <div className="content">
              <RegisterForm
                signup={signup}
                status={status}
                username={username}
                email={email}
                password={password}
                first_name={first_name}
                last_name={last_name}
              />
              <WelcomeComponent />
            </div>}
        </div>
      </div>
    </div>

  );
}

const mapStateToProps = state => {
  return {
    hasError: state.error.hasError,
    errorMsg: state.error.errorMsg,
    userID: state.user.userID
  };
};

Register.propTypes = {
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
  userID: PropTypes.string,
  history: PropTypes.object
};
export default connect(mapStateToProps)(Register);
