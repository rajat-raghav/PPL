import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const RegisterForm = props => {
  const {
    status,
    signup,
  } = props;
  return (
    <div className="content_rgt">
      <div className="register_sec">
        <form onSubmit={signup}>
          <h1>Create An Account</h1>
          <ul>
            <li>
              <span>Username</span>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                required
              />
            </li>
            <li>
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />{' '}
            </li>
            <li>
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />{' '}
            </li>
            {status === 'Already Exists' ? <h3>Already Exists</h3> : null}
            <li>
              <span>First Name</span>
              <input
                type="text"
                name="first_name"
                placeholder="Enter your First Name"
                required
              />{' '}
            </li>
            <li>
              <span>Last Name</span>
              <input
                type="text"
                name="last_name"
                placeholder="Enter your Last name"
                required
              />{' '}
            </li>
            <li>
              <input type="checkbox" required />I agree to Term &amp; Conditions
            </li>
            <li>
              <input type="submit" defaultValue="Register" />
            </li>
          </ul>
        </form>
        <div className="addtnal_acnt">
          I already have an account.
          <Link to="/Login">Login My Account !</Link>
        </div>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  status: PropTypes.string,
  signup: PropTypes.func,
};
export default RegisterForm;
