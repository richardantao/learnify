import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { createTask } from "../../../actions/data/tasks.action";
import PropTypes from "prop-types";

import { Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import TaskNewModal from "../../tasks/TaskNewModal";
import Counter from "../Counter";
import DateDisplay from "../Date";

import "./DashboardHeader.scss";

class DashboardHeader extends Component {
    state = {
        open: false
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        createTask: PropTypes.func.isRequired
    };

    componentDidMount() {
        
    };

    componentDidUpdate() {
        const { error } = this.props;
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    newTaskModal = e => {
        this.setState({
            open: true
        });
    };

    render() {
        const { open } = this.state;

        return (
            <Fragment>
                <Col className="dashboard-header">
                    <h3>Today</h3>
                    <DateDisplay/>
                    <Counter type="Classes" count="5"/>
                </Col>
                <Col className="dashboard-header">
                    <h3>Tasks</h3>
                    <Button onClick={this.newTaskModal}><FontAwesomeIcon icon={faPlus}/> New Task</Button>
                    <Counter type="Tasks" count="3"/>
                </Col>
                <Col className="dashboard-header">
                    <h3>Assessments</h3>
                    <Counter type="Assessments" count="2"/>
                </Col>

                { open ? (
                    <TaskNewModal className="modal"/>
                ): null }
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { createTask };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
