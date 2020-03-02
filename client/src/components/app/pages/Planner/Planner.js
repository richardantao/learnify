import React, { Component } from "react";
import { Helmet } from "react-helmet";

/* Redux Operations */
import { connect } from "react-redux";
import { 
    fetchAssessmentsInitialRender,
    fetchAssessmentsByTerm, fetchPastAssessmentsByTerm, 
    fetchAssessmentsByCourse, fetchPastAssessmentsByCourse,
    editAssessment
} from "../../../../actions/app/assessments";
import { 
    fetchTasksInitialRender,
    fetchTasksByTerm, fetchPastTasksByTerm,
    fetchTasksByCourse, fetchPastTasksByCourse,
    editTask
} from "../../../../actions/app/tasks";
import PropTypes from "prop-types";

import { Col, Row, Button } from "reactstrap";

import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";
import Header from "../../organisms/Header";

/* Atoms */


/* Organisms */
import List from "../../organisms/List";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

import "./Planner.scss";

class Planner extends Component {
    state = {
        filter: false,
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
        assessment: PropTypes.object.isRequired,
        fetchTasksInitialRender: PropTypes.func.isRequired,
        fetchTasksByTerm: PropTypes.func.isRequired,
        fetchPastTasksByTerm: PropTypes.func.isRequired,
        fetchTasksByCourse: PropTypes.func.isRequired,
        fetchPastTasksByCourse: PropTypes.func.isRequired,
        editTask: PropTypes.func.isRequired,
        fetchAssessmentsInitialRender: PropTypes.func.isRequired,
        fetchAssessmentsByTerm: PropTypes.func.isRequired,
        fetchPastAssessmentsByTerm: PropTypes.func.isRequired,
        fetchAssessmentsByCourse: PropTypes.func.isRequired,
        fetchPastAssessmentsByCourse: PropTypes.func.isRequired,
        editAssessment: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { fetchAssessmentsInitialRender, fetchTasksInitialRender } = this.props;
        fetchAssessmentsInitialRender();
        fetchTasksInitialRender();
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "TASKS_ERROR" || error.id === "ASSESSMENTS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };
    };

    toggleFilter = () => {
        const { filter } = this.state;
        this.setState({ filter: !filter });
    };

    render() {
        const { filter } = this.state;
        const { 
            task: { tasks },
            assessment: { assessments },
            editTask,
            editAssessment
        } = this.props;
        
        return (
            <>
                <Helmet>
                    <meta name="description" content=""/>
                    <meta name="keywords" content="Learnify, Planner, Tasks, Assessments"/>
                    <title>My Learnify | Planner</title>
                </Helmet>
                <div id="beta">
                    <AuthNav/>
                    <AppNav/>
                    <div id="planner">
                        <Row className="header">
                            <Col>
                                <Header header="Planner"/>
                            </Col>
                            <Col>
                                {/* <Select placeholder="Filter by Course.."> */}
                                    {/* {courseOptions} */}
                                {/* </Select> */}
                            </Col>
                            <Col>
                                <Button onClick={this.handleCurrentItems} className="current">Current</Button>
                                <Button onClick={this.handlePastItems} className="past">Past</Button>
                            </Col>
                        </Row>
                        <Row className="body tasks-body"> 
                            <Col>
                                <h2>Tasks</h2>
                                <TaskNew/>
                            </Col>
                            <Col>
                                <h2>Assessments</h2>
                                <AssessmentNew/>
                            </Col>
                        </Row>
                        <Row>
                            <List
                                id="tasks"
                                class="tasks-list"
                                data={tasks.map(({ _id, title, course, type, deadline }) => {
                                    return (
                                        <Row>
                                            <Col>

                                            </Col>
                                            <Col>
                                            
                                            </Col>
                                            <Col>
                                                <TaskEdit onClick={editTask(_id)}/>
                                            </Col>
                                        </Row>
                                    );
                                })}
                                empty="There are no existing tasks"
                            />
                            <List
                                id="assessments"
                                class="assessments-list"
                                data={assessments.map(({ _id, title, course, type, date }) => {
                                    return (
                                        <Row>
                                            <Col>
                                                
                                            </Col>
                                            <Col>
                                            
                                            </Col>
                                            <Col>
                                                <AssessmentEdit onClick={editAssessment(_id)}/>
                                            </Col>
                                        </Row>
                                    );
                                })}
                                empty="There are no existing assessments"
                            />
                        </Row>
                    </div>
                </div>
            </>
        );
    };
};

const TaskNew = Loadable({
    loader: () => import(/* webpackChunkName: "TaskNew" */ "../../reactors/TaskNew"),
    loading: () => <Loading/>,
    delay: 300
});

const AssessmentNew = Loadable({
    loader: () => import(/* webpackChunkName: "AssessmentNew" */ "../../reactors/AssessmentNew"),
    loading: () => <Loading/>,
    delay: 300
});

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    task: state.task,
    assessment: state.assessment
});

const mapDispatchToProps = { 
    fetchAssessmentsInitialRender,
    fetchAssessmentsByTerm, fetchPastAssessmentsByTerm, 
    fetchAssessmentsByCourse, fetchPastAssessmentsByCourse,
    editAssessment,
    fetchTasksInitialRender,
    fetchTasksByTerm, fetchPastTasksByTerm,
    fetchTasksByCourse, fetchPastTasksByCourse,
    editTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Planner);