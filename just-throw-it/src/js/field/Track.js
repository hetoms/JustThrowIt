import React from "react";
import {Collapse, Button, CardBody, Card} from 'reactstrap';

export default class Track extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			collapse: false
		};
	}

	toggle() {
		this.setState({collapse: !this.state.collapse});
	}

	render() {
		return (
			<div>
				<Button block color="primary" onClick={this.toggle}
						style={{marginBottom: '1rem'}}>Track: {this.props.track.TrackNumber}</Button>
				<Collapse isOpen={this.state.collapse}>
					<Card>
						<CardBody>
							Par: {this.props.track.TrackPar} <br/>
							Anim pariatur cliche reprehenderit,
							enim eiusmod high life accusamus terry richardson ad squid. Nihil
							anim keffiyeh helvetica, craft beer labore wes anderson cred
							nesciunt sapiente ea proident.
						</CardBody>
					</Card>
				</Collapse>
			</div>

		)
	}
}


