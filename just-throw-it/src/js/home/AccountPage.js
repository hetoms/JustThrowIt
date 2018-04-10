import React from 'react';
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Button, Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row, Table} from "reactstrap";
import getUserdata from "../api/GetUserData";
import '../../style/AccountPage.css';
import getUserHistory from "../api/GetUserHistory";
import {isEmpty} from "ramda";

const mapStateToProps = state => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user,
    fields: state.fields
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
};

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfoSelected: true,
      id: "",
      email: "",
      name: "",
      history: [],
      gameInView: {}
    };
    this.onReceiveUserData = this.onReceiveUserData.bind(this);
    this.onReceiveHistory = this.onReceiveHistory.bind(this);
    this.renderHistoryOptions = this.renderHistoryOptions.bind(this);
    this.showGame = this.showGame.bind(this);
    getUserdata(this.props.user, this.onReceiveUserData);
    getUserHistory(this.props.user, this.onReceiveHistory);
  }

  onReceiveUserData(data) {
    this.setState(data);
  }

  onReceiveHistory(data) {
    console.log(data);
    this.setState({
      history: data,
      gameInView: data[0]
    })
  }

  showGame(game) {
    this.setState({
      gameInView: game
    })
  }

  renderHistoryOptions() {
    if (!isEmpty(this.state.history)) {
      return this.state.history.map((game, iterator) => {
        const trackName = this.props.fields.find(field => field.fieldID.toString() === game.fieldId).fieldName;
        return (
          <NavItem className="track" key={game.fieldId.toString() + iterator.toString()}>
            <NavLink href="#" onClick={() => this.showGame(game)}
                     active={this.state.gameInView === game}>{game.date + " " + trackName}</NavLink>
          </NavItem>
        )
      })
    } else {
      return null;
    }

  }

  renderGameOverview() {
    const trackName = !isEmpty(this.state.history) ?
      this.props.fields.find(field => field.fieldID.toString() === this.state.gameInView.fieldId).fieldName : "No history to display";   
    return (
      <div className="track-box">
        <Card>
          <CardHeader>
            {trackName}
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
              {!isEmpty(this.state.history) ? this.renderOverviewTableRows() : null}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }

  renderOverviewTableRows() {
    console.log('field that I am looking for ', this.state.gameInView.fieldId);
    console.log('all dem fields', this.props.fields);
    const par = this.props.fields.find(field => field.fieldID.toString() === this.state.gameInView.fieldId).pars;
    return JSON.parse(this.state.gameInView.data).map((player, iterator) => {
      return (
        <tr key={player + iterator.toString()}>
          <td>{player.playerName}</td>
          <td>{player.throws}</td>
          <td>{par}</td>
        </tr>
      )
    })
  }

  renderPlayerHistory() {
    return (
      <div className="container">
        <div className="header-box">
          <h2> History</h2>
          <div/>
        </div>
        <hr/>
        <div className="tracks-container">
          <div className="tracks-nav">
            <Nav pills vertical>
              {this.renderHistoryOptions()}
            </Nav>
          </div>
          <div className="track-info">
            {this.renderGameOverview()}
          </div>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div className='account-page'>
        <div className='account-page-buttons'>
          <Button color="primary" className='profile-button' onClick={() => this.setState({userInfoSelected: true})}>Show
            Profile</Button>
          <Button color="primary" className='history-button' onClick={() => this.setState({userInfoSelected: false})}>Show
            Match History</Button>
        </div>
        {this.state.userInfoSelected ? (
          <div className='profile'>
            <h3>Your Profile</h3>
            <hr/>
            <Container className="userinfo">
              <Row className='data-row'>
                <Col xs="6"><h5>User id:</h5></Col>
                <Col xs="6"><h6>{this.state.id}</h6></Col>
              </Row>
              <Row className='data-row'>
                <Col xs="6"><h5>Username:</h5></Col>
                <Col xs="6"><h6>{this.props.user}</h6></Col>
              </Row>

              <Row className='data-row'>
                <Col xs="6"><h5>Email address:</h5></Col>
                <Col xs="6"><h6>{this.state.email}</h6></Col>
              </Row>
              <Row className='data-row'>
                <Col xs="6"><h5>Name:</h5></Col>
                <Col xs="6"><h6>{this.state.name}</h6></Col>
              </Row>
            </Container>
          </div>
        ) : (
          this.renderPlayerHistory()
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
