import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { isMobile, isTablet } from "react-device-detect"; 

import { connect } from "react-redux";
import { fetchYears, editYear } from "../../../actions/data/years";
import { fetchTerms, editTerm } from "../../../actions/data/terms";
import { fetchCourses, editCourse } from "../../../actions/data/courses";
import { fetchClasses, editClass } from "../../../actions/data/classes";

import { Row } from "reactstrap";

import PropTypes from "prop-types";
import Loadable from "react-loadable";

import "./Academics.scss";

class Academics extends Component {
	state = {
		activeTerm: null
	};

	static propTypes = {
		error: PropTypes.object.isRequired,
		year: PropTypes.object.isRequired,
		term: PropTypes.object.isRequired,
		course: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		fetchYears: PropTypes.func.isRequired,
		editYear: PropTypes.func.isRequired,
		fetchTerms: PropTypes.func.isRequired,
		editTerm: PropTypes.func.isRequired,
		fetchCourses: PropTypes.func.isRequired,
		editCourse: PropTypes.func.isRequired,
		fetchClasses: PropTypes.func.isRequired,
		editClass: PropTypes.func.isRequired
	};

	async componentDidMount() {
		const { fetchYears } = this.props;
		await fetchYears();
	};

	componentDidUpdate(prevProps) {
		const { error } = this.props;

		if(error !== prevProps.error) {
			if(error.id === "YEARS_ERROR" || error.id === "TERMS_ERROR" || error.id === "COURSES_ERROR" || error.id === "CLASSES_ERROR") {
				this.setState({ message: error.message.message });
			} else {
				this.setState({ message: null });
			};
		};
	};

	render() {
		const { activeTerm } = this.state; // need to pull meta to templates
		const { 
			year: { years },
			term: { terms },
			course: { courses },
			classes: { classes },
			editYear,
			fetchTerms, editTerm,
			fetchCourses, editCourse,
			fetchClasses, editClass
		} = this.props;

		return (
			<>
				<Helmet>
					<meta name="description" content="User's Academics page."/>
					<meta name="keywords" content="Learnify, Academics, Years, Terms, Semester, Course, Courses, Class, Classes"/>
					<title>My Learnify | Academics</title>
				</Helmet>
				<Row id="academics">
					{ isMobile ? 
						<MobileAcademics
							years={years}
							terms={terms}
							courses={courses}
							classes={classes}
							editYear={editYear}
							fetchTerms={fetchTerms}
							editTerm={editTerm}
							fetchCourses={fetchCourses}
							editCourse={editCourse}
							fetchClasses={fetchClasses}
							editClass={editClass}
						/>
					: isTablet ? 
						<TabletAcademics
							years={years}
							terms={terms}
							courses={courses}
							classes={classes}
							editYear={editYear}
							fetchTerms={fetchTerms}
							editTerm={editTerm}
							fetchCourses={fetchCourses}
							editCourse={editCourse}
							fetchClasses={fetchClasses}
							editClass={editClass}
						/>
					: 
						<DesktopAcademics
							years={years}
							terms={terms}
							courses={courses}
							classes={classes}
							editYear={editYear}
							fetchTerms={fetchTerms}
							editTerm={editTerm}
							fetchCourses={fetchCourses}
							editCourse={editCourse}
							fetchClasses={fetchClasses}
							editClass={editClass}
						/>
					}
				</Row>
			</>
		);
	};
};

const DesktopAcademics = Loadable({
	loader: () => import(/* webpackChunkName: "DesktopAcademics" */ "../../templates/DesktopAcademics"),
	loading: () => <></>,
	delay: 300
});

const MobileAcademics = Loadable({
	loader: () => import(/* webpackChunkName: "MobileAcademics" */ "../../templates/MobileAcademics"),
	loading: () => <></>,
	delay: 300
});

const TabletAcademics = Loadable({
	loader: () => import(/* webpackChunkName: "TabletAcademics" */ "../../templates/TabletAcademics"),
	loading: () => <></>,
	delay: 300
});

const mapStateToProps = state => ({
	error: state.error,
	year: state.year,
	term: state.term,
	course: state.course,
	classes: state.classes,
});

const mapDispatchToProps = { 
	fetchYears, editYear,
	fetchTerms, editTerm,
	fetchCourses, editCourse,
	fetchClasses, editClass 
};

export default connect(mapStateToProps, mapDispatchToProps)(Academics);