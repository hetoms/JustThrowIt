import React from 'react';
import {Col, Button, Form, FormGroup, Label, Input, FormText, Row} from 'reactstrap';
import "../../style/Auth.css";
import {Link} from "react-router-dom";

export default class Register extends React.Component {
	render() {
		return (
			<div className="container">
				<Form className="register-form">
					<h1 className="title">Register New Account</h1>
					<FormGroup row>
						<Label className="label" for="username" sm={3}>Username</Label>
						<Col sm={9}>
							<Input className='register-input' type="text" name="username" id="username-input" placeholder="Enter your username" />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label className="label" for="fullname" sm={3}>Full name</Label>
						<Col sm={9}>
							<Input className='register-input' type="text" name="fullname" id="users-fullname" placeholder="Enter your full name" />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label className="label" for="exampleEmail" sm={3}>Email</Label>
						<Col sm={9}>
							<Input className='register-input' type="email" name="email" id="email" placeholder="Enter your email address" />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label className="label" for="examplePassword" sm={3}>Password</Label>
						<Col sm={9}>
							<Input className='register-input' type="password" name="password" id="password" placeholder="Enter your password" />
						</Col>
					</FormGroup>
					<FormGroup >
						<Row>
							<Col>
								<Link to='/'>
									<Button className="cancel-btn">Cancel</Button>
								</Link>
								<Link to='/'>
									<Button className="register-btn">Register</Button>
								</Link>
							</Col>
						</Row>

					</FormGroup>
				</Form>
			</div>

		);
	}
}