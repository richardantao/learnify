import React from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";
import TeamCard from "../../templates/TeamCard/TeamCard";

// import Loadable from "react-loadable";
// import Loading from "../../../global/organisms/Loading";

import richardantao from "./richardantao-min.png";
import "../../Root.scss";

const About = () => {
    return (
        <>
            <Helmet>
                <title>Learnify | About Us</title>
            </Helmet>
            <div id="public">
                <Header/>
                <main className="root about" role="main">
                    <h1>About Us</h1>
                    <br/>
                    <section>
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
                    </section>
                    <section>
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
                    </section>
                    <section className="about-team">
                        <h2>Meet the Team</h2>
                        <TeamCard
                            src={richardantao}
                            alt="Headshot of Richard Antao"
                            person="Richard Antao"
                            title="Founder"
                            description="Richard is currently responsible for marketing, 
                            finance, strategy, and software development. 
                            He is in his final year of Integrated Engineering
                            at Western University. Aside from school and Learnify, 
                            Richard is an avid reader, enjoys going to the gym, and is
                            passionate about space, psychology, finance, and transport phenomena."
                        />

                        {/* <TeamCard
                            src=""
                            alt="Unknown headshot"
                            person="You?"
                            title="Various positions"
                            description={<div>
                                Visit <a href="https://team.learnify.ca">https://team.learnify.ca</a> for open positions.
                            </div>}
                        /> */}
                    </section>
                </main>
                <Footer/>
            </div>
        </>
    );
};

// const richardantao = Loadable({
//     loader: () => import(/* webpackChunkName: "richardantao" */ "./richardantao-min.png"),
//     loading: Loading,
//     delay: 300
// });

export default About;
