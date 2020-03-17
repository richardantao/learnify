import React from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";
import BlogCard from "../../templates/BlogCard";

// import calling from "../Calling/calling-min.jpg"
// import change from "../Change/change-min.jpg";
// import danger from "../Danger/danger-min.jpg";
// import emerging from "../Emerging/emerging-min.jpg";
// import habits from "../Habits/habits-min.jpg";
// import history from "../History/history-min.jpg";
import mission from "../Mission/mission-min.jpg";
// import pareto from "../Pareto/pareto-min.jpg";
// import tips from "../Tips/tips-min.jpg";
import "../../Blog.scss";

export default ({  }) => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Learnify's hosts our insights, ideas, and achievements on our blog."/>
                <meta name="keywords" content="Learnify, blog, posts, ideas, achivement, change, insights"/>
                <link rel="canonical" href="https://learnify.ca/blog"/>
                <title>Learnify | Blog</title>
            </Helmet>
            <div id="public">
                <Header/>
                <main className="blog" role="main">
                    <header className="banner" role="banner">
                        <h1>Blog</h1>
                    </header>
                    <div id="pitch">
                        <p>
                            At Learnify, we're crazy about helping students achieve their very best. We use this blog to collect our insights, ideas, and achievements.
                        </p>
                    </div>
                    <article className="blog-posts" role="document">
                        {/* <BlogCard
                            src={calling}
                            alt="Don't Find a Career, Find a Calling"
                            href="/blogs/calling"
                            title="Don't Find a Career, Find a Calling"
                            date="Coming Soon"
                            text="Jeff Bezos: You can have a job or a career, but if you have this you've 'hit the jackpot'."
                        /> */}
                        {/* <BlogCard
                            src={danger}
                            alt="Danger of Choosing Your Child's Career For Them"
                            href="/blog/danger"
                            title="The Dangers of Choosing Your Child's Career For Them"
                            date="Coming Soon"
                            text="We all think we know what's best for our kids. But at what point do our own wants deter them from 
                                reaching their full potential?"
                        /> */}
                        {/* <BlogCard
                            src={pareto}
                            alt="Pareto's Principle"
                            href="/blog/pareto"
                            title="How to Get More From Doing Less"
                            date="Coming Soon"
                            text="Most things in life are not distributed evenly. The same goes for the results that come from your efforts. 
                            Here's how you can make the most from your time."
                        /> */}
                        {/* <BlogCard
                            src={habits}
                            alt="Habits Students Need"
                            href="/blog/habits"
                            title="10 Habits All Students Should Adopt"
                            date="Coming Soon"
                            text="It doesn't matter what domain you are pursuing excellence in &ndash; you won't be successful if you don't adopt
                                a disciplined routine. Here are 10 habits that are essential for academic excellence."
                        /> */}
                        {/* <BlogCard
                            src={emerging}
                            alt="Emerging Ed. Tech You Should Be Aware Of"
                            href="/blog/emerging"
                            title="Emerging Ed. Tech You Should Be Aware Of"
                            date="Coming Soon"
                            text=""
                        /> */}
                        {/* <BlogCard
                            src={tips}
                            alt=""
                            href="/blog/tips"
                            title="X Tips for Better Organization"
                            date="Coming Soon"
                            text="Where the Foundation Lies."
                        /> */}
                        {/* <BlogCard
                            src={change}
                            alt=""
                            href="/blog/change"
                            title="Why Change is Necessary"
                            date="Coming Soon"
                            text="The world we live in is changing faster than ever, and it's not going to slow down anytime soon.
                                Finance, medicine, technology, transportation, and commerce have all dramatically evolved over the past 40 years - 
                                so why hasn't education?"
                        /> */}
                        {/* <BlogCard
                            src={history}
                            alt="History of School"
                            href="/blog/history"
                            title="A Brief History of School"
                            date="Coming Soon"
                            text="We want to change the student experience. To do so, it's important to understand when institutional education 
                                started, what it was designed for, and how things have changed since."
                        /> */}
                        <BlogCard
                            src={mission}
                            alt="Learnify Mission"
                            // href="/blog/mission"
                            title="Our Mission"
                            date="Coming Soon"
                            text="What drives us forward at Learnify."
                        />
                    </article>
                </main>
                <Footer/>
            </div>
        </>
    );
};