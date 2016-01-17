import React from 'react';
import { Link }  from 'react-router';

import { URL_NAMES, getUrl } from '../utils/urlGenerator';

import User from './user';
import { API_HOST } from '../config'

import Dropdown from './dropdown'

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

export default class HeaderComponent extends React.Component {

  render() {
    let classNames = 'header page__header ' + this.props.className;

    return (
      <div {...this.props} className={classNames}>
        <div className="header__body">
          <div className="header__logo">
            <Link to="/" className="logo" title="ReactWebMedia"><span className="logo__title">ReactWebMedia</span></Link>
          </div>
          <AuthBlock is_logged_in={this.props.is_logged_in} current_user={this.props.current_user}/>
        </div>
      </div>
    )
  }
}
