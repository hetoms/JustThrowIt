import React from "react";
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Track from "./Track";
import PropTypes from 'prop-types';

class FieldScoretable extends React.Component {
	constructor(props) {
		super(props);
		this.setTracks = this.setTracks.bind(this);
	}


	setTracks() {
		return this.props.field.tracks.map(track => {
			return <Track track={track}/>
		});
	}

	render() {
		console.log(this.props);
		return (
			<div className="container">
				<div>
					<Link to='/pickField'><Button>Back</Button></Link>
					<h2>{this.props.field.fieldName} DiscGolf field</h2>
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


