import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../app/Actions';
import FieldPicker from "./FieldPicker";

const mapStateToProps = state => {
  return {
    fields: state.fields,
    areaFilters: state.areaFilters
  }
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch),
  }

};


export default connect(mapStateToProps, mapDispatchToProps)(FieldPicker);
