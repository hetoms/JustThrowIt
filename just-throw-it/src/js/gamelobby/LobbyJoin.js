import React from "react";
import {Button, Container, Col, Row, Input, Label} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
};

class LobbyJoin extends React.Component {

    render() {
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
                            onChange={e => console.log(e.target.value)}
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
                        <Link to='/addplayers'>
                            <Button className='main-button'>
                                <h5 className='main-button-header'>Join</h5>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyJoin);
