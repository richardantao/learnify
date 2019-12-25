import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchTerms } from "../../../../actions/data/terms";
import PropTypes from "prop-types";

import { Col, Row } from "reactstrap";

import Moment from "react-moment";

import TermEditModal from "../TermEditModal";

import "./Terms.scss";

class Terms extends Component {
    state = {

    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        term: PropTypes.object.isRequired,
        fetchTerms: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { fetchTerms } = this.props;

        fetchTerms();
    };

    render() {
        const { terms } = this.props.term; 

        const termRecords = terms.map(({ _id, title, date }) => (
            <Row key={_id}>
                <Col>
                    <h5>{title}</h5>
                </Col>
                <Col>
                    <h6><Moment format="dddd, MMMM Do">{date.start}</Moment></h6>
                    <h6><Moment format="dddd, MMMM Do">{date.end}</Moment></h6>
                </Col>
                <Col>
                    <TermEditModal onClick={this.editModal.bind(this, _id)}/>
                </Col>
            </Row>
        ));

        return (
           <Col id="terms">
               {termRecords}
           </Col>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    term: state.term
});

const mapDispatchToProps = { fetchTerms };

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
