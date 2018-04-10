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

	saveGame() {
    const postdata = {};
    postdata.username = this.props.user;
    postdata.fieldId = this.props.selectedField;
    const data = [];
    const playerdata = this.props.playerData;
    Object.keys(playerdata).forEach(key => (data.push({playerName: playerdata[key][0], throws: playerdata[key][1].reduce((a, b) => a + b, 0)})));
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

      console.log('reeeee', JSON.stringify(data));
      if (JSON.stringify(data) === 'true') {
        console.log('game saved, reeeee')
      } else {
        console.error("saving game failed, reeee");
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

    return (
      <div className="container">
        <div className="header-box">
          <Link className="back-btn" to='/pickField'><Button color="success">Back</Button></Link>
          <h2>{this.props.field.fieldName} DiscGolf field</h2>
						{this.props.userLoggedIn ? (
							<span className="back-btn">
								<Button onClick={this.saveGame} color="success" >Finish game</Button>
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
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldScoretable);
