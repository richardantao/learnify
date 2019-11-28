import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { fetchTasks, fetchPastTasks } from "../../../actions/data/tasks.action";
import PropTypes from "prop-types";

import { Button, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

import Nav from "../../global/Nav";
import Header from "../../global/Header";
import TaskEditModal from "../TaskEditModal";
import TaskNewModal from "../TaskNewModal";
import Select from "react-select";

import "./Tasks.scss";

class Tasks extends Component {
	state = {
		editModal: false,
		newModal: false
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		task: PropTypes.object.isRequired,
		// parentOptions: PropTypes.object.isRequired,
		fetchTasks: PropTypes.func.isRequired,
		fetchPastTasks: PropTypes.func.isRequired
	};
	
	componentDidMount() {

		this.props.fetchTasks();
	};

	newTaskModal = () => {
		this.setState({
			newModal: true
		});
	};

	editTaskModal = () => {
		this.setState({
			editModal: true
		});
	};

	render() {
		const { editModal, newModal } = this.state;
		const { tasks } = this.props.task;
		// const { parentOptions } = this.props.course;

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
							<p>{deadline}</p>
						</Col>
						<Col>
							<Button onClick={this.editTaskModal}><FontAwesomeIcon icon={faEdit}/></Button>
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
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	task: state.task//,
	// parentOptions: state.course
});

const mapDispatchToProps = { fetchTasks, fetchPastTasks };

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);