import React, { Component } from "react";
import { Helmet } from "react-helmet";

import moment from "moment";

/* Redux Operations */
import { connect } from "react-redux";
import { setActiveTerm } from "../../../actions/interface/meta";
import { fetchCourses } from "../../../actions/data/courses";
import { 
    fetchTasks, editTask, toggleTaskCompletion, deleteTask 
} from "../../../actions/data/tasks";
import { 
    fetchAssessments, editAssessment, toggleAssessmentCompletion, deleteAssessment 
} from "../../../actions/data/assessments";

import PropTypes from "prop-types";

import { Col, Row, Button, Input } from "reactstrap";
import Select from "react-select";

/* Atoms */
import Header from "../../atoms/Header";
import Switch from "../../atoms/Switch";

/* Organisms */
import List from "../../organisms/List";

import Loadable from "react-loadable";
import Loading from "../../atoms/Loading";

import "./Planner.scss";

class Planner extends Component {
    state = {
        activeTerm: null,
        past: false,
        filter: null,
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
        toggleTaskCompletion: PropTypes.func.isRequired,
        deleteTask: PropTypes.func.isRequired,
        fetchAssessments: PropTypes.func.isRequired,
        editAssessment: PropTypes.func.isRequired,
        toggleAssessmentCompletion: PropTypes.func.isRequired,
        deleteAssessment: PropTypes.func.isRequired
    };

    async componentDidMount() {
        const { setActiveTerm } = this.props;
        await setActiveTerm();
    };

    componentDidUpdate(prevProps, prevState) {
        const { past, filter } = this.state;
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
            fetchTasks("terms", activeTerm._id, "");
            fetchAssessments("terms", activeTerm._id, "");
        };

        if(past !== prevState.past || filter !== prevState.filter) {
            if(past) {
                if(filter) {
                    fetchTasks("courses", filter, "?past=true");
                    fetchAssessments("courses", filter, "?past=true");
                } else {
                    fetchTasks("terms", activeTerm._id, "?past=true");
                    fetchAssessments("terms", activeTerm._id, "?past=true");
                };
            } else {
                if(filter) {
                    fetchTasks("courses", filter, "");
                    fetchAssessments("courses", filter, "");
                } else {
                    fetchTasks("terms", activeTerm._id, "");
                    fetchAssessments("terms", activeTerm._id, "");
                };
            };
        };
    };

    togglePast = () => {
        const { past } = this.state; 
        this.setState({ past: !past});
    };

    handleFilter = filter => {
        this.setState({ filter });
    };

    render() {
        const { activeTerm, filter, past } = this.state;
        const { 
            course: { courses },
            task: { tasks },
            assessment: { assessments },
            editTask, toggleTaskCompletion, deleteTask,
            editAssessment, toggleAssessmentCompletion, deleteAssessment
        } = this.props;
        
        return (
            <>
                <Helmet>
                    <meta name="description" content="User's Planner page."/>
                    <meta name="keywords" content="Learnify, Planner, Tasks, Assessments"/>
                    <title>My Learnify | Planner</title>
                </Helmet>
                <Row id="planner">
                    <Col>
                        <Row className="header">
                            <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                <Header header="Planner"/>
                            </Col>
                            <Col xs="2" sm="2" md="2" lg="2" xl="2">
                                <Switch
                                    primaryRef="#current"
                                    primaryText="Current"
                                    secondaryRef="#past"
                                    secondaryText="Past"
                                    past={past}
                                />
                            </Col>
                            <Col xs="6" sm="6" md="6" lg="6" xl="6">
                                <Select 
                                    value={filter}
                                    placeholder="Filter by Course.."
                                    onChange={this.handleFilter}
                                    options={courses.map(({ _id, title }) => {
                                        return { value: _id, label: title }
                                    })}
                                />     
                            </Col>
                        </Row>
                        <Row>
                            <List
                                id="tasks"
                                className="list"
                                header="Tasks"
                                action={<TaskNew/>}
                                data={tasks.map(({ _id, title, course, type, deadline }) => {
                                    return (
                                        <Row key={_id}>
                                            <Col xs="5" sm="5" md="5" lg="5" xl="5">
                                                <Button onClick={toggleTaskCompletion(_id)}>
                                                    change to check mark
                                                </Button>
                                            </Col>
                                            <Col xs="5" sm="5" md="5" lg="5" xl="5">
                                                <h4>{title}</h4>
                                                <h5>{course.title}</h5>
                                            </Col>
                                            <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                                <p>{type}</p>
                                                <p>{deadline ? moment(deadline, "MMMM Do, h:mm a"): null}</p>
                                            </Col>
                                            <Col xs="2" sm="2" md="2" lg="2" xl="2">
                                                <TaskEdit onClick={editTask(_id)}/>
                                                <Button onClick={deleteTask(_id)}>
                                                    pass in icon
                                                </Button>
                                            </Col>
                                        </Row>
                                    );
                                })}
                                empty="There are no existing tasks"
                            />
                            <List
                                id="assessments"
                                className="list"
                                header="Assessments"
                                action={<AssessmentNew/>}
                                data={assessments.map(({ _id, title, course, type, date: { start, end }, completion }) => {
                                    return (
                                        <Row>
                                            <Col xs="1" sm="1" md="1" lg="1" xl="1">
                                                <Input
                                                    name="completion"
                                                    type="checkbox"
                                                    value={completion} // change to proper rendering
                                                    onChange={toggleAssessmentCompletion(_id)}
                                                />
                                            </Col>
                                            <Col xs="5" sm="5" md="5" lg="5" xl="5">
                                                <h4>{title}</h4>
                                                <h5>{course.title}</h5>
                                            </Col>
                                            <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                                <p>{type}</p>
                                                <p>
                                                    { !end ?
                                                        (moment(start, "MMMM Do, h:mm a"))
                                                    : moment(start).startOf("day") !== moment(end).startOf("day") ?
                                                        ( `${moment(start, "MMMM Do, h:mm a")} - ${moment(end, "MMMM Do, h:mm a")}`)
                                                    : `${moment(start, "MMMM Do, h:mm a")} - ${moment(end, "h:mm a")}`}
                                                </p>
                                            </Col>
                                            <Col xs="2" sm="2" md="2" lg="2" xl="2">
                                                <AssessmentEdit onClick={editAssessment(_id)}/>
                                                <Button onClick={deleteAssessment(_id)}>
                                                        icons
                                                </Button>
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
    fetchAssessments, editAssessment, toggleTaskCompletion, deleteAssessment, 
    fetchTasks, editTask, toggleAssessmentCompletion, deleteTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Planner);