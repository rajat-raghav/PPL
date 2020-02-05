import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

import SERVER from "../helpers/Config";
import WelcomeComponent from "./WelcomeComponent";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: ""
    };
  }
  login = e => {
    e.preventDefault();
    //console.log("prevent--", e.target.email.value);
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    axios
      .post(SERVER.SERVER_URL + SERVER.ROUTES.LOGIN, data)
      .then(response => {
        //console.log("response12-------", response.status);
        const records = response.data.status;
        //let ans = response.data.status;
        this.setState({ records });
        //alert("Status: "+this.state.records)
        //let ans = response.data;
        //this.setState({ans})
        let emailStyle = {
          border: "1px solid black"
        };
        let passwordStyle = {
          border: "1px solid black"
        };

        if (this.state.records === "Invalid E-mail") {
          emailStyle.border = "1px solid red";
          passwordStyle.border = "1px solid black";
          this.setState({ emailStyle, passwordStyle });
          this.removevalue();
        } else if (this.state.records === "Incorrect password") {
          emailStyle.border = "1px solid black";
          passwordStyle.border = "1px solid red";
          this.setState({ emailStyle, passwordStyle });
          this.removevalue();
        } else {
          emailStyle.border = "1px solid black";
          passwordStyle.border = "1px solid black";
          this.setState({ emailStyle, passwordStyle });
          localStorage.setItem("userID", response.data.result[0]._id);
          localStorage.setItem("name", response.data.result[0].first_name);

          this.props.history.push("/Timeline");
        }
      })
      .catch(error => {
        //console.log(error);
        if (error.message === "Network Error") {
          this.props.history.push("/ServerError");
          //alert("something went wrong");
        }
      });
  };

  removevalue = e => {
    e.target.email.value = "";
    e.target.password.value = "";
  };

  componentDidMount() {
    if (localStorage.getItem("userID") != null) {
      this.props.history.push("/Timeline");
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="content">
          <LoginForm
            emailStyle={this.state.emailStyle}
            passwordStyle={this.state.passwordStyle}
            records={this.state.records}
            login={this.login}
          />
          <WelcomeComponent />
        </div>
      </div>
    );
  }
}

export default Login;
