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
		return this.props.field.Tracks.map(track => {
			return <Track trackId={track.TrackNumber}/>
		})
	}

	render() {
		return (
			<div className="container">
				<div style={{display: "flex", justifyContent: "flex-start"}}>
					<Link to='/pickField'><Button>Back</Button></Link>
					<h2 style={{marginLeft: 15 + "em"}}>Scoretable</h2>
					{this.props.field.FieldName}
				</div>

				<hr/>
				<div>
					{this.setTracks()}
				</div>
			</div>
		)
	}
}

export default FieldScoretable;


