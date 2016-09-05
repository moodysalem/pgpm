import React, {DOM, PropTypes, Component, PureComponent} from "react";
import KC from "../../util/KeyChain";

export default class Keychain extends Component {
  state = {
    generation: null,
    name: '',
    email: '',
    passphrase: '',
    keyPair: null,
    keys: []
  };

  static contextTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    onInfo: PropTypes.func
  };

  handleGenerate = () => {
    const {name, email, generation} = this.state;
    const {onError, onSuccess} =this.context;

    if (generation != null) {
      onError('Already generating key...');
      return;
    }

    this.setState({
      generation: KC.generateKey({name, email})
        .then((keyPair) => {
          onSuccess('Generated key!');
          this.setState({generation: null, keyPair});
        }, (err) => {
          onError(err.message);
          this.setState({generation: null});
        })
    });
  };

  componentDidMount() {
    this.loadKeys();
  }

  loadKeys() {
    KC.loadKeys()
      .then(keys => {
        this.setState({keys});
      });
  }

  render() {
    const {name, email, keyPair, generation, keys} = this.state;

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

        <div>
          <button className="pure-button pure-button-primary" disabled={keyPair == null}
                  onClick={() => KC.addKey(keyPair).then(() => this.loadKeys())}>
            Add to Keychain
          </button>
        </div>

        <div>
          {
            keys.map(({privateKeyArmored, publicKeyArmored}, ix) => {
              return (
                <div key={ix}>
                  <div>Private Key</div>
                  <div>
                    <pre>{privateKeyArmored}</pre>
                  </div>
                  <div>Public Key</div>
                  <div>
                    <pre>{publicKeyArmored}</pre>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}