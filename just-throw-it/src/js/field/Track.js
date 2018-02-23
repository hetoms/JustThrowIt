import React from "react";
import {CardBody, Card, CardHeader} from 'reactstrap';

export default class Track extends React.Component {
	render() {
		return (
			<div style={{position: "-webkit-sticky", position: "sticky", top: "0", zIndex: "100"}}>
				<Card>
					<CardHeader>
						Track: {this.props.track.trackNumber}
					</CardHeader>
					<CardBody>
						Par: {this.props.track.trackPar} <br/>
						Anim pariatur cliche reprehenderit,
						enim eiusmod high life accusamus terry richardson ad squid. Nihil
						anim keffiyeh helvetica, craft beer labore wes anderson cred
						nesciunt sapiente ea proident.
					</CardBody>
				</Card>
			</div>

		)
	}
}