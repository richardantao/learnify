import React from "react";

import { Button, Container, Col, Row } from "reactstrap";
import { faFacebookSquare, faLinkedin, faInstagram, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

import Loadable from "react-loadable";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Atoms
import Header from "../../atoms/Header";
import Loading from "../../atoms/Loading";
import Icon from "../../atoms/Icon";

import "./DesktopSettings.scss";

export default ({
    handleLogout, handleProfile, handlePassword, handlePreferences,
    form, year, version
}) => {
    return (
        <Col>
            <Row className="header">
                <Col>
                    <Header header="Settings"/> 
                </Col>
                <Col>
                    <Button onClick={handleLogout}>Sign Out</Button>
                </Col>
            </Row>
            <Tabs>
                <TabList>
                    <Tab>Title 1</Tab>
                    <Tab>Title 2</Tab>
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                    </TabPanel>
                    <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
            <Row>
                <Col className="settings-nav">
                    <Button onClick={handleProfile} block>Profile</Button>
                    <Button onClick={handlePassword} block>Password</Button>	
                    <Button onClick={handlePreferences} block>Preferences</Button>
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