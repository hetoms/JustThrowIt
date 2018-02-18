import React from 'react';
import "../../style/FieldPicker.css";
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button, CardDeck
} from 'reactstrap';

class FieldPicker extends React.Component {

	renderAllFields() {
		return this.props.fields.map(field => {
			return (<div key={field.FieldID} className="col-sm col-md-4">
				<Card key={field.FieldID} className="field-card">
					<CardImg top width="10%"
							 src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
							 alt="Card image cap"/>
					<CardBody>
						<CardTitle>{field.FieldName}</CardTitle>
						<CardSubtitle>Number of fields {field.NumberOfTracks}</CardSubtitle>
						<CardText>Some quick example text to build on the card title and make up the bulk of the card's
							content.</CardText>
						<Button>Pick field</Button>
					</CardBody>
				</Card>
			</div>)
		})
	}

	render() {
		return (
			<div className="container">
				<h2>Please pick a field</h2>
				<hr/>
				<div className="row justify-content-center">
					<CardDeck>
						{this.renderAllFields()}
					</CardDeck>
				</div>
			</div>
		)
	}
}

export default FieldPicker;