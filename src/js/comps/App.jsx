import React, {DOM, PropTypes, Component, PureComponent} from "react";
import NotificationSystem from "react-notification-system";

export default class App extends Component {
  getChildContext() {
    const {onError, onSuccess, onInfo} =this;
    return {onError, onSuccess, onInfo};
  }

  static childContextTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    onInfo: PropTypes.func
  };

  _notify = (message, level = 'info', position = 'br') => {
    const {_ns} = this.refs;

    _ns.addNotification({message, level, position});
  };

  onSuccess = (msg) => this._notify(msg, 'success');
  onError = (msg) => this._notify(msg, 'error');
  onInfo = (msg) => this._notify(msg, 'info');

  render() {
    const {children} = this.props;

    return (
      <div style={{height: '100%'}}>
        <NotificationSystem ref="_ns"/>
        { children }
      </div>
    );
  }
}