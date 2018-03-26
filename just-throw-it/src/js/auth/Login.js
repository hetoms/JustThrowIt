import React from 'react';
import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import "../../style/Auth.css";
import {Link} from "react-router-dom";

export default class Login extends React.Component {
	render() {
		return (
			<div className="container">
				<Form className="login-form">
					<h1 className="title">Log in</h1>
					<FormGroup>
						<Label for="exampleEmail" hidden>Username</Label>
						<Input type="email" name="email" id="exampleEmail" placeholder="Username" />
					</FormGroup>
					{' '}
					<FormGroup>
						<Label for="examplePassword" hidden>Password</Label>
						<Input type="password" name="password" id="examplePassword" placeholder="Password" />
					</FormGroup>
					{' '}
					<Row>
						<Col>
							<Link to='/'>
								<Button className="cancel-btn">Cancel</Button>
							</Link>
							<Link to='/addplayers'>
								<Button className="login-btn">Log in</Button>
							</Link>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}