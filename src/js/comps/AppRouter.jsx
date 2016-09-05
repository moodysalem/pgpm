import React, {DOM, PropTypes, Component, PureComponent} from "react";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import App from "./App";
import Keychain from "./pages/Keychain";
import Encrypt from "./pages/Encrypt";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

export default class AppRouter extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/keychain" component={Keychain}/>
          <Route path="/encrypt" component={Encrypt}/>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    );
  }
}