import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = props => {
  //console.log("register props", props);
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    records,
    signup,
    changestate
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
                value={username}
                onChange={changestate}
                required
              />
            </li>
            <li>
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={changestate}
                required
              />{" "}
            </li>
            <li>
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={changestate}
                required
              />{" "}
            </li>
            {records === "Already Exists" ? <h3>Already Exists</h3> : null}
            <li>
              <span>First Name</span>
              <input
                type="text"
                name="first_name"
                placeholder="Enter your First Name"
                value={first_name}
                onChange={changestate}
                required
              />{" "}
            </li>
            <li>
              <span>Last Name</span>
              <input
                type="text"
                name="last_name"
                placeholder="Enter your Last name"
                value={last_name}
                onChange={changestate}
                required
              />{" "}
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
export default RegisterForm;
