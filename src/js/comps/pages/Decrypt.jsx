import React, {DOM, PropTypes, Component, PureComponent} from "react";

export default class Decrypt extends Component {
  static propTypes = {
    params: PropTypes.shape({
      message: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    message: ''
  };

  componentDidMount() {
    this.calculateMessage();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.message !== this.props.params.message) {
      this.calculateMessage();
    }
  }

  calculateMessage() {
    const {params} = this.props;
    const {message} = params;

    this.setState({
      message: atob(message)
    });
  }

  loadKeys() {

  }

  render() {
    const {message} = this.state;

    return (
      <div>
        To decrypt message:
        <pre>{message}</pre>
      </div>
    );
  }
}