import React from "react";
import {Button, Container, Col, Row} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import * as Actions from "../app/Actions";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

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
      <Container>
        <Row>
          <Col>
            <h1>Welcome Page</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to='/addplayers'>
              <Button>
                <h2>Play</h2>
                <small>(without logging in)</small>
              </Button>
            </Link>
            <Link to='/login'><Button>
              <h2>Log In</h2>
              <small>(To save your game)</small>
            </Button></Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              No account yet? <Link to='/register'>Register new account</Link>
            </p>
          </Col>
        </Row>
      </Container>
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
