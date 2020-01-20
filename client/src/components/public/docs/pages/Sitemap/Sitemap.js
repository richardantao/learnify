import React, { Component } from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import SideNav from "../../organisms/SideNav";
import Footer from "../../../global/organisms/Footer";

import "../../Docs.scss";

export default class Sitemap extends Component {
    state = {
        childHeight: 0
    };

    componentDidMount() {
        const childHeight = this.mainElement.clientHeight;

        this.setState({
            childHeight
        });
    };

    componentDidUpdate(prevProps, prevState) {
        // const { childHeight } = this.state;
        // if(childHeight !== prevState.childHeight) {

        // };

        setTimeout(() => {
            const childHeight = this.mainElement.clientHeight;

            this.setState({
                childHeight
            });
        }, 1000);
    };

    render() {
        const { childHeight } = this.state;

        return (
            <>
                <Helmet>
                    <meta name="description" content="Learnify's sitemap."/>
                    <meta name="keywords" content="Learnify, sitemap, breadcrumbs"/>
                    <link rel="canonical" href="https://learnify.ca/docs/sitemap"/>
                    <title>Learnify | Sitemap</title>
                </Helmet>
                <div id="public">
                    <Header/>
                    <SideNav siblingHeight={childHeight}/>
                    <main className="docs" role="main" ref={ (mainElement) => { this.mainElement = mainElement } }>
                        <h1>Sitemap</h1>
                        <div>
                            <h2>Root</h2>
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/about">About</a>
                                </li>
                                <li>
                                    <a href="/team">Team</a>
                                </li>
                                <li>
                                    <a href="/blog">Blog</a>
                                </li>
                                <li>
                                    <a href="/contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                        {/* <div>
                            <h2>Beta</h2>
                            <ul>
                                <li>
                                    <a href="https://beta.learnify.ca/register">Register</a>
                                </li>
                                <li>
                                    <a href="https://beta.learnify.ca/signin">Signin</a>
                                </li>
                            </ul>
                        </div>*/}
                        {/* <div>
                            <h2>Blog</h2>
                            <ul>
                                <li>
                                    <a href="/blog/mission">Our Mission</a>
                                </li>
                                <li>
                                    <a href="/blog/history">A Brief History of School</a>
                                </li>
                            </ul>
                        </div> */}
                        <div>
                            <h2>Docs</h2>
                            <ul>
                                <li>
                                    <a href="/docs">What is Learnify?</a>
                                </li>
                                {/* <li>
                                    <a href="/api">Developers</a>
                                </li> */}
                                <li>
                                    <a href="/docs/terms">Terms of Service</a>
                                </li>
                                <li>
                                    <a href="/docs/privacy">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="/docs/cookies">Cookie Policy</a>
                                </li>
                                <li>
                                    <a href="/docs/sitemap">Sitemap</a>
                                </li>
                                <li>
                                    <a href="/docs/changelog">Changelog</a>
                                </li>
                                <li>
                                    <a href="/docs/status">System Status</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2>Team</h2>
                            <ul>
                                <li>
                                    <a href="/team/roles">Roles</a>
                                </li>
                                <ul>
                                    <li>
                                        <a href="/team/roles#backend">Backend Node Developer</a>
                                    </li>
                                    <li>
                                        <a href="/team/roles#creator">Content Creator</a>
                                    </li>
                                    <li>
                                        <a href="/team/roles#designer">Visual Designer</a>
                                    </li>
                                    <li>
                                        <a href="/team/roles#frontend">Frontend React Developer</a>
                                    </li>
                                    <li>
                                        <a href="/team/roles#marketer">Marketing Specialist</a>
                                    </li>
                                </ul>
                                <li>
                                    <a href="/team/#signin">Sign In</a>
                                </li>
                            </ul>
                        </div>
                    </main>
                    <Footer/>
                </div>
            </>
        );
    };
};