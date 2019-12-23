import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import Card from "../../organisms/Card";

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
                    <title>Learnify | About Us</title>
                </Helmet>
                <Header/>
                <main className="about-main" role="main">
                    <h1>About Us</h1>
                    <br/>
                    <div className="about">
                        <h2>Mission</h2>
                        <p>
                            At Learnify, we believe in the transformational power of education. It is through accessible and engaging education that we can solve 
                            the world's complex issues.
                        </p>
                        <p>
                            We believe there are better ways to learn, and providing the tools and resources that facilitate a stimulating and meaningful environment for students is 
                            integral to making that happen.
                        </p>
                        <p>
                            Our mission is to provide a platform that enables students everywhere to be the best version of themselves.
                        </p>
                        <br/>
                    </div>
                    <div>
                        <h2>Values</h2>
                        <h4>Trust</h4>
                        <p>
                            It is our commitment above all else, to build deep meaningful relationships with those we serve and work with.
                        </p>
                        <h4>Service</h4>                        
                        <p>
                            Service to us means taking care of our people and our customers. Business and technology have no meaning if they don't help people.
                        </p>
                        <h4>Continous Improvement</h4>
                        <p>
                            We play the infinite game. We're in this for the long run.
                        </p>
                        <h4>Simplicity</h4>
                        <p>
                            Complex problems don't require complex solutions. Simplicity gives us the ability to spread 
                            a product and message that is easy to use, understand, and share.
                        </p>
                        <h4>Innovation</h4>
                        <p>
                            Innovation sparks new solutions to existing problems, 
                            giving access to more people, everywhere.
                        </p>
                        <br/>
                    </div>
                    <div className="team">
                        <h2>Meet the Team</h2>
                        <Card
                            src="assets/images/richardantao-min.png"
                            alt="Headshot of Richard Antao"
                            person="Richard Antao"
                            title="Founder"
                            description="Richard is currently responsible for marketing, 
                            finance, strategy, and software development. 
                            He is in his final year of Integrated Engineering
                            at Western University. Aside from school and Learnify, 
                            Richard is an avid reader, enjoys going to the gym, and is
                            passionate about space, psychology, and thermodynamics."
                        />

                        <Card
                            src=""
                            alt="Unknown headshot"
                            person="You?"
                            title="Various positions"
                            description={<div>
                                Visit <a href="https://team.learnify.ca">https://team.learnify.ca</a> for open positions.
                            </div>}
                        />
                    </div>
                </main>
                <Footer/>
            </Fragment>
        );
    };
};