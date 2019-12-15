import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchYears } from "../../../actions/data/years.action";
import { fetchTerms } from "../../../actions/data/terms.action";
import PropTypes from "prop-types";

import { Input } from "reactstrap";

import "./Years.scss";

class Years extends Component {
    state = {

    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        year: PropTypes.object.isRequired,
        fetchYears: PropTypes.func.isRequired,
        fetchTerms: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetchYears();
    };

    componentDidUpdate() {

    };

    handleChange = yearId => {
        console.log("yearId is " + yearId)
        this.props.fetchTerms(yearId);
        
        this.setState({

        });
    };

    openEditModal = () => {
        this.setState({
            editModal: true
        });
    };  

    openNewModal = () => {
        this.setState({
            newModal: true
        });
    }; 

    render() {
        const { years } = this.props.year;

        const yearRecords = years.map(({ _id, title }) => (
            <option key={_id} value={title}>
                {title}
            </option>
        ));

        return (
            <Input type="select" name="select" id="year" onChange={this.handleChange.bind(this, years._id)}>
                {yearRecords}
            </Input>
        );             
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    year: state.year
});

const mapDispatchToProps = { fetchYears, fetchTerms };

export default connect(mapStateToProps, mapDispatchToProps)(Years);