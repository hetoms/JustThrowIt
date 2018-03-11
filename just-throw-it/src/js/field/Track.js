import React from "react";
import {CardBody, Card, CardHeader, Button} from 'reactstrap';
import "../../style/Track.css";
import {bindActionCreators} from "redux";
import * as Actions from "../app/Actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
	return {
		playerData: state.playerData
	}
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(Actions, dispatch),
	}
};

class Track extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trackNumber: this.props.track.trackNumber,
			playerData: this.props.playerData
		};

		this.decreaseThrows = this.decreaseThrows.bind(this);
		this.increaseThrows = this.increaseThrows.bind(this);
		this.renderPlayerPoints = this.renderPlayerPoints.bind(this);

	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.track !== this.props.track) {
			this.setState({
				trackNumber: nextProps.track.trackNumber
			});
		}
	}

	increaseThrows(player) {
		let throws = this.props.playerData[player][1][this.state.trackNumber - 1] + 1;
		this.props.actions.saveThrowDumb(player, this.state.trackNumber, throws);
		this.setState({
			playerData: this.props.playerData
		})
	}

	decreaseThrows(player) {
		if (this.props.playerData[player][1][this.state.trackNumber - 1] > 0) {
			let throws = this.props.playerData[player][1][this.state.trackNumber - 1] - 1;
			this.props.actions.saveThrowDumb(player, this.state.trackNumber, throws);
			this.setState({
				playerData: this.props.playerData
			})
		}
	}

	renderPlayerPoints() {
		return Object.keys(this.props.playerData).map(player => {
			return (
				<div className="player-points" key={player}>
					<h5 className="player-name"> {this.state.playerData[player][0]}</h5>
					<p className="throws"> Throws: {this.state.playerData[player][1][this.state.trackNumber - 1]}</p>
					<div className="buttons">
						<Button color="danger" className="decrease-btn" onClick={() => this.decreaseThrows(player)}>-</Button>
						<Button color="success" className="increase-btn" onClick={() => this.increaseThrows(player)}>+</Button>
					</div>
				</div>
			)
		})
	}

	render() {
		return (
			<div className="track-box">
				<Card>
					<CardHeader>
						Track {this.props.track.trackNumber} (par: {this.props.track.trackPar})
					</CardHeader>
					<CardBody>
						{this.renderPlayerPoints()}
					</CardBody>
				</Card>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);