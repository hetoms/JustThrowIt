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
            return <Redirect to="/gametype"/>;
        }

        return (
            <Container className='main-container'>
                <div className='main-header'>
                    <Row>
                        <Col>
                            <h1 className='main-title'>Disc Golf Score Tracking App</h1>
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
                        <Link to='/gametype'>
                            <Button className='main-button'>
                                <h2 className='main-button-header'>Play</h2>
                                <small className='main-button-subheader'>(without logging in)</small>
                            </Button>
                        </Link>
                        <Link to='/login'>
                            <Button className='main-button'>
                                <h2 className='main-button-header'>Log In</h2>
                                <small className='main-button-subheader'>(To save your game)</small>
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
