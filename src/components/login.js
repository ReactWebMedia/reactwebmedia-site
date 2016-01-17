import React from 'react';
import { Link }  from 'react-router';

export default class LoginComponent extends React.Component {
  submitHandler = (event) => {
    event.preventDefault();

    let form = event.target;

    this.props.onLoginUser(form.username.value, form.password.value);
  };

  render() {
    return (
      <div className="box box-middle">
        <header className="box__title">Login?</header>
        <form onSubmit={this.submitHandler} action="" method="post">
          <div className="box__body">
            <div className="layout__row">
              <div className="form__row">
                <label className="label label-block label-space" htmlFor="loginUsername">Username</label>
                <input className="input input-block" id="loginUsername" required="required" type="text" name="username"/>
              </div>
              <div className="form__row">
                <label className="label label-block label-space" htmlFor="loginPassword">Password</label>
                <input className="input input-block" id="loginPassword" required="required" type="password" name="password"/>
              </div>
            </div>
            <div className="layout__row layout layout-align_vertical layout-align_justify">
              <Link to="/resetpassword" className="link">Password reminder</Link>
              <button type="submit" className="button button-wide button-green">Login</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

