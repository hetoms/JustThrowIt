import React from "react";
import {Button, Container, Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {isEmpty} from "ramda";
import getLobbyKey from "../api/GetLobbyKey";

const mapStateToProps = state => {
    return {
      fields: state.fields,
      lobbyKey: state.lobbyKey,
      user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
};

const initialState = {
  dropdownOpen: false,
  selectedField: {}
};

class LobbyCreation extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleGetLobbyKey = this.handleGetLobbyKey.bind(this);
    }

    handleChange(prop, value) {
        this.setState({
          [prop]: value
        });
    }

  toggle() {
        if (!this.props.lobbyKey) {
          this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
          }));
        }
  }

  handleGetLobbyKey() {
      if (!isEmpty(this.state.selectedField) && this.props.user) {
        console.log(this.props);
        const resp = getLobbyKey(this.props.user, this.state.selectedField.fieldID);
        console.log(resp);
      }
  }

    render() {
      if (!this.props.user) {
        alert("kindly fuck off cunt");
        return <Redirect to="/"/>        
      }
        return (
            <Container className='main-container'>
              {this.props.lobbyKey ? (
                <div className='main-header'>
                  <Row>
                    <Col>
                      <h1 className='main-title'>Your lobby key is <b>{this.props.lobbyKey}</b> </h1>
                    </Col>
                  </Row>
                </div>
              ) : null}

                <h1>Select field:</h1>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {isEmpty(this.state.selectedField) ? "Select Track" : this.state.selectedField.fieldName}
                </DropdownToggle>
                <DropdownMenu
                  style={{
                      height: 400,
                    overflow: 'auto'
                  }}
                >
                  {this.props.fields.map(field => (
                    <DropdownItem onClick={() => this.handleChange("selectedField", field)}>{field.fieldName}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
                <Row style={{ marginTop: 20}}>
                    <Col>
                        <Link to='/gametype'>
                            <Button className='main-button'>
                                <h5 className='main-button-header'>Cancel</h5>
                            </Button>
                        </Link>
                      {this.props.lobbyKey ? (
                        <Button className='main-button'>
                          <h5 className='main-button-header'>Start</h5>
                        </Button>
                      ) : (
                        <Button className='main-button' onClick={this.handleGetLobbyKey}>
                          <h5 className='main-button-header'>Get lobby key</h5>
                        </Button>
                      )}
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyCreation);
