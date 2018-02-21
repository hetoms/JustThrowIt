import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../app/Actions';
import FieldScoretable from "./FieldScoretable";

const mapStateToProps = state => {
  return {
    field: state.fields.filter(field => field.FieldID === state.selectedField)[0],
    selectedField: state.selectedField
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }

};


export default connect(mapStateToProps, mapDispatchToProps)(FieldScoretable);
