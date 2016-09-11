import React, {DOM, PropTypes, Component, PureComponent} from "react";
import PageLink from "./util/PageLink";

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