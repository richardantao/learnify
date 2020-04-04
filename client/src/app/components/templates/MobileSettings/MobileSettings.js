import React from "react";

import { Button, Container, Col, Row } from "reactstrap";
import { faFacebookSquare, faLinkedin, faInstagram, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";


import Loadable from "react-loadable";
import Loading from "../../atoms/Loading";

// Atoms
import Header from "../../atoms/Header";
import Icon from "../../atoms/Icon";

import "./MobileSettings.scss";

export default ({
    form, year, version
}) => {
    return (
        <Col>
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
                </Col>
            </Row>
            <Container>
                <Row className="body settings-body">
                    <Col>
                        {form}
                    </Col>		
                </Row>
            </Container>
            <Row className="footer settings-footer">
                <Col>
                    <Button href="https://www.facebook.com/learnify.ca" target="_blank" rel="noopener noreferrer" className="social"><Icon icon={faFacebookSquare}/></Button>
                    <Button href="https://www.linkedin.com/company/learnify" target="_blank" rel="noopener noreferrer" className="social"><Icon icon={faLinkedin}/></Button>
                    <Button href="https://www.instagram.com/learnify" target="_blank" rel="noopener noreferrer" className="social"><Icon icon={faInstagram}/></Button>
                    {/* <Button href="https://twitter.com/learnify" target="_blank" rel="noopener noreferrer" className="social"><Icon icon={faTwitterSquare}/></Button> */}
                </Col>
                <Col>
                    <p>Copyright {year} Learnify. All rights reserved. </p>
                        <a href="/docs/changelog" target="_blank" rel="noopener noreferrer">{version}</a>
                </Col>
            </Row>
        </Col>
    );
};

const Profile = Loadable({
	loader: () => import(/* webpackChunkName: "Profile" */ "../../reactors/Profile"),
	loading: Loading,
	delay: 300
});

const Password = Loadable({
	loader: () => import(/* webpackChunkName: "Password" */ "../../reactors/Password"),
	loading: Loading,
	delay: 300
});

const Preference = Loadable({
	loader: () => import(/* webpackChunkName: "Preference" */ "../../reactors/Preferences"),
	loading: Loading,
	delay: 300
});