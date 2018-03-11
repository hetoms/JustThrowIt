import React from "react";
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {Button, Form, Label, Input} from 'reactstrap';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import "../../style/SetName.css";

const mapStateToProps = state => {
	return {
		mainPlayer: state.mainPlayer,
		playerData: state.playerData
	}
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(Actions, dispatch),
	}

};

class SetName extends React.Component {
	constructor() {
		super();

		this.getPlayerNameInputs = this.getPlayerNameInputs.bind(this);
		this.addPlayer = this.addPlayer.bind(this);
		this.resetFields = this.resetFields.bind(this);

		this.state = {
			playerCount: 1
		}
	}
	setNameAndRedirect = (event) => {
		event.preventDefault();
	};

	componentWillMount() {
		if (this.props.playerData.length === 0) {
			this.props.actions.setName('player1', "");
		}
	}

	addPlayer(event) {
		event.preventDefault();
		this.props.actions.setName('player' + (this.state.playerCount + 1), "");

		this.setState({
			playerCount: this.state.playerCount + 1
		});
	}

	getPlayerNameInputs() {
		return Object.keys(this.props.playerData).map((player) => {
			return (<Input name="playerName"
						   id={player}
						   key={player}
						   className="playerName"
						   maxLength="10"
						   value={this.props.playerData[player][0]}
						   placeholder="Your name" required
						   onChange={event => this.props.actions.setName(event.target.id, event.target.value)}/>)
		})

	}

	resetFields() {
		this.props.actions.resetData();
		this.props.actions.setName('player1', "");
	}

	render() {
		return (
			<div className="form-box container">
				<Form className='set-name' onSubmit={this.setNameAndRedirect}>
					<Label for="playerName" className="mr-sm-2 player-name-label">Add players and their names: </Label>
					{this.getPlayerNameInputs()}
					<Button onClick={event => this.addPlayer(event)}>+</Button>
				</Form>
				<div className="buttons">
					<div className="confirm-btn">
						<Button onClick={event => this.resetFields()}>Reset</Button>
					</div>
					<div className="confirm-btn">
						<Link to='/pickField'><Button>Continue</Button></Link>
					</div>
				</div>
			</div>

		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SetName);
