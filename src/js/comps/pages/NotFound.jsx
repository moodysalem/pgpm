import React, {DOM, PropTypes, Component, PureComponent} from "react";

export default class NotFound extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div>
        <h1>404</h1>
        <p>Page not found...</p>
      </div>
    );
  }
}