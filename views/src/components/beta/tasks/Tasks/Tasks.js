import React, { Component } from "react";

import { connect } from "react-redux";
import { 
	fetchTasksByTerm, fetchPastTasksByTerm, 
	fetchTasksByCourse, fetchPastTasksByCourse,
	editTask
} from "../../../../actions/beta/tasks";
import PropTypes from "prop-types";

import { Col, Row } from "reactstrap";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

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
		editTask: PropTypes.func.isRequired
	};
	
	componentDidMount() {
		this.props.fetchTasksByTerm();
	};

	handleEdit = _id => {
		const { editTask } = this.props;

		
		editTask(_id);
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
							<TaskEditModal onClick={this.handleEdit.bind(this, _id)}/>
						</Col>
					</Row>
				</Col>
			</Row>
		));
		
		return (
			<Col className="tasks-column"> 
				{taskRecords}
			</Col>
		);
	};
};

const TaskEditModal = Loadable({
	loader: () => import(/* webpackChunkName: "TaskEditModal" */ "../TaskEditModal"),
	loading: Loading,
	delay: 300
});

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	task: state.task
});

const mapDispatchToProps = { 
	fetchTasksByTerm, fetchPastTasksByTerm, 
	fetchTasksByCourse, fetchPastTasksByCourse,
	editTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);