import React, { Component } from "react";
import { Helmet } from "react-helmet";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { setActiveTerm } from "../../../../actions/app/meta";
import { fetchCourses } from "../../../../actions/app/courses";
import { fetchAssessments, editAssessment } from "../../../../actions/app/assessments";
import { fetchTasks, editTask } from "../../../../actions/app/tasks";
import PropTypes from "prop-types";

import { Col, Row, Button } from "reactstrap";
import Select from "react-select";

/* Atoms */
import Header from "../../atoms/Header";
import Switch from "../../atoms/Switch";

/* Organisms */
import AuthNav from "../../organisms/AuthNav";
import AppNav from "../../organisms/AppNav";
import List from "../../organisms/List";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

import "./Planner.scss";

class Planner extends Component {
    state = {
        activeTerm: null,
        past: false,
        filteredCourse: null,
        message: null
    };

    static propTypes = {
        // isAuthenticated: PropTypes.bool,
        meta: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        course: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
        assessment: PropTypes.object.isRequired,
        setActiveTerm: PropTypes.func.isRequired,
        fetchCourses: PropTypes.func.isRequired,
        fetchTasks: PropTypes.func.isRequired,
        editTask: PropTypes.func.isRequired,
        fetchAssessments: PropTypes.func.isRequired,
        editAssessment: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { setActiveTerm } = this.props;
        setActiveTerm();
    };

    componentDidUpdate(prevProps, prevState) {
        const { past, filteredCourse } = this.state;
        const { 
            error, 
            meta: { activeTerm }, 
            fetchCourses,
            fetchTasks, 
            fetchAssessments 
        } = this.props;

        if(error !== prevProps.error) {
            if(error.id === "TASKS_ERROR" || error.id === "ASSESSMENTS_ERROR") {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            };
        };

        if(activeTerm !== prevProps.meta.activeTerm) {
            this.setState({ activeTerm });

            fetchCourses(activeTerm._id);
            fetchTasks("terms", activeTerm._id, "?");
            fetchAssessments("terms", activeTerm._id, "?");
        };

        if(past !== prevState.past || filteredCourse !== prevState.filteredCourse) {
            if(past) {
                if(filteredCourse) {
                    fetchTasks("courses", filteredCourse, "?past=true");
                    fetchAssessments("courses", filteredCourse, "?past=true");
                } else {
                    fetchTasks("terms", activeTerm._id, "?past=true");
                    fetchAssessments("terms", activeTerm._id, "?past=true");
                };
            } else {
                if(filteredCourse) {
                    fetchTasks("courses", filteredCourse, "?");
                    fetchAssessments("courses", filteredCourse, "?");
                } else {
                    fetchTasks("terms", activeTerm._id, "?");
                    fetchAssessments("terms", activeTerm._id, "?");
                };
            };
        };
    };

    handleChange = filteredCourse => {
        this.setState({ filteredCourse });
    };

    render() {
        const { activeTerm, filteredCourse } = this.state;
        const { 
            course: { courses },
            task: { tasks },
            assessment: { assessments },
            editTask,
            editAssessment
        } = this.props;
        
        return (
            <>
                <Helmet>
                    <meta name="description" content="User's Planner page."/>
                    <meta name="keywords" content="Learnify, Planner, Tasks, Assessments"/>
                    <title>My Learnify | Planner</title>
                </Helmet>
                <Row id="beta">
                    <Col
                        xs="1"
                        sm="1"
                        md="1"
                        lg="1"
                        xl="1"
                    >
                        <AppNav/>
                    </Col>
                    <Col 
                        id="planner"
                        xs="11"
                        sm="11"
                        md="11"
                        lg="11"
                        xl="11"
                    >
                        <AuthNav/>
                        <Row className="header">
                            <Col>
                                <Header header="Planner"/>
                            </Col>
                            <Col>
                                <Select 
                                    value={filteredCourse}
                                    placeholder="Filter by Course.."
                                    onChange={this.handleChange}
                                    options={courses.map(({ _id, title }) => {
                                        return { value: _id, label: title }
                                    })}
                                />     
                            </Col>
                            <Col>
                                <Switch/>
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
                                        <Row key={_id}>
                                            <Col>
                                                <h4>{title}</h4>
                                                <h5>{course}</h5>
                                            </Col>
                                            <Col>
                                                <p>{type}</p>
                                                <p>{moment(deadline, "MMMM Do, h:mm a")}</p>
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
                                data={assessments.map(({ _id, title, course, type, date: { start, end } }) => {
                                    return (
                                        <Row>
                                            <Col>
                                                <h4>{title}</h4>
                                                <h5>{course}</h5>
                                            </Col>
                                            <Col>
                                                <p>{type}</p>
                                                <p>
                                                    { !end ?
                                                        (moment(start, "MMMM Do, h:mm a"))
                                                    : moment(start).startOf("day") !== moment(end).startOf("day") ?
                                                        ( `${moment(start, "MMMM Do, h:mm a")} - ${moment(end, "MMMM Do, h:mm a")}`)
                                                    : `${moment(start, "MMMM Do, h:mm a")} - ${moment(end, "h:mm a")}`}
                                                </p>
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
                    </Col>
                </Row>
            </>
        );
    };
};

const TaskNew = Loadable({
    loader: () => import(/* webpackChunkName: "TaskNew" */ "../../reactors/TaskNew"),
    loading: () => <Loading/>,
    delay: 300
});

const TaskEdit = Loadable({
    loader: () => import(/* webpackChunkName: "TaskNew" */ "../../reactors/TaskEdit"),
    loading: () => <Loading/>,
    delay: 300
});

const AssessmentNew = Loadable({
    loader: () => import(/* webpackChunkName: "AssessmentNew" */ "../../reactors/AssessmentNew"),
    loading: () => <Loading/>,
    delay: 300
});

const AssessmentEdit = Loadable({
    loader: () => import(/* webpackChunkName: "AssessmentEdit" */ "../../reactors/AssessmentEdit"),
    loading: () => <Loading/>,
    delay: 300
});

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    meta: state.meta,
    error: state.error,
    course: state.course,
    task: state.task,
    assessment: state.assessment
});

const mapDispatchToProps = { 
    setActiveTerm, 
    fetchCourses,
    fetchAssessments, editAssessment, 
    fetchTasks, editTask 
};

export default connect(mapStateToProps, mapDispatchToProps)(Planner);