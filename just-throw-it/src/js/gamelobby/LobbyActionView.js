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

class LobbyActionView extends React.Component {

    render() {
        return (
            <Container className='main-container'>
                <div className='main-header'>
                    <Row>
                        <Col>
                            <h1 className='main-title'>Would you like to Create or Join a lobby?</h1>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col>
                        <Link to='/create-lobby'>
                            <Button className='main-button'>
                                <h2 className='main-button-header'>Create Lobby</h2>
                                <small className='main-button-subheader'>(share the key with your friends)</small>
                            </Button>
                        </Link>
                        <Link to='/join-lobby'>
                            <Button className='main-button'>
                                <h2 className='main-button-header'>Join Lobby</h2>
                                <small className='main-button-subheader'>(join friend's game by entering the key)</small>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyActionView);
