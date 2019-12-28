import React, { Component } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import "../../Docs.scss";

export default class Sitemap extends Component {
    state = {

    };

    componentDidMount() {

    };

    render() {
        return (
            <>
                <Helmet>
                    <title>Learnify | Sitemap</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <main className="docs" role="main">
                        <h1>Sitemap</h1>
                        <div>
                            <h2>Root</h2>
                            <ul>
                                <li>
                                    <a href="https://learnify.ca/">Home</a>
                                </li>
                                <li>
                                    <a href="https://learnify.ca/about">About</a>
                                </li>
                                <li>
                                    <a href="https://blog.learnify.ca/">Blog</a>
                                </li>
                                <li>
                                    <a href="https://learnify.ca/contact">Contact</a>
                                </li>
                                <li>
                                    <a href="https://careers.learnify.ca/">Careers</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2>Beta</h2>
                            <ul>
                                <li>
                                    <a href="https://beta.learnify.ca/register">Register</a>
                                </li>
                                <li>
                                    <a href="https://beta.learnify.ca/signin">Signin</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2>Blog</h2>
                            <ul>
                                <li>
                                    <a href="https://blog.learnify.ca/mission">Our Mission</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2>Careers</h2>
                            <ul>
                                <li>
                                    <a href="https://careers.learnify.ca/designer">Visual Designer</a>
                                </li>
                                <li>
                                    <a href="https://careers.learnify.ca/frontend">Frontend React Developer</a>
                                </li>
                                <li>
                                    <a href="https://careers.learnify.ca/backend">Backend Node Developer</a>
                                </li>
                                <li>
                                    <a href="https://careers.learnify.ca/swift">Swift Developer</a>
                                </li>
                                <li>
                                    <a href="https://careers.learnify.ca/marketer">Marketing Specialist</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2>Docs</h2>
                            <ul>
                                <li>
                                    <a href="/">What is Learnify?</a>
                                </li>
                                <li>
                                    <a href="/api">Developers</a>
                                </li>
                                <li>
                                    <a href="/terms">Terms of Service</a>
                                </li>
                                <li>
                                    <a href="/privacy">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/cookies">Cookie Policy</a>
                                </li>
                                <li>
                                    <a href="/changelog">Changelog</a>
                                </li>
                                {/* <li>
                                    <a href="/status">System Status</a>
                                </li> */}
                            </ul>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </>
        );
    };
};
