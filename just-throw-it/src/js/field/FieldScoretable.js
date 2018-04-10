import React from "react";
import {Button, Nav, NavLink, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import Track from "./Track";
import Overview from "./Overview";
import "../../style/FieldScoretable.css";
import PropTypes from 'prop-types';

class FieldScoretable extends React.Component {
  constructor(props) {
    super(props);
    this.setTracks = this.setTracks.bind(this);
    this.showTrack = this.showTrack.bind(this);

    this.state = {
      displayedTrack: this.props.field.tracks[0],
      showOverview: false
    }
  }

  showTrack(track) {
    this.setState({
      displayedTrack: track,
      showOverview: false
    })
  }

  showOverview() {
    this.setState({
      displayedTrack: null,
      showOverview: true
    })
  }

  setTracks() {
    return this.props.field.tracks.map(track => {
      return (
        <NavItem className="track" key={track.trackNumber}>
          <NavLink href="#" onClick={() => this.showTrack(track)}
                   active={this.state.displayedTrack === track}>Track: {track.trackNumber}</NavLink>
        </NavItem>
      )
    })
  }

  render() {
    let content = null;
    if (this.state.showOverview) {
      content =
        <Overview
          playerData={this.props.playerData}
          mainPlayer={this.props.mainPlayer}
          field={this.props.field}
        />;
    } else {
      content = <Track
        track={this.state.displayedTrack}
      />;
    }

    return (
      <div className="container">
        <div className="header-box">
          <Link className="back-btn" to='/pickField'><Button>Back</Button></Link>
          <h2>{this.props.field.fieldName} DiscGolf field</h2>
          <div/>
        </div>
        <hr/>
        <div className="tracks-container">
          <div className="tracks-nav">
            <Nav pills vertical>
              <NavItem className="track">
                <NavLink href="#" onClick={() => this.showOverview()}
                         active={this.state.showOverview}>Overview</NavLink>
              </NavItem>
              {this.setTracks()}
            </Nav>
          </div>
          <div className="track-info">
            {content}
          </div>
        </div>
      </div>
    )
  }
}

export default FieldScoretable;


