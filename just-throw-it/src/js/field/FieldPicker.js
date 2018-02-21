import React from 'react';
import "../../style/FieldPicker.css";
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button, CardDeck
} from 'reactstrap';
import {Link} from "react-router-dom";
import MyMapComponent from "../map/GoogleMap";

class FieldPicker extends React.Component {

	pickField(id) {
		this.props.actions.pickField(id)
	}

	renderAllFields() {
		return this.props.fields.map(field => {
			return (
				<Card key={field.FieldID} className="field-card">
					<CardImg top width="10%"
							 /*Placeholder*/
							 src="http://discgolfanswerman.com/wp-content/uploads/2017/12/Cool.jpg"
							 alt="Card image cap"/>
					<CardBody>
						<CardTitle>{field.FieldName}</CardTitle>
						<CardSubtitle>Number of fields {field.NumberOfTracks}</CardSubtitle>
						<CardText>Some quick example text to build on the card title and make up the bulk of the card's
							content.</CardText>
						<Link to='/fieldScoretable' numberOfTracks={field.NumberOfTracks}><Button onClick={() =>this.pickField(field.FieldID)}>OK</Button></Link>
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
        <MyMapComponent isMarkerShown={true} lat={-34.397} lng={150.644} />
			</div>
		)
	}
}

export default FieldPicker;