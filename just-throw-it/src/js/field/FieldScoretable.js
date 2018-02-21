import React from "react";
import {Collapse, Button, CardBody, Card} from 'reactstrap';
import {Link} from 'react-router-dom';
import Track from "./Track";

class FieldScoretable extends React.Component {
	constructor(props) {
		super(props);
		this.setTracks = this.setTracks.bind(this);
	}

	setTracks() {
		let tracks = [];
		for (let trackId = 1; trackId <= this.props.field.NumberOfTracks; trackId++) {
			tracks.push(<Track trackId={trackId}/>);
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
				</div>
			</div>
		)
	}
}

export default FieldScoretable;

