import React, { Component } from "react";
import { 
    Switch,
    Route,
    withRouter 
} from "react-router-dom";
import { connect } from "react-redux";

import Loadable from "react-loadable";
import Loading from "./components/atoms/Loading";

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
                <Route path="/blog/calling" component={Calling}/>
                <Route path="/blog/change" component={Change}/>
                <Route path="/blog/danger" component={Danger}/>
                <Route path="/blog/emerging" component={Emerging}/>
                <Route path="/blog/habits" component={Habits}/>
                <Route path="/blog/history" component={History}/>
                <Route path="/blog/leadership" component={Leadership}/>
                <Route path="/blog/mission" component={Mission}/>
                <Route path="/blog/pareto" component={Pareto}/>
                <Route path="/blog/tips" component={Tips}/>
                <Route path="/blog" component={Blog}/>

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

                <Route path="*" component={NotFound}/>
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

const Calling = Loadable({
	loader: () => import(/* webpackChunkName: "Calling" */ "./components/blog/pages/Calling"),
	loading: Loading,
	delay: 300
});

const Change = Loadable({
	loader: () => import(/* webpackChunkName: "Change" */ "./components/blog/pages/Change"),
	loading: Loading,
	delay: 300
});

const Danger = Loadable({
	loader: () => import(/* webpackChunkName: "Danger" */ "./components/blog/pages/Danger"),
	loading: Loading,
	delay: 300
});

const Emerging = Loadable({
	loader: () => import(/* webpackChunkName: "Emerging" */ "./components/blog/pages/Emerging"),
	loading: Loading,
	delay: 300
});

const Habits = Loadable({
	loader: () => import(/* webpackChunkName: "Habits" */ "./components/blog/pages/Habits"),
	loading: Loading,
	delay: 300
});

const History = Loadable({
	loader: () => import(/* webpackChunkName: "History" */ "./components/blog/pages/History"),
	loading: Loading,
	delay: 300
});
const Leadership = Loadable({
	loader: () => import(/* webpackChunkName: "Leadership" */ "./components/blog/pages/Leadership"),
	loading: Loading,
	delay: 300
});
const Mission = Loadable({
	loader: () => import(/* webpackChunkName: "Mission" */ "./components/blog/pages/Mission"),
	loading: Loading,
	delay: 300
});
const Pareto = Loadable({
	loader: () => import(/* webpackChunkName: "Pareto" */ "./components/blog/pages/Pareto"),
	loading: Loading,
	delay: 300
});
const Tips = Loadable({
	loader: () => import(/* webpackChunkName: "Tips" */ "./components/blog/pages/Tips"),
	loading: Loading,
	delay: 300
});

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

const NotFound = Loadable({
	loader: () => import(/* webpackChunkName: "NotFound" */ "./components/global/pages/NotFound/NotFound"),
	loading: Loading,
	delay: 300
});

const mapStateToProps = state => ({

});

const mapDispatchToProps = { };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Public));