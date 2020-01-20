import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { logout } from "../../../../actions/auth/auth";
import PropTypes from "prop-types";

import { Button, Container, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faLinkedin, faInstagram, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

import Nav from "../../global/Nav";
import Header from "../../global/Header";

import Loadable from "react-loadable";
import Loading from "../../../public/global/organisms/Loading";

import "./Settings.scss";

class Settings extends Component {
	state = {
		form: null
	};

	static propTypes = {
		// isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.setState({
			form: "profile"
		});
	};

	handleProfile = () => {
		this.setState({
			form: "profile"
		});
	};

	handlePassword = () => {
		this.setState({
			form: "password"
		});
	};

	handlePreferences = () => {
		this.setState({
			form: "preferences"
		});
	};

	handleIntegrations = () => {
		this.setState({
			form: "integration"
		});
	};

	handleLogout = () => {

		// logout user
		this.props.logout();
	};

	render() {
		const { form } = this.state;

		return (
			<>
				<Helmet>
					<title>My Learnify | Settings</title>
				</Helmet>
				<div id="beta">
					<Nav/>
					<div id="settings">
						<Row className="header">
							<Col>
								<Header header="Settings"/> 
							</Col>
							<Col>
								<Button onClick={this.handleLogout}>Sign Out</Button>
							</Col>
						</Row>
						<Row>
							<Col className="settings-nav">
								<Button onClick={this.handleProfile} block>Profile</Button>
								<Button onClick={this.handlePassword} block>Password</Button>	
								<Button onClick={this.handlePreferences} block>Preferences</Button>
								<Button onClick={this.handleIntegrations} block>Integrations</Button>
							</Col>
						</Row>
						<Container>
							<Row className="body settings-body">
								<Col>
									{ form === "profile" ? (
										<Profile/>
									): null }
									{ form === "password" ? (
										<Password/>
									): null }
									{ form === "preferences" ? (
										<Preference/>
									): null }
									{ form === "integration" ? (
										<Integration/>
									): null }
								</Col>		
							</Row>
						</Container>
						<Row className="footer settings-footer">
							<Col>
								<Button href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social"><FontAwesomeIcon icon={faFacebookSquare}/></Button>
								<Button href="https://www.linkedin.com/company/learnify" target="_blank" rel="noopener noreferrer" className="social"><FontAwesomeIcon icon={faLinkedin}/></Button>
								<Button href="https://www.instagram.com/learnify" target="_blank" rel="noopener noreferrer" className="social"><FontAwesomeIcon icon={faInstagram}/></Button>
								{/* <Button href="https://twitter.com/learnify" target="_blank" rel="noopener noreferrer" className="social"><FontAwesomeIcon icon={faTwitterSquare}/></Button> */}
							</Col>
							<Col>
								<p>Copyright {year} Learnify. All rights reserved. </p>
								<a href="https://learnify.ca/docs/changelog" target="_blank" rel="noopener noreferrer">{process.env.APP_VERSION}</a>
							</Col>
						</Row>
					</div>
				</div>
			</>
		);
	};
};

const Profile = Loadable({
	loader: () => import(/* webpackChunkName: "Profile" */ "../Profile"),
	loading: Loading,
	delay: 300
});

const Password = Loadable({
	loader: () => import(/* webpackChunkName: "Password" */ "../Password"),
	loading: Loading,
	delay: 300
});

const Preference = Loadable({
	loader: () => import(/* webpackChunkName: "Preference" */ "../Preference"),
	loading: Loading,
	delay: 300
});

const Integration = Loadable({
	loader: () => import(/* webpackChunkName: "Integration" */ "../Integration"),
	loading: Loading,
	delay: 300
});

const year = new Date().getFullYear();
// const version = "Version 1.0.0-beta";

const mapStateToProps = state => ({
	// isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Settings);