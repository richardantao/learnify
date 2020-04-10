import React, { Component } from "react";
import { 
    Switch,
    Route,
    withRouter 
} from "react-router-dom";
import { connect } from "react-redux";

import Loadable from "react-loadable";
import Loading from "./components/global/organisms/Loading";

import "./Public.scss";

class Public extends Component {
    state = {

    };

    static propTypes = {

    };

    componentDidUpdate(prevProps) {
        const { } = this.props;
    };

    render() {
        return (
            <Switch>
                <Route exact path="/blog" component={Blog}/>
                <Route path="/blog/:urlPath" component={Post}/>

                <Route path="/docs/changelog" component={Changelog}/>
                <Route path="/docs/cookies" component={Cookies}/>
                <Route path="/docs/developers" component={Developers}/>
                <Route path="/docs/privacy" component={Privacy}/>
                <Route path="/docs/sitemap" component={Sitemap}/>
                <Route path="/docs/status" component={Status}/>
                <Route path="/docs/terms" component={Terms}/>
                <Route path="/docs" component={Docs}/>

                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route exact path="/" component={Home}/>

                <Route path="/team/roles" component={Roles}/>
                <Route path="/team/register" component={TeamRegister}/>
                <Route path="/team" component={Team}/>
            </Switch>
        );
    };
};

/* --- Blog components --- */
const Blog = Loadable({
	loader: () => import(/* webpackChunkName: "Blog" */ "./components/blog/pages/Blog"),
	loading: Loading,
	delay: 300
});

const Post = Loadable({
	loader: () => import(/* webpackChunkName: "Post" */ "./components/blog/pages/Post"),
	loading: Loading,
	delay: 300
})

/* --- Docs components --- */
const Docs = Loadable({
	loader: () => import(/* webpackChunkName: "Docs" */ "./components/docs/pages/Docs"),
	loading: Loading,
	delay: 300
});

const Developers = Loadable({
	loader: () => import(/* webpackChunkName: "Developers" */ "./components/docs/pages/Developers"),
	loading: Loading,
	delay: 300
});

const Terms = Loadable({
	loader: () => import(/* webpackChunkName: "Terms" */ "./components/docs/pages/Terms"),
	loading: Loading,
	delay: 300
});

const Privacy = Loadable({
	loader: () => import(/* webpackChunkName: "Privacy" */ "./components/docs/pages/Privacy"),
	loading: Loading,
	delay: 300
});

const Cookies = Loadable({
	loader: () => import(/* webpackChunkName: "Cookies" */ "./components/docs/pages/Cookies"),
	loading: Loading,
	delay: 300
});

const Changelog = Loadable({
	loader: () => import(/* webpackChunkName: "Changelog" */ "./components/docs/pages/Changelog"),
	loading: Loading,
	delay: 300
});

const Sitemap = Loadable({
	loader: () => import(/* webpackChunkName: "Sitemap" */ "./components/docs/pages/Sitemap"),
	loading: Loading,
	delay: 300
});

const Status = Loadable({
	loader: () => import(/* webpackChunkName: "Status" */ "./components/docs/pages/Status"),
	loading: Loading,
	delay: 300
});

/* --- Root components --- */
const Home = Loadable({
	loader: () => import(/* webpackChunkName: "Home" */ "./components/root/pages/Home"),
	loading: Loading,
	delay: 300
});

const About = Loadable({
	loader: () => import(/* webpackChunkName: "About" */ "./components/root/pages/About"),
	loading: Loading,
	delay: 300
});

const Contact = Loadable({
	loader: () => import(/* webpackChunkName: "Contact" */ "./components/root/pages/Contact"),
	loading: Loading,
	delay: 300
});

/* --- Team components --- */
const Team = Loadable({
	loader: () => import(/* webpackChunkName: "Team" */ "./components/team/pages/Team"),
	loading: Loading,
	delay: 300
});

const Roles = Loadable({
	loader: () => import(/* webpackChunkName: "Roles" */"./components/team/pages/Roles"),
	loading: Loading,
	delay: 300
});

const TeamRegister = Loadable({
	loader: () => import(/* webpackChunkName: "TeamRegister" */ "./components/team/pages/TeamRegister"),
	loading: Loading,
	delay: 300
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = { };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Public));