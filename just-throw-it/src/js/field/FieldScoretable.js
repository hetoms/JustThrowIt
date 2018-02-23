import React from "react";
import {Button, Nav, NavLink, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import Track from "./Track";
import "../../style/FieldScoretable.css";
import {StickyContainer, Sticky} from 'react-sticky';
import PropTypes from 'prop-types';

class FieldScoretable extends React.Component {
	constructor(props) {
		super(props);
		this.setTracks = this.setTracks.bind(this);
		this.showTrack = this.showTrack.bind(this);

		this.state = {
			displayedTrack: this.props.field.tracks[0]
		}
	}

	showTrack(track, e) {
		e.preventDefault();
		this.setState({
			displayedTrack: track
		})
	}

	setTracks() {
		// return this.props.field.tracks.map(track => {
		// 	return <Track track={track}/>
		// });

		return this.props.field.tracks.map(track => {
			return (
				<NavItem>
					<NavLink className="track"  href="#" onClick={(e) => this.showTrack(track, e)}>Track: {track.trackNumber}</NavLink>
				</NavItem>
			)
		})
	}

	render() {
		return (
			<div className="container">
				<div>
					<Link to='/pickField'><Button>Back</Button></Link>
					<h2>{this.props.field.fieldName} DiscGolf field</h2>
					{console.log("props", this.props)}
				</div>
				<hr/>
				<StickyContainer style={{overflowY: 'auto'}}>
					<div className="tracks-container">
						<div className="tracks-nav">
							<Nav vertical>
								{this.setTracks()}
							</Nav>
						</div>
						<div className='info-container'>
							<Sticky>{
								({
									 style
								 }) => {
									return (
										<div className="track-info" style={style}>
											<Track track={this.state.displayedTrack}/>
										</div>
									)
								}
							}</Sticky>
						</div>


						{/*<div className="track-info">*/}
						{/*<Track track={this.state.displayedTrack}/>*/}
						{/*</div>*/}
					</div>
				</StickyContainer>
			</div>
		)
	}
}

export default FieldScoretable;


