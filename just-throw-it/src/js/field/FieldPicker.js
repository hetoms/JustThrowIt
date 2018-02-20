import React from 'react';
import "../../style/FieldPicker.css";
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button, CardDeck
} from 'reactstrap';

class FieldPicker extends React.Component {

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
						<Button>Pick field</Button>
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
			</div>
		)
	}
}

export default FieldPicker;