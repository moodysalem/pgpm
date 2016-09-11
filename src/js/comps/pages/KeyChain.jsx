import React, {DOM, PropTypes, Component, PureComponent} from "react";
import PageLink from "./util/PageLink";
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
        .then((key) => {
          onSuccess('Generated key!');
          this.setState({generation: null, keyPair: key});
        }, (err) => {
          onError(err.message);
          this.setState({generation: null});
        })
    });
  };

  componentDidMount() {
    this.loadKeys();
    const {name} = this.refs;
    name.focus();
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
        <div>
          <PageLink icon="home" to="/">Home</PageLink>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.handleGenerate();
        }}>
          <fieldset>
            <label>
              Name
              <input ref="name" disabled={generation != null} type="text" value={name} required="true"
                     onChange={(e) => this.setState({name: e.target.value})}/>
            </label>

            <label>
              E-mail
              <input disabled={generation != null} type="email" value={email} required="true"
                     onChange={(e) => this.setState({email: e.target.value})}/>
            </label>
          </fieldset>

          <button className="btn" type="submit" disabled={generation != null}>
            {
              generation == null ? 'Generate key!' : <span><i className="fa fa-refresh fa-spin"/>Working...</span>
            }
          </button>

        </form>

        <div className="display-flex">
          <label className="flex-grow-1 flex-shrink-1 flex-basis-0">
            Private Key
            <textarea value={keyPair ? keyPair.privateKeyArmored : ''} style={{height: 400}} readOnly="true"/>
          </label>
          <label className="flex-grow-1 flex-shrink-1 flex-basis-0">
            Public Key
            <textarea value={keyPair ? keyPair.publicKeyArmored : ''} style={{height: 400}} readOnly="true"/>
          </label>
        </div>

        <div>
          <button className="btn" disabled={keyPair == null}
                  onClick={() => KC.addKey(keyPair).then(() => this.loadKeys())}>
            Add to Keychain
          </button>
        </div>

        <div>
          {
            keys.map((key, ix) => {
              const isPrivate = key.isPrivate();

              const privateKey = isPrivate ? key.armor() : null,
                publicKey = isPrivate ? key.toPublic().armor() : key.armor();

              return (
                <div key={ix} className="display-flex">
                  <div className="flex-grow-1 flex-shrink-1 flex-basis-0" style={{maxWidth: '50%'}}>
                    <div>Private Key</div>
                    <pre>{privateKey}</pre>
                  </div>
                  <div className="flex-grow-1 flex-shrink-1 flex-basis-0" style={{maxWidth: '50%'}}>
                    <div>Public Key</div>
                    <pre>{publicKey}</pre>
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