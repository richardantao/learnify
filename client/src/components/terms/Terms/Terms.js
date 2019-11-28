import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchTerms } from "../../../actions/data/terms.action";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "reactstrap";

import EditModal from "../TermEditModal";
import NewModal from "../TermNewModal";

import "./Terms.scss";

class Terms extends Component {
    state = {

    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        term: PropTypes.object.isRequired,
        fetchTerms: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetchTerms();
    };

    openEditModal = () => {
        this.setState({
            editModal: true
        });
    };

    render() {
        const { terms } = this.props.term; 

        const termRecords = terms.map(({ _id, title, start, end }) => (
            <Row key={_id}>
                <Col>
                    <h5>{title}</h5>
                </Col>
                <Col>
                    <h6>{start}</h6>
                    <h6>{end}</h6>
                </Col>
                <Col>
                    <Button onClick={this.openEditModal}><FontAwesomeIcon icon={faEdit}/></Button>
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    term: state.term
});

const mapDispatchToProps = { fetchTerms };

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
