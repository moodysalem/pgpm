import React, {DOM, PropTypes, Component, PureComponent} from "react";
import {generateKey} from "../../util/PGP";

export default class Home extends Component {
  state = {
    generation: null,
    name: '',
    email: '',
    keyPair: null
  };

  static contextTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    onInfo: PropTypes.func
  };

  static propTypes = {};
  static defaultProps = {};

  handleGenerate = () => {
    const {name, email, generation} = this.state;
    const {onError, onSuccess} =this.context;

    if (generation != null) {
      onError('Already generating key...');
      return;
    }

    this.setState({
      generation: generateKey({name, email})
        .then((keyPair) => {
          onSuccess('Generated key!');
          this.setState({generation: null, keyPair});
        }, (err) => {
          onError(err.message);
          this.setState({generation: null});
        })
    });
  };

  render() {
    const {name, email, keyPair, generation} = this.state;

    return (
      <div>
        <div className="pure-form pure-form-stacked">
          <fieldset>
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
          </fieldset>

          <button className="pure-button pure-button-primary" onClick={this.handleGenerate}
                  disabled={generation != null}>
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