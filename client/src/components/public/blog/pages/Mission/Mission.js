import React from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import banner from "./mission-min.jpg";
import "../../Blog.scss";

const Mission = props => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Learnify's mission statement. Why we're here , what we value, and what we've set out to achieve."/>
                <meta name="keywords" content="Learnify, blog, mission, post, values, why, goal"/>
                <link rel="canonical" href="https://learnify.ca/blog/mission"/>
                <title>Learnify | Blog</title>
            </Helmet>
            <div id="public">
                <Header/>
                <main className="posts" role="main">
                    <header role="banner">
                        <span className="blog-header">January 30, 2020</span>
                        <h1>Our Mission</h1>
                        <h2>What drives us forward at Learnify.</h2>
                        <img src={banner} className="banner" alt="Banner image"/>
                    </header>
                    <article role="document">
                        <section id="intro">
                            <p>
                                Back in the summer of 2018, I decided that it was time to finally act on my desire to learn software 
                                development. I loved the idea that someone could build something and share it with the world at practically 
                                no cost. After going through many tutorials and building small scripts, on New Years day 2019, I decided that it was
                                time to move on from coding "Hello World"s and build something legit. What started off as a simple hands-on 
                                dummy project, eventually turned into a service I felt my friends and community deserved...

                            </p>
                            <p>
                            </p>
                        </section>
                        <section id="mission">
                            <h3>Mission Statement</h3>
                            <span className="highlight">Our mission at Learnify is to lay the foundations for success in academics and life, for students everywhere.</span> By 
                            developing a platform that stimulates the desire to learn, provides insight for academic and career options, and 
                            enables learning accessibility, we aspire to foster an environment where students can find purpose, fulfillment, and joy through
                            their educational experience.
                        </section>
                        <section id="goals">
                            <h3>Vision for the Future</h3>
                            <div>
                                <p>
                                    Being in my final year of university, I have been a witness to a few years of: stress, anxiety, 
                                    uncertainty, and hopelessness &ndash; both first-hand, and from my friends and peers. These feelings 
                                    often arise when the topics of deadlines, applications, jobs, and school come into the conversation. 
                                    I've always found it odd that school and career are things that bring people so much despair, considering 
                                    those two things are present over the majority of one's lifetime. You would think that aspects of your life
                                    that are so predominant, would logically be there to provide you with fulfillment, purpose and enjoyment, right? So then
                                    why are so many of us brought down by the presence that school and work has on our lives?
                                </p>
                                <p>
                                    Learnify's vision for the future is simple: enable autonomous individuals who have been equipped with the proper tools to... no cookie cutter templates for life or one-size fits all solutions...
                                    Freedom to choose, support to pursue, and the courage to achieve.
                                </p>
                                <p>
                                At our core, Learnify is a platform dedicated to service for others...
                                </p>
                            </div>
                            <div>

                            </div>
                            <div>
                                
                            </div>
                        </section>
                        <section id="conclusion">
                            <h3>What's Next?</h3>
                            <p>
                                On a closing note, while it might look like I am completing bashing our current school and work systems, I don't want to make it seem like I don't value what 
                                I've personally gotten from these systems. There are many people and memories from my experiences at school and work that I am very grateful for, and I wouldn't be the 
                                person I am today without them. There are also many people who are currently working very hard to make the positive changes that we so desparately need in these domains, 
                                and their efforts should not be taken for granted. I just think that we have a lot more work to do.
                            </p>
                            <p>
                                I am very excited for you to see what we have in store, and I hope that you will even choose to be a part of it! We have just rolled out the Beta for Learnify
                                and need your help with feedback. This platform is designed for <b>YOU</b>, and no one knows what you need better than you yourself. We don't have all the answers, things won't change overnight, 
                                and at times you might think that our progress is slow as we gradually build and develop our team, but we do know 
                                that with your help we can make tomorrow's experience of education and learning better for everyone.  
                            </p>
                        </section>
                    </article>
                    <hr/>
                    <aside role="complementary">
                        <img src="" className="author-headshot" alt="Richard Antao headshot"/>
                        <div>Rich</div>
                    </aside>
                </main>
                <Footer/>
            </div>
        </>
    );
};

export default Mission;