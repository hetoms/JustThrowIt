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
import {clone, contains, filter, isEmpty, remove} from "ramda";

class FieldPicker extends React.Component {
    constructor(props) {
        super(props);
        getFields();
        this.state = {
            modalOpen: false,
            fieldInModal: {fieldName: 'Something went wrong'},
            appliedFilters: ["all"],
            textFilter: ""
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        loadFilters(this.props.actions.saveAreaFilters);
    }

    toggleModal(field) {
        this.setState({
            fieldInModal: field,
            modalOpen: !this.state.modalOpen
        })
    }

    pickField(id) {
        this.props.actions.pickField(id);
        this.props.actions.setGameOffline();
    }

    renderAllFields() {
        let fields = this.props.fields;
        if (this.state.appliedFilters[0] !== "all") {
            const countyFilter = field => contains(field.county, this.state.appliedFilters);
            fields = filter(countyFilter, fields);
        }


        if (this.state.textFilter !== "") {
            let searchKey = clone(this.state.textFilter).toLowerCase();
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
                        <div className='select-field-btn'>
                            <Link to='/fieldScoretable' numberOfTracks={field.numberOfTracks}>
                                <Button onClick={() => this.pickField(field)}>Select</Button>

                            </Link>
                        </div>
                    </CardBody>
                </Card>
            )
        })
    }

    toggleFilter(filter) {
        let filters = this.state.appliedFilters;
        if (contains(filter, filters)) {
            filters = remove(this.state.appliedFilters.indexOf(filter), 1, filters);
            if (isEmpty(filters)) {
                this.setState({
                    appliedFilters: ["all"]
                })
            } else {
                this.setState({
                    appliedFilters: filters
                })
            }
        } else if (filter === "all") {
            this.setState({
                appliedFilters: ["all"]
            })
        } else {
            filters.push(filter);
            if (contains("all", filters)) {
                filters = remove(this.state.appliedFilters.indexOf("all"), 1, filters);
            }
            this.setState({
                appliedFilters: filters
            })
        }
    }

    renderFilterButtons() {
        return (
            this.props.areaFilters.map(areaFilter => {
                return (
                    <Button key={areaFilter} style={{textTransform: 'capitalize'}}
                            onClick={() => this.toggleFilter(areaFilter)}
                            className={(contains(areaFilter, this.state.appliedFilters) ? "btn btn-info" : "btn btn-secondary") + ' filter-button'}>
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
                <div className='picker-header'>
                    <ButtonGroup className='filter-buttongroup'>
                        <Button onClick={() => this.toggleFilter("all")}
                                className={(contains("all", this.state.appliedFilters) ? "btn btn-info" : "btn btn-secondary") + ' filter-button'}>
                            All
                        </Button>
                        {this.renderFilterButtons()}
                    </ButtonGroup>
                    <Input style={{width: '100%'}} type="text" placeholder="Search" value={this.state.textFilter}
                           onChange={e => this.handleChange('textFilter', e.target.value)}/>
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