import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from 'prop-types';
import GMap from '../map/GMap'

class MapModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.modalOpen} toggle={this.props.toggle} backdrop={'static'} size="lg">
        <ModalHeader toggle={this.toggle}>{this.props.field.fieldName}</ModalHeader>
        <ModalBody>
          <GMap lat={this.props.field.latitude} lng={this.props.field.longitude}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default MapModal;

MapModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
};