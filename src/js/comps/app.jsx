import React, {DOM, PropTypes, Component, PureComponent} from "react";
import NotificationSystem from "react-notification-system";
import {generateKey} from "../util/pgp";

export default class App extends Component {
  state = {
    generation: null,
    name: '',
    email: '',
    keyPair: null
  };

  _notify = (message, level = 'info', position = 'bl') => {
    const {_ns} = this.refs;

    _ns.addNotification({message, level, position});
  };

  success = (msg) => this._notify(msg, 'success');
  error = (msg) => this._notify(msg, 'error');
  info = (msg) => this._notify(msg, 'info');


  handleGenerate = () => {
    const {name, email, generation} = this.state;
    if (generation != null) {
      this.error('Already generating key...');
      return;
    }

    this.setState({
      generation: generateKey({name, email})
        .then((keyPair) => {
          this.success('Generated key!');
          this.setState({generation: null, keyPair});
        }, (err) => {
          this.error(err.message);
          this.setState({generation: null});
        })
    });
  };

  render() {
    const {name, email, keyPair, generation} = this.state;

    return (
      <div>
        <NotificationSystem ref="_ns"/>
        <div>
          <label>
            Name
            <input disabled={generation != null} type="text" value={name}
                   onChange={(e) => this.setState({name: e.target.value})}/>
          </label>

          <label>
            E-mail
            <input disabled={generation != null} type="email" value={email}
                   onChange={(e) => this.setState({email: e.target.value})}/>
          </label>

          <button onClick={this.handleGenerate} disabled={generation != null}>
            Generate key!
          </button>
        </div>

        <div>
          <label>
            Private Key
            <textarea value={keyPair ? keyPair.privateKeyArmored : ''} readOnly="true"/>
          </label>
          <label>
            Public Key
            <textarea value={keyPair ? keyPair.publicKeyArmored : ''} readOnly="true"/>
          </label>
        </div>
      </div>
    );
  }
}