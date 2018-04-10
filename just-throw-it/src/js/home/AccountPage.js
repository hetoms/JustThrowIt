import React from 'react';
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Button, Col, Container, Row} from "reactstrap";
import getUserdata from "../api/GetUserData";
import '../../style/AccountPage.css';

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
      <div className='account-page'>
        <div className='account-page-buttons'>
          <Button color="primary" className='profile-button' onClick={() => this.setState({userInfoSelected: true})}>Show Profile</Button>
          <Button color="primary" className='history-button' onClick={() => this.setState({userInfoSelected: false})}>Show Match History</Button>
        </div>
        {this.state.userInfoSelected ? (
					<div className='profile'>
						<h3>Your Profile</h3>
						<hr />
							<Container className="userinfo">
								<Row className='data-row'>
									<Col xs="6"><h5>User id:</h5></Col>
		          		<Col xs="6"><h6>{this.state.id}</h6></Col>
								</Row>
								<Row className='data-row'>
									<Col xs="6"><h5>Username:</h5></Col>
		          		<Col xs="6"><h6>{this.props.user}</h6></Col>
								</Row>

								<Row className='data-row'>
									<Col xs="6"><h5>Email address:</h5></Col>
		          		<Col xs="6"><h6>{this.state.email}</h6></Col>
								</Row>
								<Row className='data-row'>
									<Col xs="6"><h5>Name:</h5></Col>
		          		<Col xs="6"><h6>{this.state.name}</h6></Col>
								</Row>
							</Container>
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
