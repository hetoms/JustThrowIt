import React from 'react';
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

const mapStateToProps = state => {
  return {
    userLoggedIn: state.userLoggedIn,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
};

class AccountPage extends React.Component {


  render() {
    return (
      <h2>PROFILE</h2>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
