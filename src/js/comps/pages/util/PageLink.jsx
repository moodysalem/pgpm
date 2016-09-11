import React, {DOM, PropTypes, Component} from "react";
import {Link} from "react-router";

export default class PageLink extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  render() {
    const {children, icon, ...rest} = this.props;

    return (
      <Link className="btn" {...rest}>
        <i key="icon" className={`fa fa-${icon}`}/>
        <span key="span" style={{marginLeft: 6}}>{children}</span>
      </Link>
    );
  }
}