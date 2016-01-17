import React from 'react';
import { connect } from 'react-redux';

import ApiClient from '../api/client'
import { API_HOST } from '../config';
import { ActionsTrigger } from '../triggers';
import { defaultSelector } from '../selectors';
import Footer from '../components/footer';
import Header from '../components/header';


let ResetForm = (props) => {
  return (
    <form onSubmit={props.submitHandler} action="" method="post">
      <div className="layout__row">
        <div className="form__row">
          <label className="label label-block label-space" htmlFor="resetPasswordEmail">Email</label>
          <input className="input input-block" id="resetPasswordEmail" required="required" type="email" name="email"/>
        </div>
      </div>
      <div className="layout__row layout layout-align_vertical layout-align_justify">
        <button type="submit" className="button button-wide button-green">Submit</button>
      </div>
    </form>
   );
};

let SuccessMessage = () => {
  return (
    <div>
      If we found this email in our database, we've just sent you a message with further steps.
    </div>
  );
};

class Form extends React.Component {

  submitHandler = (event) => {
    event.preventDefault();

    let form = event.target;

    const client = new ApiClient(API_HOST);
    const triggers = new ActionsTrigger(client, this.props.dispatch);

    triggers.resetPassword(form.email.value);
  };

  render() {

    let content = <ResetForm submitHandler={this.submitHandler} />

    if (this.props.ui.submitResetPassword) {
      content = <SuccessMessage />;
    }

    return (
      <div>
        <Header />
        <div className="page__body">
          <div className="area">
            <div>
              <div className="area__body layout-align_start">
                <div className="box box-middle">
                  <header className="box__title">Reset Password</header>
                  <div className="box__body">
                    {content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default connect(defaultSelector)(Form);
