import React from "react";
import {Button, Nav, NavLink, NavItem} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import Track from "./Track";
import Overview from "./Overview";
import "../../style/FieldScoretable.css";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import * as Actions from "../app/Actions";
import {connect} from "react-redux";
import Responsive from 'react-responsive';
import {find, propEq} from "ramda";
import postNewScore from "../api/PostScore";
import forceFinishGame from "../api/ForceFinishGame";

const saveGameUrl = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/userHistory';

const mapStateToProps = state => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user,
    selectedField: state.selectedField,
    isOnlineGame: state.isOnlineGame,
    lobbyKey: state.lobbyKey,
    isOnlineGameOwner: state.isOnlineGameOwner,
    onlineGameFinished: state.onlineGameFinished
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
    this.reloadScores = this.reloadScores.bind(this);
    this.parseGameData = this.parseGameData.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
    this.forceFinish = this.forceFinish.bind(this);

    this.state = {
      displayedTrack: this.props.field.tracks[0],
      showOverview: false,
      timer: null,
      hasAlerted: false,
      redirectToHistory: false
    }
  }

  componentDidMount() {
    console.log("game online", this.props.isOnlineGame);

    if (this.props.isOnlineGame) {
      let timer = setInterval(this.reloadScores, 3000);
      this.setState({timer});
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  reloadScores() {
    console.log("game reloaded");

    postNewScore(null, null, null, this.props.onlineGameFinished, this.props.lobbyKey).then(resp => this.parseGameData(resp));
  }

  handleEndGame() {
    postNewScore(this.props.user, null, null, true, this.props.lobbyKey).then(resp => this.parseGameData(resp));
  }

  forceFinish() {
    forceFinishGame(this.props.user, this.props.lobbyKey).then(resp => console.log(resp));
  }

  parseGameData(resp) {
    if (resp.success) {
      let gameState = {};
      let hasFinished = false;
      console.log("resp", resp);
      for (let i = 0; i < resp.gameState.length; i++) {
        gameState["player" + i.toString()] = [resp.gameState[i].playername, resp.gameState[i].score];
        if(resp.gameState[i].playername === this.props.user) {
          hasFinished = resp.gameState[i].hasFinished
        }
      }
      console.log("new game state", gameState, " finished", hasFinished);
      this.props.actions.updateOnlinegame(gameState, hasFinished);
      if (hasFinished && !this.state.hasAlerted) {
        alert("Game has ended, when all players have ended it will appear under your history aswell");
        this.setState({
          hasAlerted: true
        });
      }
    } else {
      alert("all players have ended their games, redirecting to history");
        this.setState({
          redirectToHistory: true
        });
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
    if (!this.props.isOnlineGame) {
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
    } else {

      console.log("tRAIINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
      this.handleEndGame();
    }

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

    const {
      isOnlineGame,
      lobbyKey
    } = this.props;
    if (this.state.redirectToHistory) {
      return <Redirect to="/user"/>
    }

    return (
      <div>
        <Responsive minWidth={700}>
          <div className="container">
            <div className="header-box">
              {isOnlineGame ? <h3>Your lobby key: {lobbyKey}</h3> : (<Link className="back-btn" to='/pickField'><Button color="success">Back</Button></Link>)}
              <h2>{this.props.field.fieldName} DiscGolf field</h2>
              {this.props.userLoggedIn ? (
                <span className="back-btn">
								<Button onClick={this.saveGame} color="success">Finish game</Button>
							</span>
              ) : null}
              {this.props.userLoggedIn && this.props.isOnlineGameOwner ? (
                <Button onClick={this.forceFinish} color="success" className="small-button">Force finish all players</Button>
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
