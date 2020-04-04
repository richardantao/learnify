import React from "react";

import { Row, Col, Alert, Button } from "reactstrap"; 

import Loadable from "react-loadable";

import Header from "../../atoms/Header";

import "./DesktopHelp.scss";

export default ({
    
}) => {
    return (
		<Col>
			<Row>

			</Row>
			<Row>
				
			</Row>
		</Col>
    );
};

const BugSubmit = Loadable({
	loader: () => import(/* webpackChunkName: "BugSubmit" */ "../../reactors/BugSubmit"),
	loading: () => <div></div>,
	delay: 300
});

const FeedbackSubmit = Loadable({
	loader: () => import(/* webpackChunkName: "FeedbackSubmit" */ "../../reactors/FeedbackSubmit"),
	loading: () => <div></div>,
	delay: 300
});