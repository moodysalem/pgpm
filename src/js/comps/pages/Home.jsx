import React, {DOM, PropTypes, Component, PureComponent} from "react";
import {Link} from "react-router";

const PageLink = ({to, children, style, icon}) => {
  return (
    <Link className="pure-button pure-button-lg pure-button-primary"
          to={to} style={style}>
      <i key="icon" className={`fa fa-${icon}`}/>
      <span key="span" style={{marginLeft: 4}}>{children}</span>
    </Link>
  );
};

export default class Home extends Component {

  render() {
    return (
      <div className="display-flex align-items-center justify-content-center"
           style={{height: '100%'}}>
        <PageLink to="keychain" icon="key" style={{marginRight: 5}}>KEYCHAIN</PageLink>
        <PageLink to="encrypt" icon="eraser">ENCRYPT</PageLink>
      </div>
    );
  }
}