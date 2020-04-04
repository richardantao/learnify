import React from "react";

import moment from "moment";

import { Col, Button, Input } from "reactstrap";

import Loadable from "react-loadable";

/* --- Atoms --- */
import Today from "../../atoms/Today";

/* --- Organisms --- */
import DashboardHeader from "../../organisms/DashboardHeader";
import List from "../../organisms/List";

import "./TabletDashboard.scss";

export default () => {
    return (
		<Col>
			<Row>
				<DashboardHeader heading="Today" extra={<Today/>} type="Classes" count={classes.length}/>
                <DashboardHeader heading="Tasks" extra={<TaskNew/>} type="Tasks" count={tasks.length}/>
                <DashboardHeader heading="Assessments" extra={null} type="Assessments" count={assessments.length}/>
			</Row>
			<Row id="dashboard-columns">
				<List 
                    id="classes" 
                    className="classes-list"
                    needHeader={false}
                    data={classes.map(({ _id, title, course, location, date: { start, end } }) => {
                        return (
                            <Row key={_id}>
                                <Col>
                                    <h4>{title}</h4>
                                    <h5>{course.title}</h5>
                                </Col>
                                <Col>
                                    <p>{location}</p>
                                    <p>
                                        { moment(start).startOf("day") - moment(start) < 60*60*12 && moment(end).startOf("day") - moment(end) > 60*60*12 ? (
                                            `${moment(start, "h:mm a")} - ${moment(end, "h:mm a")}`
                                        ): `${moment(start, "h:mm")} - ${moment(end, "h:mm a")}` }
                                    </p>
                                </Col>
                                <Col>
                                    <ClassEdit onClick={editClass(_id)}/>
                                    <Button onClick={deleteClass(_id)}>
                                        icon
                                    </Button>
                                </Col>
                            </Row>
                        );
                    })}
                />
                <List 
                    id="tasks" 
                    className="tasks-list"
                    needHeader={false}
                    data={tasks.map(({ _id, title, course, type, deadline, completed }) => {
                        return (
                            <Row key={_id}>
                                <Col xs="1" sm="1" md="1" lg="1" xl="1">
                                    <Input	
                                        name="completed"
                                        type="checkbox"
                                        checked={completed}
                                        onChange={toggleTaskCompletion(_id)}
                                    />
                                </Col>
                                <Col xs="5" sm="5" md="5" lg="5" xl="5">
                                    <h4>{title}</h4>
                                    <h5>{course.title}</h5>
                                </Col>
                                <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                    <p>{type}</p>
                                    <p>{moment(deadline, "MMMM Do, h:mm a")}</p>
                                </Col>
                                <Col xs="2" sm="2" md="2" lg="2" xl="2">
                                    <TaskEdit onClick={editTask(_id)}/>
                                    <Button onClick={deleteTask(_id)}>
                                        icon
                                    </Button>
                                </Col>
                            </Row>
                        );
                    })}
                />
                <List 
                    id="assessments" 
                    className="assessments-list"
                    needHeader={false}
                    data={assessments.map(({ _id, title, course, type, date: { start, end }, completed }) => {
                        return (
                            <Row key={_id}>
                                <Col xs="1" sm="1" md="1" lg="1" xl="1">
                                    <Input
                                        name="completed"
                                        type="checkbox"
                                        checked={completed}
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
                                        : `${moment(start, "MMMM Do, h:mm a")} - ${moment(end, "h:mm a")}`
                                        }
                                    </p>
                                </Col>
                                <Col xs="2" sm="2" md="2" lg="2" xl="2">
                                    <AssessmentEdit onClick={editAssessment(_id)}/>
                                    <Button onClick={deleteAssessment(_id)}>
                                        icon
                                    </Button>
                                </Col>
                            </Row>
                        );
                    })}
                />
			</Row>
		</Col>
    );
};

const ClassEdit = Loadable({
	loader: () => import(/* webpackChunkName: "ClassEdit" */ "../../reactors/ClassEdit"),
	loading: () => <div></div>,
	delay: 300
});

const TaskNew = Loadable({
	loader: () => import(/* webpackChunkName: "TaskNew" */ "../../reactors/TaskNew"),
	loading: () => <div></div>,
	delay: 300
});

const TaskEdit = Loadable({
	loader: () => import(/* webpackChunkName: "TaskEdit" */ "../../reactors/TaskEdit"),
	loading: () => <div></div>,
	delay: 300
});

const AssessmentEdit = Loadable({
	loader: () => import(/* webpackChunkName: "AssessmentEdit" */ "../../reactors/AssessmentEdit"),
	loading: () => <div></div>,
	delay: 300
});