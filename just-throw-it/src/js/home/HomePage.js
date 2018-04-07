import React from "react";
import {Button, Container, Col, Row} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
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

class HomePage extends React.Component {
	constructor() {
		super();
	}

	render() {
		if (this.props.userLoggedIn) {
			<Redirect to="/addPlayers"/>
		}

		return (
			<Container>
				<Row>
					<Col>
						<h1>Welcome Page</h1>
						<br></br>
					</Col>
				</Row>
				<Row>
					<Col>
						<Link to='/addplayers'>
							<Button style={{"marginBottom": 20 + "px"}}>
								<h3>Play</h3>
								<small>(without logging in)</small>
							</Button>
						</Link>
					</Col>
				</Row>
				<Row>
					<Col>
						<h5>Or <b>Sign In</b> to Save Your Games:</h5>
						<Button>Google</Button>
						<Button style={{"marginLeft": 20 + "px"}}>Facebook</Button>
					</Col>
				</Row>
			</Container>
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
