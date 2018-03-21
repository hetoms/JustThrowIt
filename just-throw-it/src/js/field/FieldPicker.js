import React from 'react';
import "../../style/FieldPicker.css";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardDeck, ButtonGroup, Input
} from 'reactstrap';
import {Link} from "react-router-dom";
import getFields from "../api/GetFields";
import {APIKey} from "../api/APIKey";
import MapModal from "../map/MapModal";
import loadFilters from "../api/LoadFilters";
import {clone, contains, filter, remove} from "ramda";

console.log(getFields());

class FieldPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      fieldInModal: {fieldName: 'Something went wrong'},
      appliedFilters: this.props.areaFilters,
      textFilter: ""
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    loadFilters(this.props.actions.saveAreaFilters);
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
    let fields = this.props.fields;
    const countyFilter = field => contains(field.county, this.state.appliedFilters);
    fields = filter(countyFilter, fields);

    if (this.state.textFilter !== "") {
      let searchKey = clone(this.state.textFilter).toLowerCase();
      console.log('yellow ', searchKey, ' aaaa ', fields);
      fields = fields.filter(field => field.fieldName.toLowerCase().includes(searchKey));
    }

    return fields.map(field => {
      return (
        <Card key={field.fieldID} className="field-card">
          <div onClick={() => this.toggleModal(field)}>
            <CardImg
              className="img-maps"
              top width="10%"
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
            <Link to='/fieldScoretable' numberOfTracks={field.numberOfTracks}><Button
              onClick={() => this.pickField(field)}>Select</Button></Link>
          </CardBody>
        </Card>
      )
    })
  }

  toggleFilter(filter) {
    let filters = this.state.appliedFilters;
    if (contains(filter, filters)) {
      filters = remove(this.state.appliedFilters.indexOf(filter), 1, filters);
      this.setState({
        appliedFilters: filters
      })
    } else {
      filters.push(filter);
      this.setState({
        appliedFilters: filters
      })
    }
    console.log(this.state.appliedFilters, 'look here ')
  }

  renderFilterButtons() {
    return (
      this.props.areaFilters.map(areaFilter => {
        return (
        <Button style={{ textTransform: 'capitalize' }} onClick={() => this.toggleFilter(areaFilter)} className={contains(areaFilter, this.state.appliedFilters) ? "btn btn-info" : "btn btn-secondary"}>
          {areaFilter}
        </Button>
        )
      })
    )
  }
  handleChange(type, value) {
    this.setState({
    [type]: value
    })
  }

  render() {
    return (
      <div className="container">
        <h2>Please pick a field</h2>
        <div>
          <ButtonGroup>
            {this.renderFilterButtons()}
          </ButtonGroup>
          <Input type="text" placeholder="Search" value={this.state.textFilter} onChange={e => this.handleChange('textFilter', e.target.value)}/>
        </div>
        <hr/>
        <CardDeck className='card-deck'>
          {this.renderAllFields()}
        </CardDeck>
        <MapModal modalOpen={this.state.modalOpen} toggle={this.toggleModal} field={this.state.fieldInModal}/>
      </div>
    )
  }
}

export default FieldPicker;
