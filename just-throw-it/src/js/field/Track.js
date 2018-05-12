import React from "react";
import {CardBody, Card, CardHeader, Button, Table} from 'reactstrap';
import "../../style/Track.css";
import {bindActionCreators} from "redux";
import * as Actions from "../app/Actions";
import {connect} from "react-redux";
import {equals} from "ramda";
import postNewScore from "../api/PostScore";

const mapStateToProps = state => {
  return {
    playerData: state.playerData,
    isOnlineGame: state.isOnlineGame,
    onlineGameFinished: state.onlineGameFinished,
    lobbyKey: state.lobbyKey,
    user: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
};

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackNumber: this.props.track.trackNumber,
      playerData: this.props.playerData
    };

    this.decreaseThrows = this.decreaseThrows.bind(this);
    this.increaseThrows = this.increaseThrows.bind(this);
    this.renderPlayerPoints = this.renderPlayerPoints.bind(this);
  }

  parseGameData(resp) {
    let gameState = {};
    let hasFinished = false;
    for (let i = 0; i < resp.gameState.length; i++) {
      gameState["player" + i.toString()] = [resp.gameState[i].playername, resp.gameState[i].score]
      if(resp.gameState[i].playername === this.props.user) {
        hasFinished = resp.gameState[i].hasFinished
      }
    }
    console.log("new game state", gameState, " finished", hasFinished);
    this.props.actions.updateOnlinegame(gameState, hasFinished);
  }

  postScore(throws, track, hasFinished) {
    const {
      lobbyKey,
      user
  } = this.props;
    console.log("eem what");
    postNewScore(user, track, throws, hasFinished, lobbyKey).then(resp => this.parseGameData(resp));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("oh god");
    console.log("what the fuck", this.props);
    if (!equals(this.props, nextProps)) {
      console.log("oh god send help wtf");

      this.setState({
        trackNumber: nextProps.track.trackNumber,
        playerData: nextProps.playerData
      });
    }
  }

  increaseThrows(player) {
    let throws = this.state.playerData[player][1][this.state.trackNumber - 1] + 1;
    if (this.props.isOnlineGame) {
      this.postScore(throws, this.state.trackNumber, false)
    }
    this.props.actions.saveThrow(player, this.state.trackNumber, throws);
    this.setState({
      playerData: this.props.playerData
    })
  }

  decreaseThrows(player) {
    if (this.state.playerData[player][1][this.state.trackNumber - 1] > 0) {
      let throws = this.state.playerData[player][1][this.state.trackNumber - 1] - 1;
      if (this.props.isOnlineGame) {
        this.postScore(throws, this.state.trackNumber, false)
      }
      this.props.actions.saveThrow(player, this.state.trackNumber, throws);
      this.setState({
        playerData: this.props.playerData
      })
    }
  }

  renderPlayerPoints() {
    const {
      isOnlineGame,
      user,
      onlineGameFinished
    } = this.props;
    return (
      <Table responsive>
        <tbody>
        {Object.keys(this.props.playerData).map(player => {
          return (
            <tr key={player}>
              <th> {this.state.playerData[player][0]}</th>
              <td> Throws: {this.state.playerData[player][1][this.state.trackNumber - 1]}</td>
              {console.log(!isOnlineGame || (user === this.state.playerData[player][0]), this.state.playerData[player][0] )}
              {!isOnlineGame || (user === this.state.playerData[player][0] && !onlineGameFinished) ? (
                <td className="throws-buttons-container">
                  <Button color="danger" className="decrease-btn" onClick={() => this.decreaseThrows(player)}>-</Button>
                  <Button color="success" className="increase-btn" onClick={() => this.increaseThrows(player)}>+</Button>
                </td>
              ) : <td/> }
            </tr>
          )
        })}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div className="track-box">
        <Card>
          <CardHeader>
            Track {this.props.track.trackNumber} (par: {this.props.track.trackPar})
          </CardHeader>
          <CardBody style={{ paddingLeft: 0, paddingRight: 0}}>
            {this.renderPlayerPoints()}
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);