import React from "react";
import {Button, Container, Col, Row} from 'reactstrap';
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

class LobbyCreation extends React.Component {

    render() {
        return (
            <Container className='main-container'>
                <div className='main-header'>
                    <Row>
                        <Col>
                            <h1 className='main-title'>Your lobby key is <b>666</b> </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small className='subheader'>Waiting for players to join...</small>
                        </Col>
                    </Row>
                </div>
                <h3>Joined players:</h3>
                <ul>
                    <li>Indrek</li>
                    <li>Fred</li>
                    <li>Henrik</li>
                    <li>...</li>
                </ul>
                <Row>
                    <Col>
                        <Link to='/gametype'>
                            <Button className='main-button'>
                                <h5 className='main-button-header'>Cancel</h5>
                            </Button>
                        </Link>
                        <Link to='/addplayers'>
                            <Button className='main-button'>
                                <h5 className='main-button-header'>Start</h5>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyCreation);
