import React from "react";
import { connect } from "react-redux";

import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <HeaderLeft />
        {this.props.userID ? <HeaderRight /> : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userID: state.user.userID
  };
};

export default connect(mapStateToProps)(Header);
