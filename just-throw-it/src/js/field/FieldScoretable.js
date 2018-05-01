import React from "react";
import {Button, Nav, NavLink, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import Track from "./Track";
import Overview from "./Overview";
import "../../style/FieldScoretable.css";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import * as Actions from "../app/Actions";
import {connect} from "react-redux";
import Responsive from 'react-responsive';
import {find, propEq} from "ramda";

const saveGameUrl = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/userHistory';

const mapStateToProps = state => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user,
    selectedField: state.selectedField
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
};

class FieldScoretable extends React.Component {
  constructor(props) {
    super(props);
    this.setTracks = this.setTracks.bind(this);
    this.showTrack = this.showTrack.bind(this);
    this.saveGame = this.saveGame.bind(this);

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
      showOverview: true
    })
  }

  hideOverview() {
    this.setState({
      showOverview: false
    })
  }

  showPrevTrack() {
    const currentTrackNr = this.state.displayedTrack.trackNumber;
    let prevTrackNr;
    if (currentTrackNr !== 1) {
      prevTrackNr = currentTrackNr - 1;
    } else {
      prevTrackNr = this.props.field.tracks.length
    }
    const prevTrack = find(propEq("trackNumber", prevTrackNr), this.props.field.tracks);
    this.setState({
      displayedTrack: prevTrack
    });
  }

  showNextTrack() {
    const currentTrackNr = this.state.displayedTrack.trackNumber;
    let nextTrackNr;
    if (currentTrackNr !== this.props.field.tracks.length) {
      nextTrackNr = currentTrackNr + 1;
    } else {
      nextTrackNr = 1;
    }
    const nextTrack = find(propEq("trackNumber", nextTrackNr), this.props.field.tracks);
    this.setState({
      displayedTrack: nextTrack
    });
  }

  setTracks() {
    return this.props.field.tracks.map(track => {
      return (
        <NavItem className="track" key={track.trackNumber}>
          <NavLink href="#" onClick={() => this.showTrack(track)}
                   active={this.state.displayedTrack === track && !this.state.showOverview}>Track: {track.trackNumber}</NavLink>
        </NavItem>
      )
    })
  }

  saveGame() {
    const postdata = {};
    postdata.username = this.props.user;
    postdata.fieldId = this.props.selectedField;
    const data = [];
    const playerdata = this.props.playerData;
    Object.keys(playerdata).forEach(key => (data.push({
      playerName: playerdata[key][0],
      throws: playerdata[key][1].reduce((a, b) => a + b, 0)
    })));
    postdata.data = JSON.stringify(data);
    fetch(saveGameUrl, {
      cache: 'no-store',
      method: "POST",
      body: JSON.stringify(postdata),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        return response.json();
      }).then((data) => {
      if (data.success) {
        alert('Game saved')
      } else {
        console.error(data.message);
      }
    })
      .catch((error) => {
        console.error(error);
      });
    console.log('post data ', postdata)
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

    console.log(this.state);
    console.log(this.props);

    return (
      <div>
        <Responsive minWidth={700}>
          <div className="container">
            <div className="header-box">
              <Link className="back-btn" to='/pickField'><Button color="success">Back</Button></Link>
              <h2>{this.props.field.fieldName} DiscGolf field</h2>
              {this.props.userLoggedIn ? (
                <span className="back-btn">
								<Button onClick={this.saveGame} color="success">Finish game</Button>
							</span>
              ) : null}
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
        </Responsive>
        <Responsive maxWidth={699}>
          <div>
            <div className="header-box-mobile">
              <Link className="back-btn" to='/pickField' style={{marginLeft: 10}}><Button color="success"
                                                                 className="small-button">Back</Button></Link>
              <span>{this.props.field.fieldName}</span>
              {this.props.userLoggedIn ? (
                <span className="back-btn">
								<Button onClick={this.saveGame} color="success" className="small-button">Finish game</Button>
							</span>
              ) : null}
              <div/>
            </div>
            <hr/>
            <div>
              {this.state.showOverview ? (
                <div className="mobile-navigation-back-to-track">
                  <Button className="small-button" color="success" onClick={() => this.hideOverview()}>Back to tracks</Button>
                </div>
              ) : (
                <div className="mobile-navigation">
                <Button className="small-button" color="success" style={{ marginLeft: 10}} onClick={() => this.showPrevTrack()}>Previous track</Button>
                <Button className="small-button" color="success" onClick={() => this.showOverview()} >Overview</Button>
                <Button className="small-button" color="success" onClick={() => this.showNextTrack()}>Next track</Button>
                </div>
              )}
            </div>
            {content}
          </div>
        </Responsive>
      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldScoretable);
