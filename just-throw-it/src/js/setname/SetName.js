import React from "react";
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {Button, Form, Label, Input} from 'reactstrap';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import "../../style/SetName.css";

const mapStateToProps = state => {
	return {
		fields: state.fields,
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
			<Form inline className='set-name' onSubmit={this.setNameAndRedirect}>
				<Label for="playerName" className="mr-sm-2">Player Name: </Label>
				<Input name="playerName" id="playerName" placeholder="Your name" required
					   onChange={event => this.props.actions.setName(event.target.value)}/>
				<Link to='/pickField'><Button>OK</Button></Link>
			</Form>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SetName);

