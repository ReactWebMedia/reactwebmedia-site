import React from 'react';
import { Link } from 'react-router';

export default class SidebarLink extends React.Component {
  static displayName = 'SidebarLink';

  static propTypes = {
    enabled: React.PropTypes.bool,
    badge: React.PropTypes.any,
    to: React.PropTypes.string,
    icon: React.PropTypes.string
  };

  render() {
    let {
      icon,
      badge,
      enabled,
      to,
      children
    } = this.props;
    let render = {
      className: 'navigation__item'
    };

    if (!enabled) {
      render.className += ' navigation__item-disabled';
    }

    return (
      <Link className={render.className} activeClassName="navigation__item-active" to={to}>
        <div className="navigation__icon"><span className="micon">{`${icon}`}</span></div>
        <div className="navigation__title">{children}</div>
        <div className="navigation__badge">{badge}</div>
      </Link>
    );
  }
}
