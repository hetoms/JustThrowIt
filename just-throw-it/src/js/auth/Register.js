import React from 'react';
import {Col, Button, Form, FormGroup, Label, Input, Row} from 'reactstrap';
import "../../style/Auth.css";
import {Link} from "react-router-dom";
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

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			fullname: '',
			email: '',
			password: ''
		}
		this.handleRegister = this.handleRegister.bind(this);
	}

	handleRegister(event) {
		const registerUrl = 'https://justthrowit-env.eu-central-1.elasticbeanstalk.com/auth/register';
		event.preventDefault();

		let hashedPassword = passwordHash.generate(this.state.password);
		this.setState({password: hashedPassword});

		const data = {
			username: this.state.username,
			fullname: this.state.fullname,
			email: this.state.email,
			password: hashedPassword
		}
		console.log(data);

		fetch(registerUrl, {
				cache: 'no-store',
				method: "POST",
  			body: JSON.stringify(data),
  			headers: {
    			"Content-Type": "application/json"
  			},
  			credentials: "same-origin"
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<div className="container">
				<Form className="register-form" onSubmit={this.handleRegister}>
					<h1 className="title">Register New Account</h1>
					<FormGroup row>
						<Label className="label" for="username" sm={3}>Username</Label>
						<Col sm={9}>
							<Input
									required
									onChange={e => this.setState({username: e.target.value})}
									className='register-input'
									type="text"
									name="username"
									id="username-input"
								  placeholder="Enter your username"/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label className="label" for="fullname" sm={3}>Full name</Label>
						<Col sm={9}>
							<Input
									required
									onChange={e => this.setState({fullname: e.target.value})}
									className='register-input'
									type="text"
									name="fullname"
									id="users-fullname"
								  placeholder="Enter your full name"/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label className="label" for="exampleEmail" sm={3}>Email</Label>
						<Col sm={9}>
							<Input
									required
									onChange={e => this.setState({email: e.target.value})}
									className='register-input'
									type="email"
									name="email"
									id="email"
								  placeholder="Enter your email address"/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label className="label" for="examplePassword" sm={3}>Password</Label>
						<Col sm={9}>
							<Input
									required
									onChange={e => this.setState({password: e.target.value})}
									className='register-input'
									type="password"
									name="password"
									id="password"
								  placeholder="Enter your password"/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col>
								<Link to='/'>
									<Button className="cancel-btn">Cancel</Button>
								</Link>
								<Button className="register-btn">Register</Button>
							</Col>
						</Row>
					</FormGroup>
				</Form>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
