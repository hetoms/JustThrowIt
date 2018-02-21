import React from "react";
import { Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Track from "./Track";
import PropTypes from 'prop-types';

class FieldScoretable extends React.Component {
	constructor(props) {
		super(props);
		this.setTracks = this.setTracks.bind(this);
	}


	setTracks() {
		return this.props.field.Tracks.map(track => {
			return <Track track={track}/>
		});
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


