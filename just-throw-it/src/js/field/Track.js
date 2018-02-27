import React from "react";
import {CardBody, Card, CardHeader, Button} from 'reactstrap';
import "../../style/Track.css";

export default class Track extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			throws: this.props.throws,
			trackNumber: this.props.track.trackNumber
		};

		this.decreaseThrows = this.decreaseThrows.bind(this);
		this.increaseThrows = this.increaseThrows.bind(this);

	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.track !== this.props.track ) {
			this.setState({
				throws: nextProps.throws,
				trackNumber: nextProps.track.trackNumber
			});
		}
	}

	increaseThrows() {
		this.setState({
			throws: this.state.throws+ 1
		}, () => this.props.onChange(this.state.trackNumber, this.state.throws));
	}

	decreaseThrows() {
		if (this.state.throws > 0) {
			this.setState({
				throws: this.state.throws - 1
			}, () => this.props.onChange(this.state.trackNumber, this.state.throws));
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
							<div className="buttons">
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