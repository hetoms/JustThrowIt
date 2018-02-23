import React from "react";
import {CardBody, Card, CardHeader, Button} from 'reactstrap';
import "../../style/Track.css";

export default class Track extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			throws: 0
		};

		this.decreaseThrows = this.decreaseThrows.bind(this);
		this.increaseThrows = this.increaseThrows.bind(this);

	}

	increaseThrows() {
		this.setState({
			throws: this.state.throws + 1
		})
	}

	decreaseThrows() {
		if (this.state.throws > 0) {
			this.setState({
				throws: this.state.throws - 1
			})
		}
	}

	render() {
		return (
			<div className="track-box">
				<Card>
					<CardHeader>
						Track {this.props.track.trackNumber} (par: {this.props.track.trackPar})
					</CardHeader>
					<CardBody>
						<div className="player-points">
							<h5 className="player-name"> {this.props.player}</h5>
							<p className="throws"> Throws: {this.state.throws}</p>
							<div>
								<Button color="danger" className="decrease-btn" onClick={() => this.decreaseThrows()}>-</Button>
								<Button color="success" className="increase-btn" onClick={() => this.increaseThrows()}>+</Button>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>

		)
	}
}