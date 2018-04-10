import React from "react";
import {CardBody, Card, CardHeader, Table, Button} from 'reactstrap';
import {bindActionCreators} from "redux";
import * as Actions from "../app/Actions";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    userLoggedIn: state.userLoggedIn,
    user: state.user,
    selectedField: state.selectedField
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }
};
class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderOverviewTableRows = this.renderOverviewTableRows.bind(this);
  }

  renderOverviewTableRows() {
    return Object.keys(this.props.playerData).map(player => {
      return (
        <tr key={player}>
          <td>{this.props.playerData[player][0]}</td>
          <td>{this.props.playerData[player][1].reduce((a, b) => a + b, 0)}</td>
          <td>{this.props.field.pars}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="track-box">
        <Card>
          <CardHeader>
            <div>
            <span>
              Overview
            </span>

            </div>
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
              {this.renderOverviewTableRows()}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
