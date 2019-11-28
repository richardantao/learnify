import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchYears } from "../../../actions/data/years.action";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

import "./Years.scss";

class Years extends Component {
    state = {

    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        year: PropTypes.object.isRequired,
        fetchYears: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetchYears();
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

        const yearRecords = years.map(({_id, title}) => (
            <div key={_id} onClick={this.openEditModal}><FontAwesomeIcon icon={faEdit}/></div>
        ));

        return (
            <Select>
                {yearRecords}
            </Select>
        ); 
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    year: state.year
});

const mapDispatchToProps = { fetchYears };

export default connect(mapStateToProps, mapDispatchToProps)(Years);