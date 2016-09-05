import React, {DOM, PropTypes, Component, PureComponent} from "react";
import { Link } from 'react-router';

export default class NotFound extends Component {
  render() {
    return (
      <div className="display-flex align-items-center justify-content-center" style={{height: '100%'}}>
        <div>
          <h1>404</h1>
          <p>Page not found...</p>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    );
  }
}