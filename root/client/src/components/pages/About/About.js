import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";

import "./About.scss";

export default class About extends Component {
    state = {

    };

    componentDidMount() {

    };
    
    render() {
        return (
            <Fragment>
                <Helmet>

                </Helmet>
                <Header/>
                <main role="main">
                    <h1>About Us</h1>
                    <br/>
                    <div id="about">
                        <h2>Mission</h2>
                        <p>
                            At Learnify we believe in the transformational power of education. It is through accessible and engaging education that we can solve 
                            the world's complex issues.
                        </p>
                        <p>
                            Providing the tools and resources that facilitate a stimulating and meaningful environment for students is 
                            integral to making that happen.
                        </p>
                        <p>
                            Our mission is to provide a platform that enables students everywhere to be the best version of themselves.
                        </p>
                        <br/>
                    </div>
                    <div id="team">
                        <h2>Meet the Team</h2>
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <img src="assets/images/richardantao-min.png" class="headshot" alt="Richard Antao"/>
                                    <div class="container-fluid">
                                        <h2>Richard Antao</h2>
                                        <h3>Founder</h3>
                                        <p>
                                            Richard is the founder of Learnify; he is currently responsible for marketing, finance, strategy, and software development. 
                                            Richard is building Learnify alongside his studies at Western University, where he is a fourth year Integrated Engineering student.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="card">
                                <img src="" alt=""/>
                                <div class="container-fluid">

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="card">
                                <img src="" alt=""/>
                                <div class="container-fluid">

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </Fragment>
        );
    };
};