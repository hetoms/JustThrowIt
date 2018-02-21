import React from "react";
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {Button, Form, Label, Input} from 'reactstrap';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';

const mapStateToProps = state => {
	return {
	}
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(Actions, dispatch),
	}

};

class FieldScoretable extends React.Component {
	render() {
		return (
			<div className="container">
				<Link to='/pickField'><Button>Back</Button></Link>
				<h2>Scoretable</h2>
			</div>

		)
	}
}

export default FieldScoretable;

