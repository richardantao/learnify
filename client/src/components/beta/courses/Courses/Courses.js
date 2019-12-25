import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchCourses, editCourse } from "../../../../actions/beta/courses";
import PropTypes from "prop-types";

import CourseEditModal from "../CourseEditModal";

import { Col, Row } from "reactstrap";

import "./Courses.scss";

class Courses extends Component {
	state = {
		courses: []
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		course: PropTypes.object.isRequired,
		fetchCourses: PropTypes.func.isRequired,
		editCourse: PropTypes.func.isRequired,
	};

	componentDidMount() {
		
		this.props.fetchCourses();
	};

	// componentDidUpdate(prevProps) {
	// 	const { error, isAuthenticated } = this.props;

	// 	if(error) {
	// 		if(!isAuthenticated) {
	// 			this.setState({

	// 			});
	// 		} else {
	// 			this.setState({

	// 			});
	// 		};
	// 	} else {
	// 		this.setState({

	// 		});
	// 	};
	// };

	
	render() {
		const { courses } = this.props.course;
		
		const courseRecords = courses.map(({ _id, term, title, code, instructor }) => (
			<Row key={_id}>
				<Col>
					<h5>{term}</h5>
					<h5>{title}</h5>
				</Col>
				<Col>
					<h6>{code}</h6>
					<h6>{instructor}</h6>
				</Col>
				<Col>
					<CourseEditModal onClick={this.props.editCourse.bind(this, _id)}/>
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
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
	course: state.course
});

const mapDispatchToProps = { fetchCourses, editCourse }

export default connect(mapStateToProps, mapDispatchToProps)(Courses);