import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

import SERVER from "../helpers/Config";
import WelcomeComponent from "./WelcomeComponent";
import RegisterForm from "./RegisterForm";

class Register extends React.Component {
  constructor(props) {
    super(props);
    //console.log("Constructor");
    this.state = {
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: ""
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
        console.log("response-------", response);
        const records = response.data.status;
        //let ans = response.data.status;
        this.setState({ records });
        //alert("Status: "+this.state.records)
        //let ans = response.data;
        //this.setState({ans})
        if (this.state.records === "Updated") {
          setTimeout(() => {
            this.props.history.push("/Login");
          }, 2000);
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

  componentDidMount() {
    if (localStorage.getItem("userID")) {
      this.props.history.push("/Timeline");
    }
  }

  render() {
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

export default Register;
