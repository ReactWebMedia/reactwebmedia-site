import React from 'react';
import { Link }  from 'react-router';

import { URL_NAMES, getUrl } from '../utils/urlGenerator';

import User from './user';
import { API_HOST } from '../config'

/*
let AuthBlock = (props) => {
  if (props.is_logged_in) {
    const logoutUrl = '/api/v1/logout';

    return (
      <div className="header__toolbar">
        <div className="header__toolbar_item">
          <User user={props.current_user} hideText={true} />
          <Dropdown>
            <Link to={getUrl(URL_NAMES.SETTINGS)} className="menu__item">Profile settings</Link>
            <form className="menu__item" action={`${API_HOST}${logoutUrl}`} method="post">
              <button type="submit" className="button button-transparent button-wide button-caption_left">Log out</button>
            </form>
          </Dropdown>
        </div>
      </div>
    );
  }

  return (
    <div className="header__toolbar">
      <div className="header__toolbar_item">
        <Link to="/auth" className="header__toolbar_item">Login</Link>
      </div>
    </div>
  );
};
*/

export default class NavComponent extends React.Component {
   constructor (props) {
     super(props);

     this.state = {
       navCollapsed: props.navCollapsed || true
     }
   }

  toggleNavCollapsed = () => {
    this.setState({navCollapsed: !this.state.navCollapsed});
  }

  render() {
    const state = this.state;

    let navCollapseClass = (state.navCollapsed)? 'collapse' : '';
    let navClassName = ['navbar-collapse', navCollapseClass].join(' ');

    return (
      <div className="nav-container">
        <div className="navbar-header">
          <button className="navbar-toggle collapsed" type="button" onClick={this.toggleNavCollapsed}>
            <span className="sr-only">Toggle navigation</span>
            <i className="fa fa-bars"></i>
          </button>
          <a className="logo-link" href="/" className="navbar-brand">
            <img className="logo" src="/images/reactwebmedia-logo-white.png" alt="ReactWebMedia" />
          </a>
        </div> 
        <nav id="bs-navbar" className={navClassName}> 
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#">Get Started</a>
            </li>
            <li>
              <a href="#">How it Works</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Sign Up</a>
            </li>
            <li>
              <a href="#">Log In</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}
