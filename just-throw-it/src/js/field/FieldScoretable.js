import React from "react";
import {Collapse, Button, CardBody, Card} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import Track from "./Track";
import PropTypes from 'prop-types'

class FieldScoretable extends React.Component {
	constructor(props) {
		super(props);
		this.setTracks = this.setTracks.bind(this);
	}


	setTracks() {
		let id = 1;
		let tracks = [];
		for (let trackId = 1; trackId <= this.props.numberOfTracks; trackId++) {
			tracks.push(<Track trackId={id++}/>);
		}
		return tracks;
	}

	render() {
		return (
			<div className="container">
				<div style={{display: "flex", justifyContent: "flex-start"}}>
					<Link to='/pickField'><Button>Back</Button></Link>
					<h2 style={{marginLeft: 15 + "em"}}>Scoretable</h2>
				</div>

				<hr/>
				<div>
					{this.setTracks()}
					{this.props.field.FieldName}
				</div>
			</div>
		)
	}
}

export default FieldScoretable;


