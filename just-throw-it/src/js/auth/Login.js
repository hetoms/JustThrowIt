import React from 'react';
import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import "../../style/Auth.css";
import {Link, Redirect} from "react-router-dom";
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import passwordHash from 'password-hash';

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

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(event) {
		const loginUrl = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/auth/login';
		event.preventDefault();

		fetch(loginUrl + '?username=' + this.state.username, {
				cache: 'no-store',
				headers: {
    			"Content-Type": "application/x-www-form-urlencoded"
  			}
			})
			.then((response) => {
				return response.json();
			}).then((data) => {

				if (data.loginBoolean) {
					const authenticated = passwordHash.verify(this.state.password, data.hashedPassword);

					if (authenticated) {
						console.log("Login was successful!");
						this.props.actions.login({});
					} else {
						console.log("Login was unsuccessful!");
						console.log(data);
					}
				} else {
					console.log(data);
					console.log("ERROR: No such account!");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		if (this.props.userLoggedIn) {
			return <Redirect to="/addPlayers"/>;
		}

		return (
			<div className="container">
				<Form className="login-form" onSubmit={this.handleLogin}>
					<h1 className="title">Log in</h1>
					<FormGroup>
						<Label for="username" hidden>Username</Label>
						<Input
								required
								onChange={e => this.setState({username: e.target.value})}
								type="text"
								name="username"
								id="username"
								placeholder="Username"/>
					</FormGroup>
					{' '}
					<FormGroup>
						<Label for="password" hidden>Password</Label>
						<Input
								required
								onChange={e => this.setState({password: e.target.value})}
								type="password"
								name="password"
								id="password"
								placeholder="Password"/>
					</FormGroup>
					{' '}
					<Row>
						<Col>
							<Link to='/'>
								<Button className="cancel-btn">Cancel</Button>
							</Link>
							<Button className="login-btn">Log in</Button>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
