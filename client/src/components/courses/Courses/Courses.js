import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchCourses, editCourse } from "../../../actions/data/courses.action";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { Button, Col, Row } from "reactstrap";

import "./Courses.scss";

class Courses extends Component {
	state = {
		courses: []
	};

	static propTypes = {
		isAuthenticated: PropTypes.func,
		error: PropTypes.object.isRequired,
		course: PropTypes.object.isRequired,
		fetchCourses: PropTypes.func.isRequired,
		editCourse: PropTypes.func.isRequired,
	};

	componentDidMount() {
		
		this.props.fetchCourses();
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;

		if(error) {
			if(!isAuthenticated) {
				this.setState({

				});
			} else {
				this.setState({

				});
			};
		} else {
			this.setState({

			});
		};
	};

	
	
	render() {
		const { courses } = this.props.course;
		
		const courseRecords = courses.map(({ _id, title, start, end }) => (
			<Row key={_id}>
				<Col>
					<h5>{title}</h5>
				</Col>
				<Col>
					<h6>{start} -</h6>
					<h6>{end}</h6>
				</Col>
				<Col>
					<Button onClick={this.props.editCourse.bind(this, _id)}><FontAwesomeIcon icon={faEdit}/></Button>
				</Col>
			</Row>
		));

		return (
			<Col id="courses">
				{courseRecords}
			</Col>
		);
	};
};

const mapStateToProps = state => ({
	isAuthenticated: state.isAuthenticated,
	error: state.error,
	course: state.course
});

const mapDispatchToProps = { fetchCourses, editCourse }

export default connect(mapStateToProps, mapDispatchToProps)(Courses);