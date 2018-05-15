import React from "react";
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {Button, Form, Label, Input} from 'reactstrap';
import {bindActionCreators} from "redux";
import {Link} from 'react-router-dom';
import "../../style/SetName.css";
import GoX from 'react-icons/lib/go/x';

let count = 1;

const mapStateToProps = state => {
  return {
    mainPlayer: state.mainPlayer,
    playerData: state.playerData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
};

class SetName extends React.Component {
  constructor() {
    super();

    this.getPlayerNameInputs = this.getPlayerNameInputs.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  setNameAndRedirect = (event) => {
    event.preventDefault();
  };

  componentWillMount() {
    if (Object.keys(this.props.playerData).length === 0) {
      this.props.actions.setName('player1', "");
    }
  };

  addPlayer(event) {
    event.preventDefault();
    this.props.actions.setName('player' + ++count, "");
  };

  handleDeleteRow(rowName) {
    if (Object.keys(this.props.playerData).length > 1) {
      this.props.actions.deletePlayer(rowName);
    }
  }

  getPlayerNameInputs() {
    return Object.keys(this.props.playerData).map((player) => {
      return (
        <div className="player-input" key={player}>
          <Input name="playerName"
                 id={player}
                 key={player}
                 className="playerName"
                 maxLength="10"
                 value={this.props.playerData[player][0]}
                 placeholder="Your name" required
                 onChange={event => this.props.actions.setName(event.target.id, event.target.value)}/>

          <Button onClick={() => this.handleDeleteRow(player)} color='danger' className="remove-input-btn"><GoX
            className="remove-icon"/></Button>

        </div>
      )
    })
  };

  resetFields() {
    this.props.actions.clearPlayerData();
    this.props.actions.setName('player1', "");
  };

  render() {
    return (
      <div className="form-box container">
        <Form className='set-name' onSubmit={this.setNameAndRedirect}>
          <Label for="playerName" className="mr-sm-2 player-name-label">Add players: </Label>
          {this.getPlayerNameInputs()}
          <Button color="info" onClick={event => this.addPlayer(event)}>+</Button>
        </Form>
        <div className="buttons">
          <div className="confirm-btn">
            <Button color="success" onClick={event => this.resetFields()}>Reset</Button>
          </div>
          <div className="confirm-btn">
            <Link to='/pickField'><Button color="success">Continue</Button></Link>
          </div>
        </div>
      </div>
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetName);
