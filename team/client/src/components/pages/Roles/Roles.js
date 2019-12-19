import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Nav from "../../organisms/Nav";
import Footer from "../../organisms/Footer";

import { Button, Collapse, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";

import "./Roles.scss";

class Roles extends Component {
    state = {
        openBackend: false,
        openCreator: false,
        openDesigner: false,
        openFrontend: false,
        openMarketer: false,
        openSwift: false
    };

    static propTypes = {
        error: PropTypes.object.isRequired
    };

    componentDidMount() {

    };

    toggleBackend = () => {
        const { openBackend } = this.state;

        this.setState({
            openBackend: !openBackend
        });
    };

    toggleCreator = () => {
        const { openCreator } = this.state;

        this.setState({
            openCreator: !openCreator
        });
    };

    toggleDesigner = () => {
        const { openDesigner } = this.state;

        this.setState({
            openDesigner: !openDesigner
        });
    };

    toggleFrontend = () => {
        const { openFrontend } = this.state;

        this.setState({
            openFrontend: !openFrontend
        });
    };

    toggleMarketer = () => {
        const { openMarketer } = this.state;

        this.setState({
            openMarketer: !openMarketer
        });
    };

    toggleSwift = () => {
        const { openSwift } = this.state;

        this.setState({
            openSwift: !openSwift
        });
    };

    render() {
        const { openBackend, openCreator, openDesigner, openFrontend, openMarketer, openSwift } = this.state;

        return (
            <Fragment>
                <Helmet>
                    <title>Learnify | Roles</title>
                </Helmet>  
                <Nav/>
                <main role="main">
                    <div>
                        <h1>Roles</h1>
                        <p>
                            Learnify is looking to build a team around one common visio
                        </p>
                        <p>
                            If you're a passionate individual who wants better education for all, please apply for one (or more) of the positions below.
                        </p>
                    </div>
                    <ListGroup>
                        <ListGroupItem>
                            <h4>
                                <a onClick={this.toggleBackend} className="accordion">Backend Node Developer</a>
                            </h4>                            
                            <Collapse isOpen={openBackend}>
                                <Card>
                                    <CardBody>
                                        <div>
                                            <h5>Why your role is important</h5>
                                            <p>
                                                The backend of a cloud&ndash;based platform is the brain of the entire operation; without it, nothing works. You have the
                                                responsibility of managing all the data transactions and business logic that makes Learnify so impactful. Our users will make
                                                countless transactions over the cloud, so your role is pivotal to the development and operation of the platform.
                                            </p>
                                        </div>
                                        <div>
                                            <h5>Why Learnify is important</h5>
                                            <p>
                                                Education empowers people, improves quality of life, and equips individuals with the tools
                                                necessary to solve the world's complex problems. That all starts with the student. 
                                            </p>
                                            <p>
                                                Students however often feel uninspired, misguided, and lack the belief that they can or should pursue what they are passionate about.
                                                Scientific research tells us that the best way for a student to decrease school&ndash;related stress and anxiety, 
                                                and increase learning and enjoyment at school is to develop a vision for their future and maintain an organized learning strategy. That's where we come in.
                                                Learnify is making seamless organizational tools &ndash; that direct you towards what you find passion in &ndash; accessible to students everywhere. We want to change the way students
                                                experience and perform in school, regardless of who they are, or where they come from.
                                            </p>
                                        </div>
                                        <div>
                                            <h5>What you'll do</h5>
                                            <ul>
                                                <li>Write reusable, testable, and efficient server&ndash;side code in Node.js using the Express framework</li>
                                                <li>Integrate user&ndash;facing elements developed by frontend developers with server&ndash;side logic</li>
                                                <li>Create, manage, and test database schemas</li>
                                                <li>Implement security and data protection</li>
                                                <li>Work with the product team to develop a cohesive product strategy and roadmap</li>
                                                <li>Implement automated testing platforms and unit tests prior to shipping code to the staging and production 
                                                    environments
                                                </li>
                                                <li>
                                                    Manage the app's hosting and architecture on Google Cloud Platform; responsibilities include managing
                                                    configurations, scaling the backend, and deploying the latest application versions. 
                                                </li>
                                                <li>Manage version control and assist with deploying updates</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>Our tech stack</h5>
                                            <ul>
                                                <li>MongoDB</li>
                                                <li>Express</li>
                                                <li>React</li>
                                                <li>Node</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>What we look for</h5>
                                            <ul>
                                                <li>Strong proficiency of JavaScript</li>
                                                <li>
                                                    +1 years of building Node applications or a personal portfolio that demonstrates the ability to succeed 
                                                    in the role described above
                                                </li>
                                                <li>Understanding of core web fundamentals, such as HTML, CSS, and the HTTP</li>
                                                <li>Understanding the nature of asynchronous programming and its quirks and workarounds</li>
                                                <li>Experience with MongoDB</li>
                                                <li>Understanding of accessibility and security compliance</li>
                                                <li>An active Github account and a demonstrated competency with version control</li>
                                                <li>Experience with a cloud platform such as AWS or GCP is a plus</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>The kind of people we are looking for:</h5>
                                            <ul>
                                                <li>
                                                    Communication &mdash; you can effectively communicate your thoughts and ideas to technical and non&mdash;technical 
                                                    people alike
                                                </li>
                                                <li>Conscientious &mdash; you're able to organize and manage multiple domains of work on the go</li>
                                                <li>Creative &mdash; you challenge the status quo and generate impact from abstract ideas</li>
                                                <li>Perserverant &mdash; problems don't get in your way; you know there's a solution to every problem and you're committed to finding it</li>
                                                <li>
                                                    Self&ndash;starter &mdash; you are a highly motivated and ambitious individual who can make progress in your endeavours 
                                                    with little guidance from others
                                                </li>
                                            </ul>
                                        </div><br/>
                                        <div>
                                            <p>
                                                At Learnify, we're looking for people with passion, grit, and integrity. You're encouraged to apply even if your experience 
                                                doesn't precisely match the job description. Your skills and passion will stand out and set you apart. At Learnify, we welcome diverse perspectives and people who think 
                                                rigorously and aren't afraid to challenge assumptions. Join us today. 
                                            </p>
                                        </div>
                                        <div>
                                            <Button href="/roles/backend">Apply Now</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4>
                                <a onClick={this.toggleCreator} className="accordion">Content Creator</a>
                            </h4>
                            <Collapse isOpen={openCreator}>
                                <Card>
                                    <CardBody>
                                        <div>
                                            <h5>Why your role is important</h5>
                                            <p>
                                                Learnify isn't just about cool tech and flashy software. At our core, we are selling a future where people find
                                                true meaning and purpose through their learning and education. That's why we need an exceptional content creator to communicate
                                                the vision to our users throughout our platform, in blog posts, and on social media. 
                                            </p>
                                        </div>
                                        <div>
                                            <h5>Why Learnify is important</h5>
                                            <p>
                                                Education empowers people, improves quality of life, and equips individuals with the tools
                                                necessary to solve the world's complex problems. That all starts with the student. 
                                            </p>
                                            <p>
                                                Students however often feel uninspired, misguided, and lack the belief that they can or should pursue what they are passionate about.
                                                Scientific research tells us that the best way for a student to decrease school&ndash;related stress and anxiety, 
                                                and increase learning and enjoyment at school is to develop a vision for their future and maintain an organized learning strategy. That's where we come in.
                                                Learnify is making seamless organizational tools &ndash; that direct you towards what you find passion in &ndash; accessible to students everywhere. We want to change the way students
                                                experience and perform in school, regardless of who they are, or where they come from.
                                            </p>
                                        </div>
                                        <div>
                                            <h5>What you'll do</h5>
                                            <ul>
                                                <li></li>                          
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>What we look for</h5>
                                            <ul>
                                                <li></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>The kind of people we are looking for:</h5>
                                            <ul>    
                                                <li>Communication &mdash; you are a great listener, and an even better communicator; translating needs into actions between two parties comes second nature to you</li>
                                                <li>Creative &mdash; you are an abstract thinker who can turn their ideas into a visual presentation</li>
                                            </ul>
                                        </div><br/>
                                        <div>
                                            <p>
                                                At Learnify, we're looking for people with passion, grit, and integrity. You're encouraged to apply even if your experience 
                                                doesn't precisely match the job description. Your skills and passion will stand out and set you apart. At Learnify, we welcome diverse perspectives and people who think 
                                                rigorously and aren't afraid to challenge assumptions. Join us today.
                                            </p>
                                        </div>
                                        <div>
                                            <Button href="/roles/creator">Apply Now</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4>
                                <a onClick={this.toggleDesigner} className="accordion">Visual Designer</a>
                            </h4>
                            <Collapse isOpen={openDesigner}>
                                <Card>
                                    <CardBody>
                                        <div>
                                            <h5>Why your role is important</h5>
                                            <p>
                                                Learnify takes tasks that require discipline and consistency and turns them into intuitive and
                                                repeatable operations. Your creations allows Learnify to make that happen.
                                                It is imperative that our tool is as simple and user friendly as possible.
                                            </p>
                                        </div>
                                        <div>
                                            <h5>Why Learnify is important</h5>
                                            <p>
                                                Education empowers people, improves quality of life, and equips individuals with the tools
                                                necessary to solve the world's complex problems. That all starts with the student. 
                                            </p>
                                            <p>
                                                Students however often feel uninspired, misguided, and lack the belief that they can or should pursue what they are passionate about.
                                                Scientific research tells us that the best way for a student to decrease school&ndash;related stress and anxiety, 
                                                and increase learning and enjoyment at school is to develop a vision for their future and maintain an organized learning strategy. That's where we come in.
                                                Learnify is making seamless organizational tools &ndash; that direct you towards what you find passion in &ndash; accessible to students everywhere. We want to change the way students
                                                experience and perform in school, regardless of who they are, or where they come from.
                                            </p>
                                        </div>
                                        <div>
                                            <h5>What you'll do</h5>
                                            <ul>
                                                <li>
                                                    Establish the look and feel for various interfaces, including websites, mobile devices, and apps
                                                </li>
                                                <li>
                                                    Translate client business requirements, user needs, technical requirements into designs that are visually enticing, easy to use, and emotionally engaging
                                                </li>                                
                                                <li>Design user&ndash;centered interaction models, wireframes or screen mockups for the web&ndash; and mobile developers</li>
                                                <li>Implement responsive design techniques to capture all user devices</li>
                                                <li>Design logos, icons and infographics</li>
                                                <li>
                                                    Collaborate with a cross&ndash;functional team that includes engineers and product managers in order to create simple, easy&ndash;to&ndash;use software
                                                </li>                            
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>What we look for</h5>
                                            <ul>
                                                <li>+1 years of professional design experience or a personal portfolio that demonstrates competency with core design principles,
                                                    typography, iconography, colour, space, and texture     
                                                </li>
                                                <li>
                                                    The ability to refine other people’s ideas and come up with new ones to create a highly designed visual experience
                                                </li>
                                                <li>Proficiency in Adobe Photoshop, Illustrator, Indesign and Sketch</li>
                                                <li>
                                                    Expert level skills in Photoshop, InvisionApp, UXPin and other relevant design tools
                                                </li>
                                                <li>
                                                    Well organized, responsible and dedicated, with the ability to work on multiple projects and deliver refined design in a short time
                                                </li>
                                                <li>Ability to write insightful surveys to extract out customer needs from the user</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>The kind of people we are looking for:</h5>
                                            <ul>
                                                <li>Ambitious &mdash; you don't let past standards constrain you, and you constantly explore how you can take your impact to the next level</li>
                                                <li>
                                                    Collaborative &mdash; being approachable and open to different ideas enables others to communicate comfortably with you
                                                    in all forms of communication
                                                </li>
                                                <li>Communication &mdash; you are a great listener, and an even better communicator; translating needs into actions between two parties comes second nature to you</li>
                                                <li>Creative &mdash; you are an abstract thinker who can turn their ideas into a visual presentation</li>
                                                <li>
                                                    User&ndash;centric &mdash; no one knows the user more than the user itself; you understand and apply this philosophy to your
                                                    work ethic
                                                </li>
                                            </ul>
                                        </div><br/>
                                        <div>
                                            <p>
                                                At Learnify, we're looking for people with passion, grit, and integrity. You're encouraged to apply even if your experience 
                                                doesn't precisely match the job description. Your skills and passion will stand out and set you apart. At Learnify, we welcome diverse perspectives and people who think 
                                                rigorously and aren't afraid to challenge assumptions. Join us today.
                                            </p>
                                        </div>
                                        <div>
                                            <Button href="/roles/designer">Apply Now</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4>
                                <a onClick={this.toggleFrontend} className="accordion">Frontend React Developer</a>
                            </h4>
                            <Collapse isOpen={openFrontend}>
                                <Card>
                                    <CardBody>
                                        <div>
                                            <h5>Why your role is important</h5>
                                            <p>
                                                The work we do on Learnify's web platform improves the lives of countless students who benefit from our service. Every component that the user interacts with is a product of your work. Ensuring that the user interface is fast, simple, accessible, and inspiring
                                                is one of the hallmarks of a successful platform.
                                            </p>
                                        </div>
                                        <div>
                                            <h5>Why Learnify is important</h5>
                                            <p>
                                                Education empowers people, improves quality of life, and equips individuals with the tools
                                                necessary to solve the world's complex problems. That all starts with the student. 
                                            </p>
                                            <p>
                                                Students however often feel uninspired, misguided, and lack the belief that they can or should pursue what they are passionate about.
                                                Scientific research tells us that the best way for a student to decrease school&ndash;related stress and anxiety, 
                                                and increase learning and enjoyment at school is to develop a vision for their future and maintain an organized learning strategy. That's where we come in.
                                                Learnify is making seamless organizational tools &ndash; that direct you towards what you find passion in &ndash; accessible to students everywhere. We want to change the way students
                                                experience and perform in school, regardless of who they are, or where they come from.
                                            </p>
                                        </div>
                                        <div>
                                            <h5>What you'll do</h5>
                                            <ul>
                                                <li>Develop new user&ndash;facing features using React.js</li>
                                                <li>Build reusable components and frontend libraries for future use</li>
                                                <li>Work with the visual designer to translate the designs and wireframes into high quality code</li>
                                                <li>Optimize components for maximum performance across a vast variety of web&ndash;capable devices and browsers</li>
                                                <li>Work with the backend developer to ensure that data is successfully called from the API</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>Our tech stack</h5>
                                            <ul>
                                                <li>MongoDB</li>
                                                <li>Express</li>
                                                <li>React</li>
                                                <li>Node</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>What we look for</h5>
                                            <ul>
                                                <li>Understanding React fundamentals, such as components, state, props, and the component lifecycle</li>
                                                <li>
                                                    +1 years of building React applications or a personal portfolio that demonstrates the ability to succed in the role
                                                    described above
                                                </li>
                                                <li>Familiarity with RESTful APIs</li>
                                                <li>Ability to understand business requirements and translate them into technical requirements</li>
                                                <li>Experience with Redux is a major plus</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5>The kind of people we are looking for:</h5>
                                            <ul>
                                                <li>
                                                    Communication &mdash; you deal with many different types of people and can communicate with individuals in a manner 
                                                    that best suits them
                                                </li>
                                                <li>Conscientious &mdash; you have the capability to stay organized regardless of how fast your environment scales</li>
                                                <li>Curious &mdash; you always question why and strive to resolve the unknown</li>
                                                <li>
                                                    Meticulous &mdash; you have high attention to detail; this often brings order to your environment and the people 
                                                    working around you
                                                </li>
                                                <li>
                                                    Perserverant &mdash; problems don't get in your way; you know there's a solution to every problem 
                                                    and you're committed to finding it
                                                </li>
                                            </ul>
                                        </div><br/>
                                        <div>
                                            <p>
                                                At Learnify, we're looking for people with passion, grit, and integrity. You're encouraged to apply even if your experience 
                                                doesn't precisely match the job description. Your skills and passion will stand out and set you apart. At Learnify, we welcome diverse perspectives and people who think 
                                                rigorously and aren't afraid to challenge assumptions. Join us today.
                                            </p>
                                        </div>
                                        <div>
                                            <Button href="/roles/frontend">Apply Now</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4>
                                <a onClick={this.toggleMarketer} className="accordion">Marketing Specialist</a>
                            </h4>
                            <Collapse isOpen={openMarketer}>
                                <Card>
                                    <CardBody>
                                        <div>
                                            <div>
                                                <h5>Why your role is important</h5>
                                                <p>
                                                    You are the "ears" and "eyes" of our organization. Your actions allow us to better understand our user, provide a better service,
                                                    represent our brand, and share our vision of future education with the world.
                                                </p>
                                            </div>
                                            <div>
                                                <h5>Why Learnify is important</h5>
                                                <p>
                                                    Education empowers people, improves quality of life, and equips individuals with the tools
                                                    necessary to solve the world's complex problems. That all starts with the student. 
                                                </p>
                                                <p>
                                                    Students however often feel uninspired, misguided, and lack the belief that they can or should pursue what they are passionate about.
                                                    Scientific research tells us that the best way for a student to decrease school&ndash;related stress and anxiety, 
                                                    and increase learning and enjoyment at school is to develop a vision for their future and maintain an organized learning strategy. That's where we come in.
                                                    Learnify is making seamless organizational tools &ndash; that direct you towards what you find passion in &ndash; accessible to students everywhere. We want to change the way students
                                                    experience and perform in school, regardless of who they are, or where they come from.
                                                </p>
                                            </div>
                                            <div>
                                                <h5>What you'll do</h5>
                                                <ul>
                                                    <li>Create marketing content for the website, social media accounts, organizational clients, and other third&ndash;party vendors.</li>
                                                    <li>Facilitate customer interactions through social media</li>
                                                    <li>Conduct market research to direct the trajectory of the brand and our service to the public</li>
                                                    <li>Work with the tech teams to devise a future strategy based upon your research</li>
                                                    <li>Optimize content considering SEO and Google Analytics</li>
                                                    <li>Liaise with external vendors to execute promotional events and campaigns</li>
                                                    <li>Collaborate with marketing and other professionals to coordinate brand awareness and marketing efforts</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5>What we look for</h5>
                                                <ul>
                                                    <li>Past marketing experience in an organized setting (work, clubs, freelance, etc.)</li>
                                                    <li>Physical demonstration of exceptional communication skills (oral, written, etc.), through past blog posts, essays, reports, etc.</li>
                                                    <li>Understanding of tech marketing principles</li>
                                                    <li>Competency with the Microsoft Office Suite</li>
                                                    <li>Thorough understand of marketing elements and market research methods</li>
                                                    <li>Familiarity with SEO and Google Analytics is nice to have</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5>The kind of people we are looking for:</h5>
                                                <ul>
                                                    <li>
                                                        Adaptable &mdash; you are always receptive to your environment and know how to adjust accordingly to maximize 
                                                        your opportunities
                                                    </li>
                                                    <li>
                                                        Collaborative &mdash; being approachable and open to different ideas enables others to communicate comfortably 
                                                        with you in all forms of communication
                                                    </li>
                                                    <li>
                                                        Creative &mdash; you apply your innovative way of thinking to your work to enable to you transform your campaigns, 
                                                        enhance your relationships with our users, and bring new ideas to the table 
                                                    </li>
                                                    <li>Empathetic &mdash; you care about the wellbeing of others, and seek to understand their pains</li>
                                                    <li>Gravitas &mdash; you imperatively present strategies, no matter how complex, with confidence and gravitas</li>                            
                                                    <li>
                                                        User&ndash;centric &mdash; no one knows the user more than the user itself; you understand and apply this philosophy to
                                                        your work ethic
                                                    </li>
                                                </ul>
                                            </div><br/>
                                            <div>
                                                At Learnify, we're looking for people with passion, grit, and integrity. You're encouraged to apply even if your experience 
                                                doesn't precisely match the job description. Your skills and passion will stand out and set you apart. At Learnify, we welcome diverse perspectives and people who think 
                                                rigorously and aren't afraid to challenge assumptions. Join us today.
                                            </div>
                                            <div>
                                                <Button href="/roles/marketer">Apply Now</Button>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </ListGroupItem>
                        {/* <ListGroupItem>
                            <div>
                                <Button onClick={this.toggleSwift}>Mobile Developer</Button>
                            </div> 
                        </ListGroupItem> */}
                    </ListGroup>
                </main>  
                <Footer/>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(Roles);