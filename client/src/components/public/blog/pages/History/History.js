import React from "react";
import Helmet from "react-helmet";

import Header from "../../../global/organisms/Header";
import Footer from "../../../global/organisms/Footer";

import "../../Blog.scss";

const History = props => {
    return (
        <>
            <Helmet>
                <meta name="description" content="How did our current education system form? When did it start, and how has it evolved over the years..."/>
                <meta name="keywords" content="School, Education, History"/>
                <link rel="canonical" href="https://learnify.ca/blog/history"/>
                <title>Learnify | Blog</title>
            </Helmet>
            <div id="public">
                <Header/>
                <main className="posts" role="main">
                    <header role="banner">
                        <img src="" alt=""/>
                    </header>
                    <article role="document">
                        <section>

                        </section>
                        <section>

                        </section>
                        <section>

                        </section>
                    </article>
                </main>
                <Footer/>
            </div>
        </>
    );
};

export default History;