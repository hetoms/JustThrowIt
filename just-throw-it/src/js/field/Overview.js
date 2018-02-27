import React from "react";
import {CardBody, Card, CardHeader, Table} from 'reactstrap';

export default class Track extends React.Component {


	render() {
		return (
			<div className="track-box">
				<Card>
					<CardHeader>
						Overview
					</CardHeader>
					<CardBody>
						<Table size="sm">
							<thead>
							<tr>
								<th>Name</th>
								<th>Throws</th>
								<th>Par</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>{this.props.mainPlayer}</td>
								<td>{this.props.playerData.reduce((a, b) => a + b, 0)}</td>
								<td>{this.props.field.pars}</td>
							</tr>
							</tbody>
						</Table>
					</CardBody>
				</Card>
			</div>

		)
	}
}