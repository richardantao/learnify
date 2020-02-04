import React from "react";

import "./Counter.scss";

const Counter = ({ type, count }) => {
	return (
		<figure className="counter">
			<svg width="100" height="100">
				<circle className="" cx="50" cy="50" r="46" strokeWidth="5"/>
		<foreignObject width="100" height="100">
			<div className="counter-index">
				<h6>{count}</h6>
			</div>
		</foreignObject>
		<foreignObject width="100" height="100">
			<div className="counter-type">
				{ 	type === "Classes" && count === 1 ? (
					<h6>Class</h6>
				 ): type === "Classes" ? (
					<h6>Classes</h6>
				 ): type === "Tasks" && count === 1 ? (
					<h6>Task</h6>
				 ): type === "Tasks" ? (
					<h6>Tasks</h6>
				 ): type === "Assessments" && count === 1 ? (
					<h6>Assessment</h6>
				 ): <h6>Assessments</h6>
				}
			</div>
		</foreignObject>
			</svg>
		</figure>
	);	
};

export default Counter;

