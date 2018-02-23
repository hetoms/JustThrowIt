import React from "react";
import {CardBody, Card, CardHeader} from 'reactstrap';

export default class Track extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<CardHeader>
						Track {this.props.track.trackNumber} (par: {this.props.track.trackPar})
					</CardHeader>
					<CardBody>
						<label> Player Name</label>
					</CardBody>
				</Card>
			</div>

		)
	}
}