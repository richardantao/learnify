import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { createTask } from "../../../../actions/beta/tasks";
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
        // isAuthenticated: PropTypes.bool,
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
        const { classCount, taskCount, assessmentCount } = this.props; 

        return (
            <Fragment>
                <Col className="dashboard-header">
                    <h3>Today</h3>
                    <DateDisplay/>
                    { classCount === 1 ? (
                        <Counter type="Class" count={classCount}/>
                    ): 
                        <Counter type="Classes" count={classCount}/>
                    }
                </Col>
                <Col className="dashboard-header">
                    <h3>Tasks</h3>
                    <Button onClick={this.newTaskModal}><FontAwesomeIcon icon={faPlus}/> New Task</Button>
                    { taskCount === 1 ? (
                        <Counter type="Task" count={taskCount}/>
                    ): 
                        <Counter type="Tasks" count={taskCount}/>
                    }
                </Col>
                <Col className="dashboard-header">
                    <h3>Assessments</h3>
                    { assessmentCount === 1 ? (
                        <Counter type="Assessment" count={assessmentCount}/>
                    ): 
                        <Counter type="Assessments" count={assessmentCount}/>
                    }
                </Col>

                { open ? (
                    <TaskNewModal className="modal"/>
                ): null }
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { createTask };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
