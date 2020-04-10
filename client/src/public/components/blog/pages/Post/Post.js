import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { connect } from "react-redux";
import { fetchPosts } from "../../../../actions/posts";
import PropTypes from "prop-types";

class Post extends Component {
    state = {

    };

    static propTypes = {
        post: PropTypes.object.isRequired,
        fetchPosts: PropTypes.func.isRequired
    };  
    
    render() {
        const { posts } = this.props.post;
        return (
            <>
                <Helmet>
                    <title></title>
                </Helmet>
                <main role="main">
                    {posts.map(({ }) => {
                        
                    })}
                </main>
            </>
        );
    };
};

const mapStateToProps = state => ({
    post: state.post
});

const mapDispatchToProps = { fetchPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Post);