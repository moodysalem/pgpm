import React, {DOM, PropTypes, Component, PureComponent} from "react";
import {Router, Route, hashHistory,IndexRoute} from "react-router";
import App from "./App";
import Home from "./pages/Home";

export default class AppRouter extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
        </Route>
      </Router>
    );
  }
}