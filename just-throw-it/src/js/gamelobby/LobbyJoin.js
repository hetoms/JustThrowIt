import React from "react";
import {Button, Container, Col, Row, Input, Label} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import joinLobby from "../api/JoinLobby";

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
};

class LobbyJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbyKey: "",
      redirect: false
    };
    this.onLobbyJoin = this.onLobbyJoin.bind(this);
    this.parseGameData = this.parseGameData.bind(this);
  }
  onLobbyJoin() {
    joinLobby(this.props.user, this.state.lobbyKey).then(resp => this.parseGameData(resp));
  }

  parseGameData(resp) {
    if (resp && resp.success) {
      let gameState = {};
      for (let i = 0; i < resp.gameState.length; i++) {
        gameState["player" + i.toString()] = [resp.gameState[i].playername, JSON.parse(resp.gameState[i].score)]
      }
      console.log("new game state", gameState);
      console.log("props", this.props);
      const isOwner = resp.owner === this.props.user;
      this.props.actions.setGameOnline(true, isOwner, gameState, resp.lobbyKey, resp.fieldId);
      this.setState({
        redirect: true
      })
    } else {
      alert("There is no such game")
    }

  }

    render() {
      if (!this.props.user) {
        alert("kindly fuck off cunt");
        return <Redirect to="/"/>
      }
        return (
            <Container className='main-container'>
                <div className='main-header'>
                    <Row>
                        <Col>
                            <h1 className='main-title'>Join a Lobby </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small className='subheader'>Enter the lobby key given by your friend</small>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col>
                        <Label>Lobby key:</Label>
                        <Input
                            style={{'width': 250 + 'px', 'margin': '0 auto 40px auto'}}
                            onChange={e => this.setState({ lobbyKey: e.target.value})}
                            value={this.state.lobbyKey}
                            type="text"
                            name="lobbykey"
                            id="key"
                            placeholder='enter the lobby key'/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to='/gametype'>
                            <Button className='main-button'>
                                <h5 className='main-button-header'>Cancel</h5>
                            </Button>
                        </Link>
                            <Button className='main-button' onClick={this.onLobbyJoin}>
                                <h5 className='main-button-header'>Join</h5>
                            </Button>
                    </Col>
                </Row>
              {this.state.redirect ? (<Redirect to="/fieldScoretable"/>) : null}
            </Container>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyJoin);
