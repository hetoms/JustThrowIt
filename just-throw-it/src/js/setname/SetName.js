import React from "react";
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {Button, Form, Label, Input} from 'reactstrap';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import "../../style/SetName.css";

const mapStateToProps = state => {
	return {
		mainPlayer: state.mainPlayer
	}
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(Actions, dispatch),
	}

};

class SetName extends React.Component {
	setNameAndRedirect = (event) => {
		event.preventDefault();
	};
	
	render() {
		return (
			<div className="form-box container">
				<Form inline className='set-name' onSubmit={this.setNameAndRedirect}>
					<Label for="playerName" className="mr-sm-2 player-name-label">Player Name: </Label>
					<Input name="playerName"
						   id="playerName"
                 maxLength="10"
						   value={this.props.mainPlayer}
						   placeholder="Your name" required
						   onChange={event => this.props.actions.setName(event.target.value)}/>
				</Form>
				<div  className="confirm-btn">
					<Link to='/pickField'><Button>OK</Button></Link>
				</div>

			</div>

		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SetName);

