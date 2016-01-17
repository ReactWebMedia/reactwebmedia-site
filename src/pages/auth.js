import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ApiClient from '../api/client'
import { API_HOST } from '../config';
import { ActionsTrigger } from '../triggers';
import { defaultSelector } from '../selectors';
import Footer from '../components/footer';
import Login from '../components/login';
import Register from '../components/register';
import Header from '../components/header';
import Messages from '../components/messages';


let FirstLogin = () => {
  return (
  <div className="area">
    <div className="area__body">
      <div className="message">
        <div className="message__body">
          You are now successfully registered and logged in. You can proceed to <Link className="link" to="/induction">the next step</Link>.
        </div>
      </div>
    </div>
  </div>
)};

let AuthForms = (props) => {
  return (
  <div className="area">
    <div>
      <div className="area__body layout-align_start">
        <Login onLoginUser={props.triggers.login} />
        <Register onRegisterUser={props.triggers.registerUser} />
      </div>
    </div>
  </div>
)};

let AuthContents = (props) => {
  let {
    current_user,
    is_logged_in,
    is_first_login,
    triggers,
    messages
  } = props;
  
  let content = <FirstLogin/>;

  if (!is_logged_in) {
    content = <AuthForms triggers={triggers}/>;
  }

  return (
    <div>
      <Header is_logged_in={is_logged_in} current_user={current_user} />
      <div className="page__body">
        <Messages messages={messages} removeMessage={triggers.removeMessage} />
        {content}
      </div>
      <Footer/>
    </div>
  );
};

class Auth extends React.Component {
  render() {
    let { current_user, is_logged_in, messages } = this.props;

    const client = new ApiClient(API_HOST);
    const triggers = new ActionsTrigger(client, this.props.dispatch);

    let is_first_login = false;
    if (current_user) {

      if (current_user.more) {
        is_first_login = current_user.more.first_login;
      }
    }

    return (
      <AuthContents
        current_user={current_user}
        is_logged_in={is_logged_in}
        is_first_login={is_first_login}
        triggers={triggers}
        messages={messages}
        />
    )
  }
}

export default connect(defaultSelector)(Auth);
