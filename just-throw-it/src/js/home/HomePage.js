import React from "react";
import {Button, Container, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class HomePage extends React.Component {
	render() {
		return (
			<Container>
				<Row>
					<Col>
						<h1>Welcome Page</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						<Link to='/addplayers'>
							<Button>
								<h2>Play</h2>
								<small>(without logging in)</small>
							</Button>
						</Link>
						<Link to='/login'><Button>
							<h2>Log In</h2>
							<small>(To save your game)</small>
						</Button></Link>
					</Col>
				</Row>
				<Row>
					<Col>
						<p>
							No account yet? <Link to='/register'>Register new account</Link>
						</p>
					</Col>
				</Row>
			</Container>
		)
	};
}
