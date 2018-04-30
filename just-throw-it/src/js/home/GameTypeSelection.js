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
        if (this.props.userLoggedIn) {
            return <Redirect to="/addPlayers"/>;
        }

        return (
            <Container className='homepage-container'>
                <div className='homepage-header'>
                    <Row>
                        <Col>
                            <h1 className='homepage-title'>Game Type Selection</h1>
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
                            <Button className='homepage-button'>
                                <h2>Play Online</h2>
                                <small className='homepage-button-header'>(create or join a lobby)</small>
                            </Button>
                        </Link>
                        <Link to='/addplayers'>
                            <Button className='homepage-button'>
                                <h2>Play Locally</h2>
                                <small className='homepage-button-header'>(on single device)</small>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTypeSelection);
