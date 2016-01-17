import React, { PropTypes } from 'react';

// TODO: Consider using redux-form or formsy-react or  another form library.
export default class PasswordForm extends React.Component {
  static displayName = 'PasswordForm';

  static propTypes = {
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    onSubmit: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      errors: {
        old_password: null,
        new_password: null,
        new_password_repeat: null
      }
    }
  }

  _validateOldPassword() {
    let errors = this.state.errors;
    let { old_password } = this.refs.form;

    if (old_password.value.length === 0) {
      errors.old_password = 'Enter your current password';
    } else {
      errors.old_password = null;
    }

    this.setState({errors});
  }

  _validateNewPassword() {
    let errors = this.state.errors;
    let { new_password } = this.refs.form;

    if (new_password.value.length < 8) {
      errors.new_password = 'Password must be at least 8 characters';
    } else {
      errors.new_password = null;
    }

    this.setState({errors});
  }

  _validateNewPasswordRepeat() {
    let errors = this.state.errors;
    let { new_password, new_password_repeat } = this.refs.form;

    if (new_password_repeat.value.length > 0 && new_password.value !== new_password_repeat.value) {
      errors.new_password_repeat = 'Passwords do not match';
    } else {
      errors.new_password_repeat = null;
    }

    this.setState({errors});
  }

  _handleSubmit(event) {
    let { old_password, new_password, new_password_repeat } = this.state.errors;
    let valid = !old_password && !new_password && !new_password_repeat;

    if (valid) {
      this.props.onSubmit(event);
    } else {
      event.preventDefault();
    }
  }

  render() {
    let { errors } = this.state;

    return (
      <form action="" ref="form" className="paper__page" onSubmit={this._handleSubmit.bind(this)}>
        <h2 className="content__sub_title layout__row layout__row">Password</h2>

        <label htmlFor="old_password" className="layout__row layout__row-small">Current password</label>
        <input
          className="input input-block layout__row layout__row-small"
          id="old_password"
          name="old_password"
          onChange={this._validateOldPassword.bind(this)}
          placeholder="secret"
          required
          type="password"
        />
        {errors.old_password && <div className="validation_error">{errors.old_password}</div>}

        <label htmlFor="new_password" className="layout__row layout__row-small">New password</label>
        <input
          className="input input-block layout__row layout__row-small"
          id="new_password"
          name="new_password"
          onChange={this._validateNewPassword.bind(this)}
          placeholder="mystery"
          required
          type="password"
        />
        {errors.new_password && <div className="validation_error">{errors.new_password}</div>}

        <label htmlFor="new_password_repeat" className="layout__row layout__row-small">Repeat new password...</label>
        <input
          className="input input-block layout__row layout__row-small"
          id="new_password_repeat"
          name="new_password_repeat"
          onChange={this._validateNewPasswordRepeat.bind(this)}
          placeholder="mystery"
          required
          type="password"
        />
        {errors.new_password_repeat && <div className="validation_error">{errors.new_password_repeat}</div>}

        <input className="hidden" ref="submit" type="submit" />
      </form>
    );
  }
}
