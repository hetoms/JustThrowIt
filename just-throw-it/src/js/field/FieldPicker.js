import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardDeck
} from 'reactstrap';

class FieldPicker extends React.Component {

    renderAllFields() {
        return this.props.fields.map(field => {
            return (<Card key={field.FieldID}>
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
            </Card>)
        })
    }

    render() {
        return (
            <CardDeck>
                {this.renderAllFields()}
            </CardDeck>
        )
    }
}

export default FieldPicker;