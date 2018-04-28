import React from "react";
import {Button, Container, Col, Row} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import '../../style/Homepage.css';

const mapStateToProps = state => {
    return {
        userLoggedIn: state.userLoggedIn,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(Actions, dispatch),
    }
};

class HomePage extends React.Component {

    render() {
        if (this.props.userLoggedIn) {
            return <Redirect to="/addPlayers"/>;
        }

        return (
            <Container className='homepage-container'>
                <div className='homepage-header'>
                    <Row>
                        <Col>
                            <h1 className='homepage-title'>Disc Golf Score Tracking App</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small className='subheader'>Select a disc golf field where you want to play and start
                                adding your throws
                            </small>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col>
                        <Link to='/addplayers'>
                            <Button className='homepage-button'>
                                <h2>Play</h2>
                                <small className='homepage-button-header'>(without logging in)</small>
                            </Button>
                        </Link>
                        <Link to='/login'>
                            <Button className='homepage-button'>
                                <h2>Log In</h2>
                                <small className='homepage-button-header'>(To save your game)</small>
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col className='homepage-register'>
                        No account yet? <Link to='/register'>Register a new account</Link>
                    </Col>
                </Row>
            </Container>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
