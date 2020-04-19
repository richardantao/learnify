import React from "react";

import moment from "moment";
import Moment from "react-moment";

import { Row, Col, Button } from "reactstrap";

import { faPlus } from "@fortawesome/free-solid-svg-icons"; // temp


import Select from "react-select";

import Loadable from "react-loadable";

/* Atoms */
import Header from "../../atoms/Header";
import Icon from "../../atoms/Icon";
import Snackbar from "../../atoms/Snackbar";

/* Organisms */
import List from "../../organisms/List";

import "./DesktopAcademics.scss";

export default ({
	error, meta,
	years, terms, courses, classes,
	editYear,
	fetchTerms, editTerm,
	fetchCourses, editCourse,
	fetchClasses, editClass
}) => {
    return (
        <Col>
			{error ? <Snackbar header="" body={error.message.message} footer=""/> : null}
			<Row className="header">
				<Col xs="8" sm="8" md="8" lg="" xl="8">
					<Header header="Academics"/>
				</Col>
				<Col xs="" sm="" md="" lg="" xl="4">
					{/* <Select 
						// options={years.map(({ _id, title }) => {
						// 	return ({ 
						// 		value: JSON.stringify(_id), 
						// 		label: title 
						// 	});
						// })}	
					/> */}
					{/* <YearEdit /> */}
					<Button>Manage Academics</Button>
					{/* <YearNew/> */}
					<Button><Icon icon={faPlus}/> New Academic Year</Button>
				</Col>
			</Row>
			<Row className="body academics-body">
				<Col>
					<Row className="terms-header">
						<Col xs="8" sm="8" md="8" lg="8" xl="8">
							<h3>Terms</h3>
						</Col>
						<Col xs="4" sm="4" md="4" lg="4" xl="4">
							<TermNew/>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row className="courses-header">
						<Col xs="7" sm="7" md="7" lg="7" xl="7">
							<h3>Courses</h3>
						</Col>
						<Col xs="5" sm="5" md="5" lg="5" xl="5">
							<CourseNew/>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row className="classes-header">
						<Col xs="8" sm="8" md="8" lg="8" xl="8">
							<h3>Classes</h3>
						</Col>
						<Col xs="4" sm="4" md="4" lg="4" xl="4">
							<ClassNew/>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col id="terms" className="list">
					<List 		
						noHeader={true}
						// data={years.map(year => {
						// 	return (
						// 		<Row key={year._id} className="academics-data" onClick={fetchTerms(year._id)}>
						// 			<Col>
						// 				<ul>
						// 					<li>
						// 						<Row className="years-data">
						// 							<Col>
						// 								{year.title}
						// 							</Col>
						// 							<Col>
						// 								{ moment(year.date.start).startOf("year") !== moment(year.date.end).startOf("year") ? (
						// 									`${moment(year.date.start, "MMMM YYYY")} - ${moment(year.start.end, "MMMM YYYY, h:mm a")}` 
						// 								): null }

						// 								{year.date.start} - {year.date.end}
						// 							</Col>
						// 						</Row>
						// 						<ul>
						// 							{/* {terms.map(term => {
						// 								return (
						// 									<Row key={term._id} className="term-data" onClick={fetchCourses(term._id)}>
						// 										<Col>
						// 											<h4>{term.title}</h4>
						// 										</Col>
						// 										<Col>
						// 											<p>{term.date.start}</p>
						// 											<p>{term.date.end}</p>
						// 										</Col>
						// 										<Col>
						// 											<TermEdit onClick={editTerm(term._id)}/>
						// 										</Col>
						// 									</Row>
						// 								);
						// 							})} */}
						// 						</ul>
						// 					</li>
						// 				</ul>
						// 			</Col>
						// 		</Row>
						// 	);
						// })}
						empty="There are no existing terms"
					/>
				</Col>
				<Col id="courses" className="list">
					<List 	
						noHeader={true}
						// data={courses.map(({ _id, title, term, code, instructor }) => {
						// 	return (
						// 		<Row key={_id} className="course-data" onClick={fetchClasses("courses", _id, "")}>
						// 			<Col>
						// 				<h4>{title}</h4>
						// 				<h5>{term.title}</h5>
						// 			</Col>
						// 			<Col>
						// 				<p>{code}</p>
						// 				<p>{instructor}</p>
						// 			</Col>
						// 			<Col>
						// 				<CourseEdit onClick={editCourse(_id)}/>
						// 			</Col>
						// 		</Row>
						// 	);
						// })}
						empty="There are no existing courses"
					/>
				</Col>
				<Col id="classes" className="list">
					<List 			
						noHeader={true}
						// data={classes.map(({ _id, title, course, location, date }) => {
						// 	return (
						// 		<Row key={_id} className="class-data">
						// 			<Col>
						// 				<h4>{title}</h4>
						// 				<h5>{course.title}</h5>
						// 			</Col>
						// 			<Col>
						// 				<p>{date}</p>
						// 				<p>{location}</p>
						// 			</Col>	
						// 			<Col>
						// 				<ClassEdit onClick={editClass(_id)}/>
						// 			</Col>
						// 		</Row>
						// 	);
						// })}
						empty="There are no existing classes"
					/>
				</Col>
			</Row>
		</Col>
    );
};

const YearNew = Loadable({
	loader: () => import(/* webpackChunkName: "YearNew" */ "../../reactors/YearNew"),
	loading: () => <></>,
	delay: 300
});

const YearEdit = Loadable({
	loader: () => import(/* webpackChunkName: "YearEdit" */ "../../reactors/YearEdit"),
	loading: () => <></>,
	delay: 300
});

const TermNew = Loadable({
	loader: () => import(/* webpackChunkName: "TermNew" */ "../../reactors/TermNew"),
	loading: () => <></>,
	delay: 300
});

const TermEdit = Loadable({
	loader: () => import(/* webpackChunkName: "TermEdit"*/ "../../reactors/TermEdit"),
	loading: () => <></>,
	delay: 300
});

const CourseNew = Loadable({
	loader: () => import(/* webpackChunkName: "CourseNew" */ "../../reactors/CourseNew"),
	loading: () => <></>,
	delay: 300
});

const CourseEdit = Loadable({
	loader: () => import(/* webpackChunkName: "CourseEdit" */ "../../reactors/CourseEdit"),
	loading: () => <></>,
	delay: 300
});

const ClassNew = Loadable({
	loader: () => import(/* webpackChunkName: "ClassNew" */ "../../reactors/ClassNew"),
	loading: () => <></>,
	delay: 300
});

const ClassEdit = Loadable({
	loader: () => import(/* webpackChunkName: "ClassEdit" */ "../../reactors/ClassEdit"),
	loading: () => <></>,
	delay: 300
});