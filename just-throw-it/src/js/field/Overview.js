import React from "react";
import {CardBody, Card, CardHeader, Button} from 'reactstrap';

export default class Track extends React.Component {
	render() {
		return (
			<div className="track-box">
				<Card>
					<CardHeader>
						Overview
					</CardHeader>
					<CardBody>
						<div>
							Player 1
						</div>
					</CardBody>
				</Card>
			</div>
		)
	}
}