import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
// import { }
import PropTypes from "prop-types";

import { Button, Col, Row } from "react-bootstrap";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Nav from "../../global/Nav";
import Header from "../../global/Header";
import Select from "../../global/Select";

import "./Search.scss";

class Search extends Component {
	state = {

	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired
	};

	componentDidMount() {
		
	};

	componentDidUpdate() {

	};

	handleChange = e => {
		this.setState({
			[e.target.name]: [e.target.value]
		});
	};

	render() {
		return (
			<Fragment>
				<Helmet>
					<title>My Tutee | Search</title>
				</Helmet>
				<Nav />
				<div id="search">
					<Row className="header">
						<Col>
							<Header header="Search"/>
						</Col>
						<Col>
						
						</Col>
					</Row>
					<Row className="body">
						<Col>
							<FormGroup className="mb-3">
								<Input
								placeholder="Search for item.."
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
								/>
								<Button id="basic-addon2"><FontAwesomeIcon icon={faSearch}/></Button>
							</FormGroup>
						</Col>
						<Col>
							<Select placeholder="Filter by Course.."/>
						</Col>
						<Col>
							<Select placeholder="Filter by Type.."/>
						</Col>
					</Row>
					<Row className="footer">
						<Col>
						
						</Col>
					</Row>
				</div>
			</Fragment>
		);
	};
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Search);

