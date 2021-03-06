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

class GameTypeSelection extends React.Component {

    render() {
        return (
            <Container className='main-container'>
                <div className='main-header'>
                    <Row>
                        <Col>
                            <h1 className='main-title'>Game Type Selection</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small className='subheader'>Select multiplayer (lobby) or local game</small>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col>
                        <Link to='/lobby'>
                            <Button className='main-button'>
                                <h2 className='main-button-header'>Play Online</h2>
                                <small className='main-button-subheader'>(create or join a lobby)</small>
                            </Button>
                        </Link>
                        <Link to='/addplayers'>
                            <Button className='main-button'>
                                <h2 className='main-button-header'>Play Locally</h2>
                                <small className='main-button-subheader'>(on single device)</small>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTypeSelection);
