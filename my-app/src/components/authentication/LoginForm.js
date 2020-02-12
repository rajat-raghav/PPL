import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const LoginForm = props => {
  const { emailStyle, passwordStyle, loginStatus, login } = props;
  return (
    <div className="content_rgt">
      <div className="login_sec">
        {loginStatus === 'Logged in' ? (
          <h3 style={{ color: '#f47b13' }}>{loginStatus}</h3>
        ) : (
          ''
        )}
        <form onSubmit={login}>
          <h1>Log In</h1>
          <ul>
            <li>
              <span>Email-ID</span>
              <input
                type="email"
                style={emailStyle}
                name="email"
                placeholder="Enter your email"
                required
              />
            </li>
            {loginStatus === 'Invalid E-mail' ? (
              <h3 style={{ color: 'red' }}>{loginStatus}</h3>
            ) : (
              ''
            )}
            <li>
              <span>Password</span>
              <input
                type="password"
                name="password"
                style={passwordStyle}
                placeholder="Enter your password"
                required
              />
            </li>
            {loginStatus === 'Incorrect password' ? (
              <h3 style={{ color: 'red' }}>{loginStatus}</h3>
            ) : (
              ''
            )}
            <li>
              <input type="checkbox" />
              Remember Me
            </li>
            <li>
              <input type="submit" defaultValue="Log In" />
              Forgot Password
            </li>
          </ul>
        </form>

        <div className="addtnal_acnt">
          I do not have any account yet.
          <Link to="/Register">Create My Account Now !</Link>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  emailStyle: PropTypes.object,
  passwordStyle: PropTypes.object,
  loginStatus: PropTypes.string,
  login: PropTypes.func
};
export default LoginForm;
