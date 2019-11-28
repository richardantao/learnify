import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchIntegrations } from "../../../actions/data/settings.action";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "react-bootstrap";

import IntegrationEditModal from "../IntegrationEditModal";
import IntegrationNewModal from "../IntegrationNewModal";

class Integration extends Component {
    state = {
        editModal: false,
        newModal: false,
        integrations: []
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        integrations: PropTypes.object.isRequired,
        fetchIntegrations: PropTypes.func.isRequired
    };

    componentDidMount() {
        // get user's integrations
        this.props.fetchIntegrations();
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
        const { editModal, newModal } = this.state;
        const { integrations } = this.props; 

        const integrationRecords = integrations.map(({ _id}) => (
            <div key={_id}>
                <Button onClick={this.openEditModal}><FontAwesomeIcon icon={faEdit}/></Button>
            </div>
        ));

        return (
            <div id="integrations">
                <Row>
                    <Col>
                        <Button onClick={this.openNewModal}>Add New Integration</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {integrationRecords}
                    </Col>
                </Row>

                { editModal ? (
                    <IntegrationEditModal className="modal"/>                    
                ): null }
                { newModal ? (
                    <IntegrationNewModal className="modal"/>
                ): null }
            </div>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    integrations: state.integrations
});

const mapDispatchToProps = { fetchIntegrations };

export default connect(mapStateToProps, mapDispatchToProps)(Integration);