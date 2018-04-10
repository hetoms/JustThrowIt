import React from "react";
import {CardBody, Card, CardHeader, Table, Button} from 'reactstrap';
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
class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderOverviewTableRows = this.renderOverviewTableRows.bind(this);
    this.saveGame = this.saveGame.bind(this);
  }

  renderOverviewTableRows() {
    return Object.keys(this.props.playerData).map(player => {
      return (
        <tr key={player}>
          <td>{this.props.playerData[player][0]}</td>
          <td>{this.props.playerData[player][1].reduce((a, b) => a + b, 0)}</td>
          <td>{this.props.field.pars}</td>
        </tr>
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
        console.log('fucking response ', response[0]);
        return response.json();
      }).then((data) => {

      // check if registration was valid
      console.log('reeeee', JSON.stringify(data));
      if (JSON.stringify(data) === 'Passed') {
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
    return (
      <div className="track-box">
        <Card>
          <CardHeader>
            <div>
            <span>
              Overview
            </span>
              {this.props.userLoggedIn ? (
                <span >
              <Button onClick={this.saveGame} color="primary" >Finish game</Button>
            </span>
              ) : null}
            </div>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead>
              <tr>
                <th>Name</th>
                <th>Throws</th>
                <th>Par</th>
              </tr>
              </thead>
              <tbody>
              {this.renderOverviewTableRows()}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);