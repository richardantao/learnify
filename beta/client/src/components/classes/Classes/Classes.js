import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchClasses } from "../../../actions/data/classes.action";
import PropTypes from "prop-types";

import "./Classes.scss";

class Classes extends Component {
    
    state = {

    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        fetchClasses: PropTypes.func.isRequired
    };

    componentDidMount() {
        
    };
    
    render() {
        return (
            <div></div>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error,
    classes: state.classes
});

const mapDispatchToProps = {
    fetchClasses
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);