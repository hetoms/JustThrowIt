import React from 'react';
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Button, Col, Container, Row} from "reactstrap";
import getUserdata from "../api/GetUserData";

const mapStateToProps = state => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
};

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfoSelected: true,
      id: "",
      email: "",
      name: ""
    };
    this.onReceiveUserData = this.onReceiveUserData.bind(this);
    getUserdata(this.props.user, this.onReceiveUserData)
  }

  onReceiveUserData(data) {
    this.setState(data);
  }


  render() {
    return (
      <div>
        <div style={{display: 'flex', margin: 10}}>
          <Button color="primary" style={{flex: 1, marginRight: 10}} onClick={() => this.setState({userInfoSelected: true})}>User Info</Button>
          <Button color="primary" style={{flex: 1}} onClick={() => this.setState({userInfoSelected: false})}>Match history</Button>
        </div>
        {this.state.userInfoSelected ? (
          <div>
            {this.props.user}
            {this.state.id}
            {this.state.email}
            {this.state.name}
          </div>
        ) : (
          <div>
            Match history
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
