import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { 
	fetchTasksByTerm, fetchPastTasksByTerm, 
	fetchTasksByCourse, fetchPastTasksByCourse 
} from "../../../actions/data/tasks.action";
import PropTypes from "prop-types";

import { Button, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import TaskEditModal from "../TaskEditModal";
import Select from "react-select";

import Moment from "react-moment";

import "./Tasks.scss";

class Tasks extends Component {
	state = {
		
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		task: PropTypes.object.isRequired,
		fetchTasksByTerm: PropTypes.func.isRequired,
		fetchPastTasksByTerm: PropTypes.func.isRequired,
		fetchTasksByCourse: PropTypes.func.isRequired,
		fetchPastTasksByCourse: PropTypes.func.isRequired,
	};
	
	componentDidMount() {
		this.props.fetchTasksByTerm();
	};


	render() {
		const { tasks } = this.props.task;

		const taskRecords = tasks.map(({ _id, title, course, type, deadline }) => (
			<Row key={_id} className="task-record">
				<Col>
					<Row>
						<Col>
							<h5>{title}</h5>
							<h6>{course}</h6>
						</Col>
						<Col>
							<p>{type}</p>
							<p><Moment format="dddd, MMMM Do">{deadline}</Moment></p>
						</Col>
						<Col>
							<TaskEditModal onClick={this.editTask.bind(this, _id)}/>
						</Col>
					</Row>
				</Col>
			</Row>
		));

		// const courseOptions = parentOptions.map(({ _id, course}) => (
		// 	<option key={_id} className="" value={course}>
		// 		{course}
		// 	</option>
		// ));
		
		return (
			<Col className="tasks-column"> 
				{taskRecords}
			</Col>
		);
	};
};

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	task: state.task
});

const mapDispatchToProps = { 
	fetchTasksByTerm, fetchPastTasksByTerm, 
	fetchTasksByCourse, fetchPastTasksByCourse 
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);