import React from 'react';
import "../../style/FieldPicker.css";
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button, CardDeck
} from 'reactstrap';
import {Link} from "react-router-dom";
import getFields from "../api/GetFields";
import {APIKey} from "../api/APIKey";
import MapModal from "../map/MapModal";

console.log(getFields());

class FieldPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      fieldInModal: {fieldName: 'Something went wrong'}
    };
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal(field) {
    this.setState({
      fieldInModal: field,
      modalOpen: !this.state.modalOpen
    })
  }

	pickField(id) {
		this.props.actions.pickField(id)
	}

	renderAllFields() {
		return this.props.fields.map(field => {
			return (
				<Card key={field.fieldID} className="field-card">
          <div onClick={() => this.toggleModal(field)}>
					<CardImg
						className="img-maps"
						top width="10%"
						/*Placeholder*/
                   		src={"https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=600x300&markers="
                   		+ field.latitude + "," + field.longitude + "&key=" + APIKey}
						alt="Card image cap"/>
          </div>
					<CardBody>
						<CardTitle>{field.fieldName}</CardTitle>
						<CardSubtitle>Number of tracks {field.numberOfTracks}</CardSubtitle>
						<CardSubtitle>Track par {field.pars}</CardSubtitle>
						<CardText>Some quick example text to build on the card title and make up the bulk of the card's
							content.</CardText>
						<Link to='/fieldScoretable' numberOfTracks={field.numberOfTracks}><Button onClick={() =>this.pickField(field)}>Select</Button></Link>
					</CardBody>
				</Card>
			)
		})
	}

	render() {
		return (
			<div className="container">
				<h2>Please pick a field</h2>
				<hr/>
				<CardDeck className='card-deck'>
					{this.renderAllFields()}
				</CardDeck>

        <MapModal modalOpen={this.state.modalOpen} toggle={this.toggleModal} field={this.state.fieldInModal} />
			</div>
		)
	}
}

export default FieldPicker;
